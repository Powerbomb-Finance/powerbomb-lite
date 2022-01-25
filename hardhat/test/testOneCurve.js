const { ethers, network, upgrades } = require("hardhat")
const IERC20_ABI = require("../abis/IERC20_ABI.json")
const router_ABI = require("../abis/router_ABI.json")

const USDTAddr = "0x3C2B8Be99c50593081EAA2A724F0B8285F5aba8f"
const USDCAddr = "0x985458E523dB3d53125813eD68c274899e9DfAb4"
const DAIAddr = "0xEf977d2f931C1978Db5F6747666fa1eACB0d0339"
const WETHAddr = "0x6983D1E6DEf3690C4d616b13597A09e6193EA013"
const WBTCAddr = "0x3095c7557bCb296ccc6e363DE01b760bA031F2d9"
// const aUSDCAddr = "0x46a51127c3ce23fb7ab1de06226147f446e4a857"
// const aWETHAddr = "0x53f7c5869a859f0aec3d334ee8b4cf01e3492f21"
// const aWBTCAddr = "0x686bef2417b6dc32c50a3cbfbcc3bb60e1e9a15d"
const WONEAddr = "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a"
const routerAddr = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"
const curve3poolLpAddr = "0xC5cfaDA84E902aD92DD40194f0883ad49639b023"

const poolAddr = "0xC5cfaDA84E902aD92DD40194f0883ad49639b023"
const gaugeAddr = "0xbf7e49483881c76487b0989cd7d9a8239b20ca41"

describe("PowerBomb Avalanche", function () {
    it("Should work (BTC) 3pool LP on Curve", async () => {
        let tx, receipt
        const [deployer, client, client2, client3, client4] = await ethers.getSigners()
        // const [me, client, client2, client3] = await ethers.getSigners()

        // const deployerAddr = "0x2C10aC0E6B6c1619F4976b2ba559135BFeF53c5E"
        // await network.provider.request({method: "hardhat_impersonateAccount", params: [deployerAddr]})
        // const deployer = await ethers.getSigner(deployerAddr)
        // await me.sendTransaction({to: deployerAddr, value: ethers.utils.parseEther("9999")})

        const PowerBombFac = await ethers.getContractFactory("PowerBombOneCurve", deployer)
        const powerBombProxy = await upgrades.deployProxy(PowerBombFac, [poolAddr, gaugeAddr, WBTCAddr], {kind: "uups"})
        // const powerBomb = await ethers.getContractAt("PowerBombOneCurve", powerBombProxy.address, deployer)
        // // const powerBomb = await ethers.getContractAt("PowerBombAvax", "0xeF1F06F0a9645A143Eaccb543f5bda85A9BD21D9", deployer)
        
        // // Upgrade
        // // const powerBombFac = await ethers.getContractFactory("PowerBombAvax", deployer)
        // // const powerBombImpl = await powerBombFac.deploy()
        // // await powerBomb.upgradeTo(powerBombImpl.address)
        // // await powerBomb.setIbRewardTokenAndApproveAave(aWBTCAddr)

        // const router = new ethers.Contract(routerAddr, router_ABI, deployer)
        // await router.swapAVAXForExactTokens(
        //     ethers.utils.parseUnits("1000", 6), [WONEAddr, USDTAddr], client.address, Math.ceil(Date.now() / 1000),
        //     {value: ethers.utils.parseEther("50")}
        // )
        // await router.swapAVAXForExactTokens(
        //     ethers.utils.parseUnits("1000", 6), [WONEAddr, USDCAddr], client2.address, Math.ceil(Date.now() / 1000),
        //     {value: ethers.utils.parseEther("50")}
        // )
        // await router.swapAVAXForExactTokens(
        //     ethers.utils.parseUnits("1000", 18), [WONEAddr, DAIAddr], client3.address, Math.ceil(Date.now() / 1000),
        //     {value: ethers.utils.parseEther("50")}
        // )
        // const USDTContract = new ethers.Contract(USDTAddr, IERC20_ABI, deployer)
        // // console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6))
        // const USDCContract = new ethers.Contract(USDCAddr, IERC20_ABI, deployer)
        // // console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6))
        // const DAIContract = new ethers.Contract(DAIAddr, IERC20_ABI, deployer)
        // // console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18))

        // const lpHolderAddr = "0x0e3dc2bcbfea84072a0c794b7653d3db364154e0"
        // await network.provider.request({method: "hardhat_impersonateAccount", params: [lpHolderAddr]})
        // const lpHolder = await ethers.getSigner(lpHolderAddr)
        // await deployer.sendTransaction({to: lpHolderAddr, value: ethers.utils.parseEther("1")})
        // const lpTokenContract = new ethers.Contract(curve3poolLpAddr, IERC20_ABI, deployer)
        // await lpTokenContract.connect(lpHolder).transfer(client4.address, ethers.utils.parseUnits("1000", 18))
        // // console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address)))

        // // Deposit
        // await USDTContract.connect(client).approve(powerBomb.address, ethers.constants.MaxUint256)
        // await powerBomb.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("1000", 6))
        // // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client.address))) // 997.218478703962224017
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client.address), 6)) // 999.774349

        // await USDCContract.connect(client2).approve(powerBomb.address, ethers.constants.MaxUint256)
        // tx = await powerBomb.connect(client2).deposit(USDCAddr, ethers.utils.parseUnits("1000", 6))
        // // receipt = await tx.wait()
        // // console.log(receipt.gasUsed.toString()) // 721954
        // // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client2.address))) // 996.718406465025641389
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client2.address), 6)) // 999.272995

        // await DAIContract.connect(client3).approve(powerBomb.address, ethers.constants.MaxUint256)
        // await powerBomb.connect(client3).deposit(DAIAddr, ethers.utils.parseUnits("1000", 18))
        // // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client3.address))) // 997.468245835035658312
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client3.address), 6)) // 1000.024756

        // await lpTokenContract.connect(client4).approve(powerBomb.address, ethers.constants.MaxUint256)
        // await powerBomb.connect(client4).deposit(curve3poolLpAddr, lpTokenContract.balanceOf(client4.address))
        // // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client4.address))) // 1000.0
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client4.address), 6)) // 1002.563

        // // console.log(ethers.utils.formatEther(await powerBomb.getAllPool())) // 3991.405131004023523718
        // // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward())) // 0.0
        // // console.log(ethers.utils.formatUnits(await powerBomb.getAllPoolInUSD(), 6)) // 4001.635102
        // // console.log(ethers.utils.formatUnits(await powerBomb.getPricePerFullShareInUSD(), 6)) // 1.002563

        // // Assume profit
        // for (let i=0; i<10000; i++) {
        //     await network.provider.send("evm_mine")
        // }
        // const WONEContract = new ethers.Contract(WONEAddr, [
        //     "function deposit() external payable",
        //     "function transfer(address, uint) external",
        //     "function balanceOf(address) external view returns (uint)"
        // ], deployer)
        // await WONEContract.deposit({value: ethers.utils.parseEther("1")})
        // await WONEContract.transfer(powerBomb.address, ethers.utils.parseEther("1"))
        // // console.log(ethers.utils.formatEther(await WONEContract.balanceOf(powerBomb.address)))
        // // const _powerBomb = new ethers.Contract(powerBomb.address, [
        // //     "function getPoolPendingReward() external view returns (uint)"
        // // ], deployer)
        // // console.log(ethers.utils.formatEther(await _powerBomb.getPoolPendingReward()))

        // // Harvest
        // // console.log((await powerBomb.estimateGas.harvest()).toString())
        // tx = await powerBomb.harvest()
        // // receipt = await tx.wait()
        // // console.log(receipt.gasUsed.toString())
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client.address), 8))
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client2.address), 8))
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client3.address), 8))
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client4.address), 8))

        // // const userBalance1 = await powerBomb.getUserBalance(client.address)
        // // const userBalance2 = await powerBomb.getUserBalance(client2.address)
        // // const userBalance3 = await powerBomb.getUserBalance(client3.address)
        // // const userBalance4 = await powerBomb.getUserBalance(client4.address)
        // // console.log(ethers.utils.formatEther(userBalance1.add(userBalance2).add(userBalance3).add(userBalance4)))
        // // console.log(ethers.utils.formatEther(await powerBomb.getAllPool())) // 3991.405131004023523718

        // // Claim
        // const WBTCContract = new ethers.Contract(WBTCAddr, IERC20_ABI, deployer)
        // await powerBomb.connect(client).claimReward(client.address)
        // console.log(ethers.utils.formatUnits(await WBTCContract.balanceOf(client.address), 8)) // 0.0002128
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client.address), 8))
        // await powerBomb.connect(client2).claimReward(client2.address)
        // console.log(ethers.utils.formatUnits(await WBTCContract.balanceOf(client2.address), 8)) // 0.00021269
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client2.address), 8))
        // await powerBomb.connect(client3).claimReward(client3.address)
        // console.log(ethers.utils.formatUnits(await WBTCContract.balanceOf(client3.address), 8)) // 0.00021285
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client3.address), 8))
        // await powerBomb.connect(client4).claimReward(client4.address)
        // console.log(ethers.utils.formatUnits(await WBTCContract.balanceOf(client4.address), 8)) // 0.00021339
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client4.address), 8))

        // // const aWBTCContract = new ethers.Contract(aWBTCAddr, IERC20_ABI, deployer)
        // // console.log(ethers.utils.formatUnits(await aWBTCContract.balanceOf(powerBomb.address), 8)) // 0.00001442
        // // console.log(ethers.utils.formatEther(await WONEContract.balanceOf(powerBomb.address))) // 0.0
        // // console.log(ethers.utils.formatEther(await WBTCContract.balanceOf(powerBomb.address))) // 0.0

        // // Withdraw
        // console.log("===withdraw===")
        // await powerBomb.connect(client).withdraw(USDTAddr, await powerBomb.getUserBalance(client.address))
        // console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6)) // 999.429567
        // await powerBomb.connect(client2).withdraw(USDCAddr, await powerBomb.getUserBalance(client2.address))
        // console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6)) // 999.521614
        // await powerBomb.connect(client3).withdraw(DAIAddr, await powerBomb.getUserBalance(client3.address))
        // console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18)) // 999.471819873261723398
        // await powerBomb.connect(client4).withdraw(curve3poolLpAddr, await powerBomb.getUserBalance(client4.address))
        // console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address))) // 1000.0
    })

    // it("Should work (ETH) 3pool LP on Curve", async () => {
    //     let tx, receipt
    //     const [deployer, client, client2, client3, client4] = await ethers.getSigners()
    //     // const [me, client, client2, client3] = await ethers.getSigners()

    //     // const deployerAddr = "0x2C10aC0E6B6c1619F4976b2ba559135BFeF53c5E"
    //     // await network.provider.request({method: "hardhat_impersonateAccount", params: [deployerAddr]})
    //     // const deployer = await ethers.getSigner(deployerAddr)
    //     // await me.sendTransaction({to: deployerAddr, value: ethers.utils.parseEther("9999")})

    //     const PowerBombFac = await ethers.getContractFactory("PowerBombAvaxCurve", deployer)
    //     const powerBombProxy = await upgrades.deployProxy(PowerBombFac, [poolAddr, gaugeAddr, WETHAddr], {kind: "uups"})
    //     const powerBomb = await ethers.getContractAt("PowerBombAvaxCurve", powerBombProxy.address, deployer)
    //     // const powerBomb = await ethers.getContractAt("PowerBombAvax", "0xeF1F06F0a9645A143Eaccb543f5bda85A9BD21D9", deployer)
        
    //     // Upgrade
    //     // const powerBombFac = await ethers.getContractFactory("PowerBombAvax", deployer)
    //     // const powerBombImpl = await powerBombFac.deploy()
    //     // await powerBomb.upgradeTo(powerBombImpl.address)
    //     // await powerBomb.setIbRewardTokenAndApproveAave(aWETHAddr)

    //     const router = new ethers.Contract(routerAddr, router_ABI, deployer)
    //     await router.swapAVAXForExactTokens(
    //         ethers.utils.parseUnits("1000", 6), [WONEAddr, USDTAddr], client.address, Math.ceil(Date.now() / 1000),
    //         {value: ethers.utils.parseEther("50")}
    //     )
    //     await router.swapAVAXForExactTokens(
    //         ethers.utils.parseUnits("1000", 6), [WONEAddr, USDCAddr], client2.address, Math.ceil(Date.now() / 1000),
    //         {value: ethers.utils.parseEther("50")}
    //     )
    //     await router.swapAVAXForExactTokens(
    //         ethers.utils.parseUnits("1000", 18), [WONEAddr, DAIAddr], client3.address, Math.ceil(Date.now() / 1000),
    //         {value: ethers.utils.parseEther("50")}
    //     )
    //     const USDTContract = new ethers.Contract(USDTAddr, IERC20_ABI, deployer)
    //     // console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6))
    //     const USDCContract = new ethers.Contract(USDCAddr, IERC20_ABI, deployer)
    //     // console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6))
    //     const DAIContract = new ethers.Contract(DAIAddr, IERC20_ABI, deployer)
    //     // console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18))

    //     const lpHolderAddr = "0x5342D9085765baBF184e7bBa98C9CB7528dfDACE"
    //     await network.provider.request({method: "hardhat_impersonateAccount", params: [lpHolderAddr]})
    //     const lpHolder = await ethers.getSigner(lpHolderAddr)
    //     await deployer.sendTransaction({to: lpHolderAddr, value: ethers.utils.parseEther("1")})
    //     const lpTokenContract = new ethers.Contract(curve3poolLpAddr, IERC20_ABI, deployer)
    //     await lpTokenContract.connect(lpHolder).transfer(client4.address, ethers.utils.parseUnits("1000", 18))
    //     // console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address)))

    //     // Deposit
    //     await USDTContract.connect(client).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     await powerBomb.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("1000", 6))
    //     // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client.address))) // 997.218478703962224017
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client.address), 6)) // 999.774349

    //     await USDCContract.connect(client2).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     tx = await powerBomb.connect(client2).deposit(USDCAddr, ethers.utils.parseUnits("1000", 6))
    //     // receipt = await tx.wait()
    //     // console.log(receipt.gasUsed.toString()) // 721954
    //     // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client2.address))) // 996.718406465025641389
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client2.address), 6)) // 999.272995

    //     await DAIContract.connect(client3).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     await powerBomb.connect(client3).deposit(DAIAddr, ethers.utils.parseUnits("1000", 18))
    //     // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client3.address))) // 997.468245835035658312
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client3.address), 6)) // 1000.024756

    //     await lpTokenContract.connect(client4).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     await powerBomb.connect(client4).deposit(curve3poolLpAddr, lpTokenContract.balanceOf(client4.address))
    //     // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client4.address))) // 1000.0
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client4.address), 6)) // 1002.563

    //     // console.log(ethers.utils.formatEther(await powerBomb.getAllPool())) // 3991.405131004023523718
    //     // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward())) // 0.0
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getAllPoolInUSD(), 6)) // 4001.635102
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getPricePerFullShareInUSD(), 6)) // 1.002563

    //     // Assume profit
    //     for (let i=0; i<10000; i++) {
    //         await network.provider.send("evm_mine")
    //     }
    //     const WONEContract = new ethers.Contract(WONEAddr, [
    //         "function deposit() external payable",
    //         "function transfer(address, uint) external",
    //         "function balanceOf(address) external view returns (uint)"
    //     ], deployer)
    //     await WONEContract.deposit({value: ethers.utils.parseEther("1")})
    //     await WONEContract.transfer(powerBomb.address, ethers.utils.parseEther("1"))
    //     // console.log(ethers.utils.formatEther(await WONEContract.balanceOf(powerBomb.address)))
    //     // const _powerBomb = new ethers.Contract(powerBomb.address, [
    //     //     "function getPoolPendingReward() external view returns (uint)"
    //     // ], deployer)
    //     // console.log(ethers.utils.formatEther(await _powerBomb.getPoolPendingReward()))

    //     // Harvest
    //     // console.log((await powerBomb.estimateGas.harvest()).toString())
    //     tx = await powerBomb.harvest()
    //     // receipt = await tx.wait()
    //     // console.log(receipt.gasUsed.toString())
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client.address), 18))
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client2.address), 18))
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client3.address), 18))
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client4.address), 18))

    //     // const userBalance1 = await powerBomb.getUserBalance(client.address)
    //     // const userBalance2 = await powerBomb.getUserBalance(client2.address)
    //     // const userBalance3 = await powerBomb.getUserBalance(client3.address)
    //     // const userBalance4 = await powerBomb.getUserBalance(client4.address)
    //     // console.log(ethers.utils.formatEther(userBalance1.add(userBalance2).add(userBalance3).add(userBalance4)))
    //     // console.log(ethers.utils.formatEther(await powerBomb.getAllPool())) // 3991.405131004023523718

    //     // Claim
    //     const WETHContract = new ethers.Contract(WETHAddr, IERC20_ABI, deployer)
    //     await powerBomb.connect(client).claimReward(client.address)
    //     console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client.address), 18)) // 0.0002128
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client.address), 18))
    //     await powerBomb.connect(client2).claimReward(client2.address)
    //     console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client2.address), 18)) // 0.00021269
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client2.address), 18))
    //     await powerBomb.connect(client3).claimReward(client3.address)
    //     console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client3.address), 18)) // 0.00021285
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client3.address), 18))
    //     await powerBomb.connect(client4).claimReward(client4.address)
    //     console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client4.address), 18)) // 0.00021339
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client4.address), 18))

    //     // const aWETHContract = new ethers.Contract(aWETHAddr, IERC20_ABI, deployer)
    //     // console.log(ethers.utils.formatUnits(await aWETHContract.balanceOf(powerBomb.address), 18)) // 0.00001442
    //     // console.log(ethers.utils.formatEther(await WONEContract.balanceOf(powerBomb.address))) // 0.0
    //     // console.log(ethers.utils.formatEther(await WETHContract.balanceOf(powerBomb.address))) // 0.0

    //     // Withdraw
    //     console.log("===withdraw===")
    //     await powerBomb.connect(client).withdraw(USDTAddr, await powerBomb.getUserBalance(client.address))
    //     console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6)) // 999.429567
    //     await powerBomb.connect(client2).withdraw(USDCAddr, await powerBomb.getUserBalance(client2.address))
    //     console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6)) // 999.521614
    //     await powerBomb.connect(client3).withdraw(DAIAddr, await powerBomb.getUserBalance(client3.address))
    //     console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18)) // 999.471819873261723398
    //     await powerBomb.connect(client4).withdraw(curve3poolLpAddr, await powerBomb.getUserBalance(client4.address))
    //     console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address))) // 1000.0
    // })
})
