# Smart Contracts workflow

## Fantom - earn BTC/ETH

User deposit USDT/USDC/DAI/Curve LP token into our vault. If deposit USDT/USDC/DAI, our vault will convert them to LP token of Curve Geist pool, and then deposit into Curve gauge corresponding with the pool. Over time, our vault collect rewards from gauge, in form of WFTM, CRV and GEIST. Our vault then swap all these rewards for the token that initially set (either BTC or ETH, in separate contract). User able to claim their rewards anytime (in BTC or ETH), or automatically been claimed when user doing withdrawal, which able to choose withdrawal token between USDT/USDC/DAI/Curve LP token.

Smart contract: https://github.com/Powerbomb-Finance/powerbomb-lite/blob/master/hardhat/contracts/PowerBombFtmCurveGeist.sol

Test script: https://github.com/Powerbomb-Finance/powerbomb-lite/blob/master/hardhat/test/testFtmCurveGeist.js

## Harmony - earn BTC/ETH

User deposit USDT/USDC/DAI/Curve LP token into our vault. If deposit USDT/USDC/DAI, our vault will convert them to LP token of Curve 3pool, and then deposit into Curve gauge corresponding with the pool. Over time, our vault collect rewards from gauge, in form of WONE and CRV. Our vault then swap WONE for the token that initially set (either BTC or ETH, in separate contract). CRV has no liquidity yet so keep in vault first. User able to claim their rewards anytime (in BTC or ETH), or automatically been claimed when user doing withdrawal, which able to choose withdrawal token between USDT/USDC/DAI/Curve LP token.

Smart contract: https://github.com/Powerbomb-Finance/powerbomb-lite/blob/master/hardhat/contracts/PowerBombOneCurve.sol

Test script: https://github.com/Powerbomb-Finance/powerbomb-lite/blob/master/hardhat/test/testOneCurve.js

## Avalanche - earn BTC/ETH

User deposit USDT/USDC/DAI/Curve LP token into our vault. If deposit USDT/USDC/DAI, our vault will convert them to LP token of Curve av3CRV pool, and then deposit into Curve gauge corresponding with the pool. Over time, our vault collect rewards from gauge, in form of WAVAX and CRV. Our vault then swap all these rewards for the token that initially set (either BTC or ETH, in separate contract), and deposit into Aave for interest-bearing aToken. When next harvest function is called, amount increment of aToken is been calculated and add into user rewards. Aave also provide WAVAX as deposit rewards and our vault collect and do same things above. User able to claim their rewards anytime (in BTC or ETH, converted from aBTC/aETH), or automatically been claimed when user doing withdrawal, which able to choose withdrawal token between USDT/USDC/DAI/Curve LP token.

Smart contract: https://github.com/Powerbomb-Finance/powerbomb-lite/blob/master/hardhat/contracts/PowerBombAvaxCurve.sol

Test script: https://github.com/Powerbomb-Finance/powerbomb-lite/blob/master/hardhat/test/testAvaxCurve.js

## Avalanche - earn gOHM

User deposit USDT/USDC/DAI/Curve LP token into our vault. If deposit USDT/USDC/DAI, our vault will convert them to LP token of Curve av3CRV pool, and then deposit into Curve gauge corresponding with the pool. Over time, our vault collect rewards from gauge, in form of WAVAX and CRV. Our vault then swap all these rewards for gOHM. User able to claim their gOHM anytime, or automatically been claimed when user doing withdrawal, which able to choose withdrawal token between USDT/USDC/DAI/Curve LP token.

Smart contract: https://github.com/Powerbomb-Finance/powerbomb-lite/blob/master/hardhat/contracts/PowerBombAvaxCurve33.sol

Test script: https://github.com/Powerbomb-Finance/powerbomb-lite/blob/master/hardhat/test/testAvaxCurve33.js