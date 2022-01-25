const { ethers, network, upgrades } = require("hardhat")
const IERC20_ABI = require("../abis/IERC20_ABI.json")
const router_ABI = require("../abis/router_ABI.json")
const routerSpookyABI = require("../abis/routerSpookyABI.json")

const USDTAddr = "0x049d68029688eAbF473097a2fC38ef61633A3C7A"
const USDCAddr = "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75"
const DAIAddr = "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E"
const WETHAddr = "0x74b23882a30290451A17c44f4F05243b6b58C76d"
const WBTCAddr = "0x321162Cd933E2Be498Cd2267a90534A804051b11"
// const aUSDCAddr = ""
// const aWETHAddr = ""
// const aWBTCAddr = ""
const WFTMAddr = "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
const CRVAddr = "0x1E4F97b9f9F913c46F1632781732927B9019C68b"
const GEISTAddr = "0xd8321AA83Fb0a4ECd6348D4577431310A6E0814d"
const routerSpookyAddr = "0xF491e7B69E4244ad4002BC14e878a34207E38c29"
const curveGeistLpAddr = "0xD02a30d33153877BC20e5721ee53DeDEE0422B2F"

const poolAddr = "0x0fa949783947Bf6c1b171DB13AEACBB488845B3f"
const gaugeAddr = "0xd4F94D0aaa640BBb72b5EEc2D85F6D114D81a88E"

const multisigAddr = "0x6e797bc04746EE7a04408796016dF4897Ee28A71"

describe("PowerBomb Curve", function () {
    // it("Should work (BTC) Geist g3pool LP on Curve", async () => {
    //     let tx, receipt
    //     const [deployer, client, client2, client3, client4] = await ethers.getSigners()
    //     // const [me, client, client2, client3, client4] = await ethers.getSigners()

    //     // // const deployerAddr = "0x2C10aC0E6B6c1619F4976b2ba559135BFeF53c5E"
    //     // const deployerAddr = "0xd924EBAF113AEBE553bC6b83AEf8f9A1B9276d57" // multisig
    //     // await network.provider.request({method: "hardhat_impersonateAccount", params: [deployerAddr]})
    //     // const deployer = await ethers.getSigner(deployerAddr)
    //     // await me.sendTransaction({to: deployerAddr, value: ethers.utils.parseEther("100")})

    //     // const botAddr = "0x117972bce574ec4df255075affb837dcfa5a7600"
    //     // await network.provider.request({method: "hardhat_impersonateAccount", params: [botAddr]})
    //     // const bot = await ethers.getSigner(botAddr)
    //     // await me.sendTransaction({to: botAddr, value: ethers.utils.parseEther("100")})

    //     const PowerBombFac = await ethers.getContractFactory("PowerBombFtmCurveGeist", deployer)
    //     const powerBombProxy = await upgrades.deployProxy(PowerBombFac, [poolAddr, gaugeAddr, WBTCAddr, multisigAddr], {kind: "uups"})
    //     const powerBomb = await ethers.getContractAt("PowerBombFtmCurveGeist", powerBombProxy.address, deployer)
    //     // const powerBomb = await ethers.getContractAt("PowerBombFtmCurveGeist", "0x2510E5054eeEbED40C3C580ae3241F5457b630D9", deployer)

    //     // const PowerBombHelperFac = await ethers.getContractFactory("PowerBombHelperCurve", deployer)
    //     // const powerBombHelperProxy = await upgrades.deployProxy(PowerBombHelperFac, [powerBomb.address, powerBomb.address], {kind: "uups"})
    //     // const powerBombHelper = await ethers.getContractAt("PowerBombHelperCurve", powerBombHelperProxy.address, deployer)
    //     // await powerBomb.setProxy(powerBombHelper.address)
    //     // const powerBombHelper = await ethers.getContractAt("PowerBombHelperCurve", "0xa0Ea9A553cB47658e62Dee4D7b49F7c8Da234B69", deployer)
        
    //     // Upgrade
    //     // const powerBombFac = await ethers.getContractFactory("PowerBombAvaxCurveDepreciated", deployer)
    //     // const powerBombImpl = await powerBombFac.deploy()
    //     // const powerBombInterface = new ethers.utils.Interface(["function fixAaveReward()"])
    //     // const data = powerBombInterface.encodeFunctionData("fixAaveReward")
    //     // await powerBomb.upgradeToAndCall(powerBombImpl.address, data)
    //     // await powerBomb.upgradeToAndCall("0x5dbdf46E7502A75E41264D8fB474E56514f267dD", "0x77c35ef7")
    //     // await powerBomb.upgradeTo(powerBombImpl.address)

    //     // const powerBombHelperFac = await ethers.getContractFactory("PowerBombHelperCurve", deployer)
    //     // const powerBombHelperImpl = await powerBombHelperFac.deploy()
    //     // await powerBombHelper.upgradeTo(powerBombHelperImpl.address)

    //     const router = new ethers.Contract(routerSpookyAddr, routerSpookyABI, deployer)
    //     await router.swapETHForExactTokens(
    //         ethers.utils.parseUnits("1000", 6), [WFTMAddr, USDTAddr], client.address, Math.ceil(Date.now() / 1000),
    //         {value: ethers.utils.parseEther("500")}
    //     )
    //     await router.swapETHForExactTokens(
    //         ethers.utils.parseUnits("1000", 6), [WFTMAddr, USDCAddr], client2.address, Math.ceil(Date.now() / 1000),
    //         {value: ethers.utils.parseEther("500")}
    //     )
    //     await router.swapETHForExactTokens(
    //         ethers.utils.parseUnits("1000", 18), [WFTMAddr, DAIAddr], client3.address, Math.ceil(Date.now() / 1000),
    //         {value: ethers.utils.parseEther("500")}
    //     )
    //     const USDTContract = new ethers.Contract(USDTAddr, IERC20_ABI, deployer)
    //     // console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6))
    //     const USDCContract = new ethers.Contract(USDCAddr, IERC20_ABI, deployer)
    //     // console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6))
    //     const DAIContract = new ethers.Contract(DAIAddr, IERC20_ABI, deployer)
    //     // console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18))

    //     const lpHolderAddr = "0x47A11b9B6EB71F047d797E44E6BA508Eba9F2e16"
    //     await network.provider.request({method: "hardhat_impersonateAccount", params: [lpHolderAddr]})
    //     const lpHolder = await ethers.getSigner(lpHolderAddr)
    //     await deployer.sendTransaction({to: lpHolderAddr, value: ethers.utils.parseEther("1")})
    //     const lpTokenContract = new ethers.Contract(curveGeistLpAddr, IERC20_ABI, deployer)
    //     await lpTokenContract.connect(lpHolder).transfer(client4.address, ethers.utils.parseUnits("1000", 18))
    //     // console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address)))

    //     // Deposit
    //     await USDTContract.connect(client).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     await powerBomb.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("1000", 6), 50)
    //     // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client.address))) // 997.218478703962224017
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client.address), 6)) // 999.774349

    //     // await USDTContract.connect(client).approve(powerBombHelper.address, ethers.constants.MaxUint256)
    //     // await powerBombHelper.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("1000", 6), 0, 10000, 50)

    //     await USDCContract.connect(client2).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     tx = await powerBomb.connect(client2).deposit(USDCAddr, ethers.utils.parseUnits("1000", 6), 50)
    //     // receipt = await tx.wait()
    //     // console.log(receipt.gasUsed.toString()) // 721954
    //     // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client2.address))) // 996.718406465025641389
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client2.address), 6)) // 999.272995

    //     // await USDCContract.connect(client2).approve(powerBombHelper.address, ethers.constants.MaxUint256)
    //     // tx = await powerBombHelper.connect(client2).deposit(USDCAddr, ethers.utils.parseUnits("1000", 6), 0, 10000, 50)

    //     await DAIContract.connect(client3).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     await powerBomb.connect(client3).deposit(DAIAddr, ethers.utils.parseUnits("1000", 18), 50)
    //     // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client3.address))) // 997.468245835035658312
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client3.address), 6)) // 1000.024756

    //     // await DAIContract.connect(client3).approve(powerBombHelper.address, ethers.constants.MaxUint256)
    //     // await powerBombHelper.connect(client3).deposit(DAIAddr, ethers.utils.parseUnits("1000", 18), 0, 10000, 50)

    //     await lpTokenContract.connect(client4).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     await powerBomb.connect(client4).deposit(curveGeistLpAddr, lpTokenContract.balanceOf(client4.address), 50)
    //     // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client4.address))) // 1000.0
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client4.address), 6)) // 1002.563

    //     // console.log(ethers.utils.formatEther(await powerBomb.getAllPool())) // 3991.405131004023523718
    //     // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward())) // 0.0
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getAllPoolInUSD(), 6)) // 4001.635102
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getPricePerFullShareInUSD(), 6)) // 1.002563

    //     // Assume profit
    //     await network.provider.request({method: "evm_increaseTime", params: [864000]})
    //     await network.provider.send("evm_mine")
    //     // const _powerBomb = new ethers.Contract(powerBomb.address, [
    //     //     "function getPoolPendingReward() external view returns (uint)"
    //     // ], deployer)
    //     // console.log(ethers.utils.formatEther(await _powerBomb.getPoolPendingReward()))

    //     // Harvest
    //     // console.log((await powerBomb.estimateGas.harvest()).toString())
    //     tx = await powerBomb.harvest()
    //     // tx = await powerBomb.connect(bot).harvest()
    //     // receipt = await tx.wait()
    //     // console.log(receipt.gasUsed.toString())
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client.address), 8))
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client2.address), 8))
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client3.address), 8))
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client4.address), 8))

    //     // const userBalance1 = await powerBomb.getUserBalance(client.address)
    //     // const userBalance2 = await powerBomb.getUserBalance(client2.address)
    //     // const userBalance3 = await powerBomb.getUserBalance(client3.address)
    //     // const userBalance4 = await powerBomb.getUserBalance(client4.address)
    //     // console.log(ethers.utils.formatEther(userBalance1.add(userBalance2).add(userBalance3).add(userBalance4)))
    //     // console.log(ethers.utils.formatEther(await powerBomb.getAllPool())) // 3991.405131004023523718

    //     // Claim
    //     const WBTCContract = new ethers.Contract(WBTCAddr, IERC20_ABI, deployer)
    //     // await powerBomb.connect(client).claimReward(client.address)
    //     // console.log(ethers.utils.formatUnits(await WBTCContract.balanceOf(client.address), 8)) // 0.0002128
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client.address), 8))
    //     // await powerBomb.connect(client2).claimReward(client2.address)
    //     // console.log(ethers.utils.formatUnits(await WBTCContract.balanceOf(client2.address), 8)) // 0.00021269
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client2.address), 8))
    //     // await powerBomb.connect(client3).claimReward(client3.address)
    //     // console.log(ethers.utils.formatUnits(await WBTCContract.balanceOf(client3.address), 8)) // 0.00021285
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client3.address), 8))
    //     // await powerBomb.connect(client4).claimReward(client4.address)
    //     // console.log(ethers.utils.formatUnits(await WBTCContract.balanceOf(client4.address), 8)) // 0.00021339
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client4.address), 8))

    //     // const aWBTCContract = new ethers.Contract(aWBTCAddr, IERC20_ABI, deployer)
    //     // console.log(ethers.utils.formatUnits(await aWBTCContract.balanceOf(powerBomb.address), 8)) // 0.00001442
    //     // console.log(ethers.utils.formatEther(await WAVAXContract.balanceOf(powerBomb.address))) // 0.0
    //     // console.log(ethers.utils.formatEther(await WBTCContract.balanceOf(powerBomb.address))) // 0.0


    //     // Withdraw
    //     console.log("===withdraw===")
    //     await powerBomb.connect(client).withdraw(USDTAddr, await powerBomb.getUserBalance(client.address), 50)
    //     console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6)) // 1000.417173
    //     console.log(ethers.utils.formatUnits(await WBTCContract.balanceOf(client.address), 8)) // 0.00005936
    //     await powerBomb.connect(client2).withdraw(USDCAddr, await powerBomb.getUserBalance(client2.address), 50)
    //     console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6)) // 1000.340528
    //     console.log(ethers.utils.formatUnits(await WBTCContract.balanceOf(client2.address), 8)) // 0.00005939
    //     await powerBomb.connect(client3).withdraw(DAIAddr, await powerBomb.getUserBalance(client3.address), 50)
    //     console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18)) // 1000.405421161215243921
    //     console.log(ethers.utils.formatUnits(await WBTCContract.balanceOf(client3.address), 8)) // 0.00005939
    //     await powerBomb.connect(client4).withdraw(curveGeistLpAddr, await powerBomb.getUserBalance(client4.address), 50)
    //     console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address))) // 1000.0
    //     console.log(ethers.utils.formatUnits(await WBTCContract.balanceOf(client4.address), 8)) // 0.00005994
    // })

    it("Should work (ETH) Geist g3pool LP on Curve", async () => {
        let tx, receipt
        const [deployer, client, client2, client3, client4] = await ethers.getSigners()
        // const [me, client, client2, client3, client4] = await ethers.getSigners()

        // const deployerAddr = "0xd924EBAF113AEBE553bC6b83AEf8f9A1B9276d57"
        // await network.provider.request({method: "hardhat_impersonateAccount", params: [deployerAddr]})
        // const deployer = await ethers.getSigner(deployerAddr)
        // await me.sendTransaction({to: deployerAddr, value: ethers.utils.parseEther("1000")})

        // const botAddr = "0x117972bce574ec4df255075affb837dcfa5a7600"
        // await network.provider.request({method: "hardhat_impersonateAccount", params: [botAddr]})
        // const bot = await ethers.getSigner(botAddr)
        // await me.sendTransaction({to: botAddr, value: ethers.utils.parseEther("1000")})

        const PowerBombFac = await ethers.getContractFactory("PowerBombFtmCurveGeist", deployer)
        const powerBombProxy = await upgrades.deployProxy(PowerBombFac, [poolAddr, gaugeAddr, WETHAddr, multisigAddr], {kind: "uups"})
        const powerBomb = await ethers.getContractAt("PowerBombFtmCurveGeist", powerBombProxy.address, deployer)
        // const powerBomb = await ethers.getContractAt("PowerBombAvaxCurveDepreciated", "0xFAcB839BF8f09f2e7B4b6C83349B5bbFD62fd659", deployer)

        // const PowerBombHelperFac = await ethers.getContractFactory("PowerBombHelperCurve", deployer)
        // const powerBombHelperProxy = await upgrades.deployProxy(PowerBombHelperFac, [powerBomb.address, powerBomb.address], {kind: "uups"})
        // const powerBombHelper = await ethers.getContractAt("PowerBombHelperCurve", powerBombHelperProxy.address, deployer)
        // await powerBomb.setProxy(powerBombHelper.address)
        // const powerBombHelper = await ethers.getContractAt("PowerBombHelperCurve", "0xa0Ea9A553cB47658e62Dee4D7b49F7c8Da234B69", deployer)
        
        // Upgrade
        // const powerBombFac = await ethers.getContractFactory("PowerBombAvaxCurveDepreciated", deployer)
        // const powerBombImpl = await powerBombFac.deploy()
        // const powerBombInterface = new ethers.utils.Interface(["function fixAaveReward()"])
        // const data = powerBombInterface.encodeFunctionData("fixAaveReward")
        // await powerBomb.upgradeToAndCall(powerBombImpl.address, data)
        // await powerBomb.upgradeToAndCall("0x5dbdf46E7502A75E41264D8fB474E56514f267dD", "0x77c35ef7")
        // await powerBomb.upgradeTo(powerBombImpl.address)

        // const powerBombHelperFac = await ethers.getContractFactory("PowerBombHelperCurve", deployer)
        // const powerBombHelperImpl = await powerBombHelperFac.deploy()
        // await powerBombHelper.upgradeTo(powerBombHelperImpl.address)

        const router = new ethers.Contract(routerSpookyAddr, routerSpookyABI, deployer)
        await router.swapETHForExactTokens(
            ethers.utils.parseUnits("1000", 6), [WFTMAddr, USDTAddr], client.address, Math.ceil(Date.now() / 1000),
            {value: ethers.utils.parseEther("1000")}
        )
        await router.swapETHForExactTokens(
            ethers.utils.parseUnits("1000", 6), [WFTMAddr, USDCAddr], client2.address, Math.ceil(Date.now() / 1000),
            {value: ethers.utils.parseEther("1000")}
        )
        await router.swapETHForExactTokens(
            ethers.utils.parseUnits("1000", 18), [WFTMAddr, DAIAddr], client3.address, Math.ceil(Date.now() / 1000),
            {value: ethers.utils.parseEther("1000")}
        )
        const USDTContract = new ethers.Contract(USDTAddr, IERC20_ABI, deployer)
        // console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6))
        const USDCContract = new ethers.Contract(USDCAddr, IERC20_ABI, deployer)
        // console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6))
        const DAIContract = new ethers.Contract(DAIAddr, IERC20_ABI, deployer)
        // console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18))

        const lpHolderAddr = "0x47A11b9B6EB71F047d797E44E6BA508Eba9F2e16"
        await network.provider.request({method: "hardhat_impersonateAccount", params: [lpHolderAddr]})
        const lpHolder = await ethers.getSigner(lpHolderAddr)
        await deployer.sendTransaction({to: lpHolderAddr, value: ethers.utils.parseEther("1")})
        const lpTokenContract = new ethers.Contract(curveGeistLpAddr, IERC20_ABI, deployer)
        await lpTokenContract.connect(lpHolder).transfer(client4.address, ethers.utils.parseUnits("1000", 18))
        // console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address)))

        // Deposit
        await USDTContract.connect(client).approve(powerBomb.address, ethers.constants.MaxUint256)
        await powerBomb.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("1000", 6), 50)
        // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client.address))) // 997.218478703962224017
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client.address), 6)) // 999.774349
        
        // // await USDTContract.connect(client).approve(powerBombHelper.address, ethers.constants.MaxUint256)
        // // await powerBombHelper.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("1000", 6), 0, 10000, 50)

        await network.provider.request({method: "evm_increaseTime", params: [86400*2]})
        await network.provider.send("evm_mine")

        await USDCContract.connect(client2).approve(powerBomb.address, ethers.constants.MaxUint256)
        tx = await powerBomb.connect(client2).deposit(USDCAddr, ethers.utils.parseUnits("1000", 6), 50)
        receipt = await tx.wait()
        console.log(receipt.gasUsed.toString()) // 
        // // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client2.address))) // 996.718406465025641389
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client2.address), 6)) // 999.272995
        
        // // await USDCContract.connect(client2).approve(powerBombHelper.address, ethers.constants.MaxUint256)
        // // tx = await powerBombHelper.connect(client2).deposit(USDCAddr, ethers.utils.parseUnits("1000", 6), 0, 10000, 50)

        // await DAIContract.connect(client3).approve(powerBomb.address, ethers.constants.MaxUint256)
        // await powerBomb.connect(client3).deposit(DAIAddr, ethers.utils.parseUnits("1000", 18), 50)
        // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client3.address))) // 997.468245835035658312
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client3.address), 6)) // 1000.024756
        
        // await DAIContract.connect(client3).approve(powerBombHelper.address, ethers.constants.MaxUint256)
        // await powerBombHelper.connect(client3).deposit(DAIAddr, ethers.utils.parseUnits("1000", 18), 0, 10000, 50)

        // await lpTokenContract.connect(client4).approve(powerBomb.address, ethers.constants.MaxUint256)
        // await powerBomb.connect(client4).deposit(curveGeistLpAddr, lpTokenContract.balanceOf(client4.address), 0)
        // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client4.address))) // 1000.0
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client4.address), 6)) // 1002.563

        //  --- Check gas fee ---
        // await network.provider.request({method: "evm_increaseTime", params: [864000]})
        // await network.provider.send("evm_mine")

        // await DAIContract.connect(client3).approve(powerBomb.address, ethers.constants.MaxUint256)
        // tx = await powerBomb.connect(client3).deposit(DAIAddr, ethers.utils.parseUnits("1000", 18), 50)
        // receipt = await tx.wait()
        // console.log(receipt.gasUsed.toString())

        // tx = await powerBomb.harvest()
        // receipt = await tx.wait()
        // console.log(receipt.gasUsed.toString())

        // Deposit only - 3078616
        // Deposit with full harvest - 3206247
        // Full harvest only - 2748922

        //  --- End check gas fee ---

        // // Assume profit
        // await network.provider.request({method: "evm_increaseTime", params: [864000]})
        // await network.provider.send("evm_mine")
        // // const WAVAXContract = new ethers.Contract(WAVAXAddr, [
        // //     "function deposit() external payable",
        // //     "function transfer(address, uint) external",
        // //     "function balanceOf(address) external view returns (uint)"
        // // ], deployer)
        // // await WAVAXContract.deposit({value: ethers.utils.parseEther("1")})
        // // await WAVAXContract.transfer(powerBomb.address, ethers.utils.parseEther("1"))
        // // console.log(ethers.utils.formatEther(await WAVAXContract.balanceOf(powerBomb.address)))
        // // const _powerBomb = new ethers.Contract(powerBomb.address, [
        // //     "function getPoolPendingReward() external view returns (uint)"
        // // ], deployer)
        // // console.log(ethers.utils.formatEther(await _powerBomb.getPoolPendingReward()))

        // // Harvest
        // // console.log((await powerBomb.estimateGas.harvest()).toString())
        // // tx = await powerBomb.connect(bot).harvest()
        // tx = await powerBomb.harvest()
        // // receipt = await tx.wait()
        // // console.log(receipt.gasUsed.toString())
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client.address), 18))
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client2.address), 18))
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client3.address), 18))
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client4.address), 18))
        // // console.log(ethers.utils.formatEther(await anos.getBalance()))
        // // 9999.999677180294726773
        // // 10000.008066497640429169
        // // 10000.018238127841421875

        // // const userBalance1 = await powerBomb.getUserBalance(client.address)
        // // const userBalance2 = await powerBomb.getUserBalance(client2.address)
        // // const userBalance3 = await powerBomb.getUserBalance(client3.address)
        // // const userBalance4 = await powerBomb.getUserBalance(client4.address)
        // // console.log(ethers.utils.formatEther(userBalance1.add(userBalance2).add(userBalance3).add(userBalance4)))
        // // console.log(ethers.utils.formatEther(await powerBomb.getAllPool())) // 3991.405131004023523718

        // // Claim
        // const WETHContract = new ethers.Contract(WETHAddr, IERC20_ABI, deployer)
        // // await powerBomb.connect(client).claimReward(client.address)
        // // console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client.address), 18)) // 0.000633389844853528
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client.address), 18))
        // // await powerBomb.connect(client2).claimReward(client2.address)
        // // console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client2.address), 18)) // 0.000633176263003788
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client2.address), 18))
        // // await powerBomb.connect(client3).claimReward(client3.address)
        // // console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client3.address), 18)) // 0.00063320642562474
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client3.address), 18))
        // // await powerBomb.connect(client4).claimReward(client4.address)
        // // console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client4.address), 18)) // 0.00063765263670427
        // // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client4.address), 18))

        // // const aWETHContract = new ethers.Contract(aWETHAddr, IERC20_ABI, deployer)
        // // console.log(ethers.utils.formatUnits(await aWETHContract.balanceOf(powerBomb.address), 18)) // 0.00001442
        // // console.log(ethers.utils.formatEther(await WAVAXContract.balanceOf(powerBomb.address))) // 0.0
        // // console.log(ethers.utils.formatEther(await WETHContract.balanceOf(powerBomb.address))) // 0.0

        // // Withdraw
        // console.log("===withdraw===")
        // await powerBomb.connect(client).withdraw(USDTAddr, await powerBomb.getUserBalance(client.address), 50)
        // console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6)) // 1000.417159
        // console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client.address), 18)) // 0.000861452530240777
        // await powerBomb.connect(client2).withdraw(USDCAddr, await powerBomb.getUserBalance(client2.address), 50)
        // console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6)) // 1000.340534
        // console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client2.address), 18)) // 0.000861827136806
        // await powerBomb.connect(client3).withdraw(DAIAddr, await powerBomb.getUserBalance(client3.address), 50)
        // console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18)) // 1000.405419853622556069
        // console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client3.address), 18)) // 0.000861865567508805
        // await powerBomb.connect(client4).withdraw(curveGeistLpAddr, await powerBomb.getUserBalance(client4.address), 50)
        // console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address))) // 1000.0
        // console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client4.address), 18)) // 0.000869879975823294
    })
})