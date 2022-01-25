const { ethers, network, upgrades } = require("hardhat")
const IERC20_ABI = require("../abis/IERC20_ABI.json")
const router_ABI = require("../abis/router_ABI.json")

const USDTAddr = "0xc7198437980c041c805A1EDcbA50c1Ce5db95118"
const USDCAddr = "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664"
const DAIAddr = "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70"
const WETHAddr = "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB"
const WBTCAddr = "0x50b7545627a5162F82A992c33b87aDc75187B218"
const aUSDCAddr = "0x46a51127c3ce23fb7ab1de06226147f446e4a857"
const aWETHAddr = "0x53f7c5869a859f0aec3d334ee8b4cf01e3492f21"
const aWBTCAddr = "0x686bef2417b6dc32c50a3cbfbcc3bb60e1e9a15d"
const WAVAXAddr = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
const CRVAddr = "0x47536F17F4fF30e64A96a7555826b8f9e66ec468"
const routerJoeAddr = "0x60aE616a2155Ee3d9A68541Ba4544862310933d4"
const curveAaveLpAddr = "0x1337BedC9D22ecbe766dF105c9623922A27963EC"

const poolAddr = "0x7f90122BF0700F9E7e1F688fe926940E8839F353"
const gaugeAddr = "0x5B5CFE992AdAC0C9D48E05854B2d91C73a003858"

describe("PowerBomb Avalanche", function () {
    // it("Should work (BTC) Aave av3pool LP on Curve", async () => {
    //     let tx, receipt
    //     // const [deployer, client, client2, client3, client4] = await ethers.getSigners()
    //     const [me, client, client2, client3, client4] = await ethers.getSigners()

    //     // const deployerAddr = "0x2C10aC0E6B6c1619F4976b2ba559135BFeF53c5E"
    //     const deployerAddr = "0xd924EBAF113AEBE553bC6b83AEf8f9A1B9276d57" // multisig
    //     await network.provider.request({method: "hardhat_impersonateAccount", params: [deployerAddr]})
    //     const deployer = await ethers.getSigner(deployerAddr)
    //     await me.sendTransaction({to: deployerAddr, value: ethers.utils.parseEther("100")})

    //     const botAddr = "0x117972bce574ec4df255075affb837dcfa5a7600"
    //     await network.provider.request({method: "hardhat_impersonateAccount", params: [botAddr]})
    //     const bot = await ethers.getSigner(botAddr)
    //     await me.sendTransaction({to: botAddr, value: ethers.utils.parseEther("100")})

    //     // const PowerBombFac = await ethers.getContractFactory("PowerBombAvaxCurve", deployer)
    //     // const powerBombProxy = await upgrades.deployProxy(PowerBombFac, [poolAddr, gaugeAddr, WBTCAddr], {kind: "uups"})
    //     // const powerBomb = await ethers.getContractAt("PowerBombAvaxCurve", powerBombProxy.address, deployer)
    //     const powerBomb = await ethers.getContractAt("PowerBombAvaxCurve", "0x2510E5054eeEbED40C3C580ae3241F5457b630D9", deployer)

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

    //     // console.log((await powerBomb.ibRewardTokenBaseAmt()).toString())

    //     // const powerBombHelperFac = await ethers.getContractFactory("PowerBombHelperCurve", deployer)
    //     // const powerBombHelperImpl = await powerBombHelperFac.deploy()
    //     // await powerBombHelper.upgradeTo(powerBombHelperImpl.address)

    //     const router = new ethers.Contract(routerJoeAddr, router_ABI, deployer)
    //     await router.swapAVAXForExactTokens(
    //         ethers.utils.parseUnits("1000", 6), [WAVAXAddr, USDTAddr], client.address, Math.ceil(Date.now() / 1000),
    //         {value: ethers.utils.parseEther("50")}
    //     )
    //     await router.swapAVAXForExactTokens(
    //         ethers.utils.parseUnits("1000", 6), [WAVAXAddr, USDCAddr], client2.address, Math.ceil(Date.now() / 1000),
    //         {value: ethers.utils.parseEther("50")}
    //     )
    //     await router.swapAVAXForExactTokens(
    //         ethers.utils.parseUnits("1000", 18), [WAVAXAddr, DAIAddr], client3.address, Math.ceil(Date.now() / 1000),
    //         {value: ethers.utils.parseEther("50")}
    //     )
    //     const USDTContract = new ethers.Contract(USDTAddr, IERC20_ABI, deployer)
    //     // console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6))
    //     const USDCContract = new ethers.Contract(USDCAddr, IERC20_ABI, deployer)
    //     // console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6))
    //     const DAIContract = new ethers.Contract(DAIAddr, IERC20_ABI, deployer)
    //     // console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18))

    //     const lpHolderAddr = "0x0d767adBa2656E8DBF666909B53c4580A3b58118"
    //     await network.provider.request({method: "hardhat_impersonateAccount", params: [lpHolderAddr]})
    //     const lpHolder = await ethers.getSigner(lpHolderAddr)
    //     await deployer.sendTransaction({to: lpHolderAddr, value: ethers.utils.parseEther("1")})
    //     const lpTokenContract = new ethers.Contract(curveAaveLpAddr, IERC20_ABI, deployer)
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
    //     await powerBomb.connect(client4).deposit(curveAaveLpAddr, lpTokenContract.balanceOf(client4.address), 50)
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
    //     tx = await powerBomb.connect(bot).harvest()
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
    //     console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6)) // 999.978628
    //     console.log(ethers.utils.formatUnits(await WBTCContract.balanceOf(client.address), 8)) // 0.00002541
    //     await powerBomb.connect(client2).withdraw(USDCAddr, await powerBomb.getUserBalance(client2.address), 50)
    //     console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6)) // 999.988655
    //     console.log(ethers.utils.formatUnits(await WBTCContract.balanceOf(client2.address), 8)) // 0.0000407
    //     await powerBomb.connect(client3).withdraw(DAIAddr, await powerBomb.getUserBalance(client3.address), 50)
    //     console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18)) // 1000.022940293847356069
    //     console.log(ethers.utils.formatUnits(await WBTCContract.balanceOf(client3.address), 8)) // 0.00004071
    //     await powerBomb.connect(client4).withdraw(curveAaveLpAddr, await powerBomb.getUserBalance(client4.address), 50)
    //     console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address))) // 1000.0
    //     console.log(ethers.utils.formatUnits(await WBTCContract.balanceOf(client4.address), 8)) // 0.00004121
    // })

    it("Should work (ETH) Aave av3pool LP on Curve", async () => {
        let tx, receipt
        // const [deployer, client, client2, client3, client4] = await ethers.getSigners()
        const [me, client, client2, client3, client4] = await ethers.getSigners()

        const deployerAddr = "0xd924EBAF113AEBE553bC6b83AEf8f9A1B9276d57"
        await network.provider.request({method: "hardhat_impersonateAccount", params: [deployerAddr]})
        const deployer = await ethers.getSigner(deployerAddr)
        await me.sendTransaction({to: deployerAddr, value: ethers.utils.parseEther("1000")})

        const botAddr = "0x117972bce574ec4df255075affb837dcfa5a7600"
        await network.provider.request({method: "hardhat_impersonateAccount", params: [botAddr]})
        const bot = await ethers.getSigner(botAddr)
        await me.sendTransaction({to: botAddr, value: ethers.utils.parseEther("1000")})

        // const PowerBombFac = await ethers.getContractFactory("PowerBombAvaxCurve", deployer)
        // const powerBombProxy = await upgrades.deployProxy(PowerBombFac, [poolAddr, gaugeAddr, WETHAddr], {kind: "uups"})
        // const powerBomb = await ethers.getContractAt("PowerBombAvaxCurve", powerBombProxy.address, deployer)
        const powerBomb = await ethers.getContractAt("PowerBombAvaxCurveDepreciated", "0xFAcB839BF8f09f2e7B4b6C83349B5bbFD62fd659", deployer)

        // const PowerBombHelperFac = await ethers.getContractFactory("PowerBombHelperCurve", deployer)
        // const powerBombHelperProxy = await upgrades.deployProxy(PowerBombHelperFac, [powerBomb.address, powerBomb.address], {kind: "uups"})
        // const powerBombHelper = await ethers.getContractAt("PowerBombHelperCurve", powerBombHelperProxy.address, deployer)
        // await powerBomb.setProxy(powerBombHelper.address)
        const powerBombHelper = await ethers.getContractAt("PowerBombHelperCurve", "0xa0Ea9A553cB47658e62Dee4D7b49F7c8Da234B69", deployer)
        
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

        const router = new ethers.Contract(routerJoeAddr, router_ABI, deployer)
        await router.swapAVAXForExactTokens(
            ethers.utils.parseUnits("1000", 6), [WAVAXAddr, USDTAddr], client.address, Math.ceil(Date.now() / 1000),
            {value: ethers.utils.parseEther("50")}
        )
        await router.swapAVAXForExactTokens(
            ethers.utils.parseUnits("1000", 6), [WAVAXAddr, USDCAddr], client2.address, Math.ceil(Date.now() / 1000),
            {value: ethers.utils.parseEther("50")}
        )
        await router.swapAVAXForExactTokens(
            ethers.utils.parseUnits("1000", 18), [WAVAXAddr, DAIAddr], client3.address, Math.ceil(Date.now() / 1000),
            {value: ethers.utils.parseEther("50")}
        )
        const USDTContract = new ethers.Contract(USDTAddr, IERC20_ABI, deployer)
        // console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6))
        const USDCContract = new ethers.Contract(USDCAddr, IERC20_ABI, deployer)
        // console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6))
        const DAIContract = new ethers.Contract(DAIAddr, IERC20_ABI, deployer)
        // console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18))

        const lpHolderAddr = "0x0d767adBa2656E8DBF666909B53c4580A3b58118"
        await network.provider.request({method: "hardhat_impersonateAccount", params: [lpHolderAddr]})
        const lpHolder = await ethers.getSigner(lpHolderAddr)
        await deployer.sendTransaction({to: lpHolderAddr, value: ethers.utils.parseEther("1")})
        const lpTokenContract = new ethers.Contract(curveAaveLpAddr, IERC20_ABI, deployer)
        await lpTokenContract.connect(lpHolder).transfer(client4.address, ethers.utils.parseUnits("1000", 18))
        // console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address)))

        // Deposit
        // await USDTContract.connect(client).approve(powerBomb.address, ethers.constants.MaxUint256)
        // await powerBomb.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("1000", 6))
        // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client.address))) // 997.218478703962224017
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client.address), 6)) // 999.774349
        
        await USDTContract.connect(client).approve(powerBombHelper.address, ethers.constants.MaxUint256)
        await powerBombHelper.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("1000", 6), 0, 10000, 50)

        // await USDCContract.connect(client2).approve(powerBomb.address, ethers.constants.MaxUint256)
        // tx = await powerBomb.connect(client2).deposit(USDCAddr, ethers.utils.parseUnits("1000", 6))
        // receipt = await tx.wait()
        // console.log(receipt.gasUsed.toString()) // 721954
        // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client2.address))) // 996.718406465025641389
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client2.address), 6)) // 999.272995
        
        await USDCContract.connect(client2).approve(powerBombHelper.address, ethers.constants.MaxUint256)
        tx = await powerBombHelper.connect(client2).deposit(USDCAddr, ethers.utils.parseUnits("1000", 6), 0, 10000, 50)

        // await DAIContract.connect(client3).approve(powerBomb.address, ethers.constants.MaxUint256)
        // await powerBomb.connect(client3).deposit(DAIAddr, ethers.utils.parseUnits("1000", 18))
        // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client3.address))) // 997.468245835035658312
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client3.address), 6)) // 1000.024756
        
        await DAIContract.connect(client3).approve(powerBombHelper.address, ethers.constants.MaxUint256)
        await powerBombHelper.connect(client3).deposit(DAIAddr, ethers.utils.parseUnits("1000", 18), 0, 10000, 50)

        // await lpTokenContract.connect(client4).approve(powerBomb.address, ethers.constants.MaxUint256)
        // await powerBomb.connect(client4).deposit(curveAaveLpAddr, lpTokenContract.balanceOf(client4.address))
        // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client4.address))) // 1000.0
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client4.address), 6)) // 1002.563

        // await network.provider.request({method: "evm_increaseTime", params: [864000]})
        // await network.provider.send("evm_mine")
        
        await lpTokenContract.connect(client4).approve(powerBombHelper.address, ethers.constants.MaxUint256)
        await powerBombHelper.connect(client4).deposit(curveAaveLpAddr, lpTokenContract.balanceOf(client4.address), 0, 10000, 50)
        // console.log(ethers.utils.formatEther(await client4.getBalance()))
        // 9999.998196535028756492
        // 10000.006722881782563548

        // console.log(ethers.utils.formatEther(await powerBomb.getAllPool())) // 3991.405131004023523718
        // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward())) // 0.0
        // console.log(ethers.utils.formatUnits(await powerBomb.getAllPoolInUSD(), 6)) // 4001.635102
        // console.log(ethers.utils.formatUnits(await powerBomb.getPricePerFullShareInUSD(), 6)) // 1.002563

        // Assume profit
        await network.provider.request({method: "evm_increaseTime", params: [864000]})
        await network.provider.send("evm_mine")
        // const WAVAXContract = new ethers.Contract(WAVAXAddr, [
        //     "function deposit() external payable",
        //     "function transfer(address, uint) external",
        //     "function balanceOf(address) external view returns (uint)"
        // ], deployer)
        // await WAVAXContract.deposit({value: ethers.utils.parseEther("1")})
        // await WAVAXContract.transfer(powerBomb.address, ethers.utils.parseEther("1"))
        // console.log(ethers.utils.formatEther(await WAVAXContract.balanceOf(powerBomb.address)))
        // const _powerBomb = new ethers.Contract(powerBomb.address, [
        //     "function getPoolPendingReward() external view returns (uint)"
        // ], deployer)
        // console.log(ethers.utils.formatEther(await _powerBomb.getPoolPendingReward()))

        // Experiment
        // console.log("----------")
        // await network.provider.request({method: "evm_increaseTime", params: [864000]})
        // await network.provider.send("evm_mine")

        // await USDTContract.connect(client).approve(powerBombHelper.address, ethers.constants.MaxUint256)
        // await powerBombHelper.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("1000", 6), 0, 10000, 50)
        // console.log(ethers.utils.formatEther(await client.getBalance()))
        
        // const WAVAXContract = new ethers.Contract(WAVAXAddr, IERC20_ABI, deployer)
        // console.log(ethers.utils.formatEther(await WAVAXContract.balanceOf(powerBomb.address)))
        // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward()))
        // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward(CRVAddr)))
        // 1.664049143237236073 1.664065423175510959

        // await USDTContract.connect(client).approve(powerBombHelper.address, ethers.constants.MaxUint256)
        // tx = await powerBombHelper.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("1000", 6), 0, 10000, 50)
        // tx = await powerBomb.harvest()
        // receipt = await tx.wait()
        // console.log(receipt.gasUsed.toString())
        // 1) Deposit, no avax from aave, no crv from curve, no aave from curve to swap - 875877 0.023454525
        // 2) Deposit, got avax from curve to swap - 1156711 0.0311397
        // 3) Deposit got avax & CRV from curve to swap - 1218416 0.032800854
        // 4) Deposit + all 3 swap - 1262976 0.034000449
        // 5) No deposit regular harvest all 3 - 638229 0.017087405
        // Experiment

        // Harvest
        // console.log((await powerBomb.estimateGas.harvest()).toString())
        // tx = await powerBomb.connect(bot).harvest()
        tx = await powerBomb.harvest()
        // receipt = await tx.wait()
        // console.log(receipt.gasUsed.toString())
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client.address), 18))
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client2.address), 18))
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client3.address), 18))
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client4.address), 18))
        // console.log(ethers.utils.formatEther(await anos.getBalance()))
        // 9999.999677180294726773
        // 10000.008066497640429169
        // 10000.018238127841421875

        // const userBalance1 = await powerBomb.getUserBalance(client.address)
        // const userBalance2 = await powerBomb.getUserBalance(client2.address)
        // const userBalance3 = await powerBomb.getUserBalance(client3.address)
        // const userBalance4 = await powerBomb.getUserBalance(client4.address)
        // console.log(ethers.utils.formatEther(userBalance1.add(userBalance2).add(userBalance3).add(userBalance4)))
        // console.log(ethers.utils.formatEther(await powerBomb.getAllPool())) // 3991.405131004023523718

        // Claim
        const WETHContract = new ethers.Contract(WETHAddr, IERC20_ABI, deployer)
        // await powerBomb.connect(client).claimReward(client.address)
        // console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client.address), 18)) // 0.000633389844853528
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client.address), 18))
        // await powerBomb.connect(client2).claimReward(client2.address)
        // console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client2.address), 18)) // 0.000633176263003788
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client2.address), 18))
        // await powerBomb.connect(client3).claimReward(client3.address)
        // console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client3.address), 18)) // 0.00063320642562474
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client3.address), 18))
        // await powerBomb.connect(client4).claimReward(client4.address)
        // console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client4.address), 18)) // 0.00063765263670427
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client4.address), 18))

        // const aWETHContract = new ethers.Contract(aWETHAddr, IERC20_ABI, deployer)
        // console.log(ethers.utils.formatUnits(await aWETHContract.balanceOf(powerBomb.address), 18)) // 0.00001442
        // console.log(ethers.utils.formatEther(await WAVAXContract.balanceOf(powerBomb.address))) // 0.0
        // console.log(ethers.utils.formatEther(await WETHContract.balanceOf(powerBomb.address))) // 0.0

        // Withdraw
        console.log("===withdraw===")
        await powerBomb.connect(client).withdraw(USDTAddr, await powerBomb.getUserBalance(client.address), 50)
        console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6)) // 999.99783
        console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client.address), 18)) // 0.000033635277144734
        await powerBomb.connect(client2).withdraw(USDCAddr, await powerBomb.getUserBalance(client2.address), 50)
        console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6)) // 1000.005864
        console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client2.address), 18)) // 0.000372153264879619
        await powerBomb.connect(client3).withdraw(DAIAddr, await powerBomb.getUserBalance(client3.address), 50)
        console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18)) // 1000.04193680408273744
        console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client3.address), 18)) // 0.000372211633113142
        await powerBomb.connect(client4).withdraw(curveAaveLpAddr, await powerBomb.getUserBalance(client4.address), 50)
        console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address))) // 1000.0
        console.log(ethers.utils.formatUnits(await WETHContract.balanceOf(client4.address), 18)) // 0.000376722197625158
    })
})