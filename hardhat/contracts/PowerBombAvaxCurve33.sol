// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./PowerBombAvaxCurve.sol";

contract PowerBombAvaxCurve33 is PowerBombAvaxCurve {
    using SafeERC20Upgradeable for IERC20Upgradeable;
    using SafeERC20Upgradeable for IWAVAX;

    IERC20Upgradeable constant MIM = IERC20Upgradeable(0x130966628846BFd36ff31a822705796e8cb8C18D);
    IERC20Upgradeable constant wMEMO = IERC20Upgradeable(0x0da67235dD5787D67955420C84ca1cEcd4E5Bb3b);
    IRouter constant sushiRouter = IRouter(0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506);

    function initialize(
        IPool _pool, IGauge _gauge,
        IERC20Upgradeable _rewardToken
    ) external initializer {
        __Ownable_init();

        pool = _pool;
        gauge = _gauge;
        lpToken = IERC20Upgradeable(pool.lp_token());

        yieldFeePerc = 500;
        slippagePerc = 50;
        treasury = owner();
        rewardToken = _rewardToken;
        tvlMaxLimit = 5000000e6;

        USDT.safeApprove(address(pool), type(uint).max);
        USDC.safeApprove(address(pool), type(uint).max);
        DAI.safeApprove(address(pool), type(uint).max);
        lpToken.safeApprove(address(pool), type(uint).max);
        lpToken.safeApprove(address(gauge), type(uint).max);
        WAVAX.safeApprove(address(router), type(uint).max);
        CRV.safeApprove(address(router), type(uint).max);
        MIM.safeApprove(address(sushiRouter), type(uint).max);
    }

    function _harvest(bool isDeposit) internal override {
        // Collect CRV and WAVAX from Curve
        gauge.claim_rewards();
        uint currentPool = gauge.balanceOf(address(this));

        uint WAVAXAmt = WAVAX.balanceOf(address(this));
        uint minSwapAmt = msg.sender == bot ? 50e16 : 25e16; // 0.5 : 0.25 WAVAX
        if (WAVAXAmt > minSwapAmt) {
            // Swap CRV to WAVAX
            uint CRVAmt = CRV.balanceOf(address(this));
            if (CRVAmt > 1e18) WAVAXAmt += swap2(address(CRV), address(WAVAX), CRVAmt);

            // Refund AVAX if user deposit and trigger harvest swap & refund bot
            if (msg.sender == bot || isDeposit) {
                uint amountRefund = msg.sender == bot ? 2e16 : 1e16; // 0.02 : 0.01 WAVAX
                WAVAXAmt -= amountRefund;
                WAVAX.withdraw(amountRefund);
                (bool success,) = tx.origin.call{value: address(this).balance}("");
                require(success, "AVAX transfer failed");
            }

            // Swap WAVAX to reward token
            uint rewardTokenAmt;
            if (address(rewardToken) == address(wMEMO)) {
                uint MIMAmt = swap2(address(WAVAX), address(MIM), WAVAXAmt);
                rewardTokenAmt = sushiSwap2(address(MIM), address(rewardToken), MIMAmt);
            } else {
                rewardTokenAmt = swap2(address(WAVAX), address(rewardToken), WAVAXAmt);
            }

            // Calculate fee
            uint fee = rewardTokenAmt * yieldFeePerc / 10000;
            rewardTokenAmt -= fee;

            // Update accRewardPerlpToken
            accRewardPerlpToken += (rewardTokenAmt * 1e36 / currentPool);

            // Transfer out fee
            rewardToken.safeTransfer(treasury, fee);

            emit Harvest(WAVAXAmt, rewardTokenAmt, fee);
        }
    }

    function claimReward(address account) public override {
        _harvest(false);

        User storage user = userInfo[account];
        if (user.lpTokenBalance > 0) {
            // Calculate user reward
            uint rewardTokenAmt = (user.lpTokenBalance * accRewardPerlpToken / 1e36) - user.rewardStartAt;
            if (rewardTokenAmt > 0) {
                user.rewardStartAt += rewardTokenAmt;

                // Transfer rewardToken to user
                rewardToken.safeTransfer(account, rewardTokenAmt);
                userAccReward[account] += rewardTokenAmt;

                emit ClaimReward(account, 0, rewardTokenAmt);
            }
        }
    }

    // === Migrate funds ===

    address constant oldVault = 0xB523b02556cFeEE0417222f696d9aee0deAd49bf;

    function migrate(uint _lpTokenAmt) external {
        require(msg.sender == oldVault);
        lpToken.safeTransferFrom(msg.sender, address(this), _lpTokenAmt);
        gauge.deposit(_lpTokenAmt);
    }

    function addUserData(address depositor, uint lpTokenAmt) external {
        require(msg.sender == oldVault);
        userInfo[depositor].lpTokenBalance = lpTokenAmt;
    }

    // =====================

    function sushiSwap2(address tokenIn, address tokenOut, uint amount) private returns (uint) {
        return sushiRouter.swapExactTokensForTokens(amount, 0, getPath(tokenIn, tokenOut), address(this), block.timestamp)[1];
    }
}
