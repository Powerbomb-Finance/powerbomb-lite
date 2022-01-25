const { ethers, network, upgrades } = require("hardhat")
const IERC20_ABI = require("../abis/IERC20_ABI.json")
const IWAVAX_ABI = require("../abis/IWAVAX_ABI.json")
const router_ABI = require("../abis/router_ABI.json")

const USDTAddr = "0xc7198437980c041c805A1EDcbA50c1Ce5db95118"
const USDCAddr = "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664"
const DAIAddr = "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70"
const wsOHMAddr = "0x8cd309e14575203535ef120b5b0ab4dded0c2073" // Depreciated
const gOHMAddr = "0x321E7092a180BB43555132ec53AaA65a5bF84251"
const TIMEAddr = "0xb54f16fb19478766a268f172c9480f8da1a7c9c3"
const MEMOAddr = "0x136Acd46C134E8269052c62A67042D6bDeDde3C9"
const wMEMOAddr = "0x0da67235dd5787d67955420c84ca1cecd4e5bb3b"
const WAVAXAddr = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
const CRVAddr = "0x47536F17F4fF30e64A96a7555826b8f9e66ec468"
const routerJoeAddr = "0x60aE616a2155Ee3d9A68541Ba4544862310933d4"
const curveAaveLpAddr = "0x1337BedC9D22ecbe766dF105c9623922A27963EC"

const poolAddr = "0x7f90122BF0700F9E7e1F688fe926940E8839F353"
const gaugeAddr = "0x5B5CFE992AdAC0C9D48E05854B2d91C73a003858"

describe("PowerBomb Avalanche", function () {
    // it("Should work (gOHM) Aave av3pool LP on Curve", async () => {
    //     let tx, receipt
    //     // const [deployer, client, client2, client3, client4] = await ethers.getSigners()
    //     const [me, client, client2, client3, client4] = await ethers.getSigners()

    //     const deployerAddr = "0xd924EBAF113AEBE553bC6b83AEf8f9A1B9276d57"
    //     await network.provider.request({method: "hardhat_impersonateAccount", params: [deployerAddr]})
    //     const deployer = await ethers.getSigner(deployerAddr)
    //     await me.sendTransaction({to: deployerAddr, value: ethers.utils.parseEther("1000")})

    //     const botAddr = "0x117972bce574ec4df255075affb837dcfa5a7600"
    //     await network.provider.request({method: "hardhat_impersonateAccount", params: [botAddr]})
    //     const bot = await ethers.getSigner(botAddr)
    //     await me.sendTransaction({to: botAddr, value: ethers.utils.parseEther("1000")})

    //     // const PowerBombFac = await ethers.getContractFactory("PowerBombAvaxCurve33", deployer)
    //     // const powerBombProxy = await upgrades.deployProxy(PowerBombFac, [poolAddr, gaugeAddr, wsOHMAddr], {kind: "uups"})
    //     // const powerBomb = await ethers.getContractAt("PowerBombAvaxCurve33", powerBombProxy.address, deployer)
    //     const powerBomb = await ethers.getContractAt("PowerBombAvaxCurve33", "0x4d3e58DAa8233Cc6a46b9c6e23df5A202B178550", deployer)

    //     // const PowerBombHelperFac = await ethers.getContractFactory("PowerBombHelperCurve", deployer)
    //     // const powerBombHelperProxy = await upgrades.deployProxy(PowerBombHelperFac, [powerBomb.address, powerBomb.address], {kind: "uups"})
    //     // const powerBombHelper = await ethers.getContractAt("PowerBombHelperCurve", powerBombHelperProxy.address, deployer)
    //     // await powerBomb.setProxy(powerBombHelper.address)
    //     const powerBombHelper = await ethers.getContractAt("PowerBombHelperCurve", "0xA1b6A47927671e5e1FB20b906F527ad56b14144C", deployer)

    //     // await powerBomb.setProxy(powerBombHelper.address)
        
    //     // Upgrade
    //     // const powerBombFac = await ethers.getContractFactory("PowerBombAvaxCurve33", deployer)
    //     // const powerBombImpl = await powerBombFac.deploy()
    //     // await powerBomb.upgradeTo(powerBombImpl.address)

    //     // const wsOHMContract = new ethers.Contract(wsOHMAddr, IERC20_ABI, deployer)
    //     // const gOHMContract = new ethers.Contract(gOHMAddr, IERC20_ABI, deployer)

    //     // console.log(ethers.utils.formatEther(await wsOHMContract.balanceOf(powerBomb.address)))
    //     // console.log(ethers.utils.formatEther(await gOHMContract.balanceOf(powerBomb.address)))

    //     // await powerBomb.setBot(botAddr)
    //     // await powerBomb.change_wsOHM_to_gOHM()

    //     // console.log(ethers.utils.formatEther(await wsOHMContract.balanceOf(powerBomb.address)))
    //     // console.log(ethers.utils.formatEther(await gOHMContract.balanceOf(powerBomb.address)))

    //     // const powerBombHelperFac = await ethers.getContractFactory("PowerBombHelperCurve", deployer)
    //     // const powerBombHelperImpl = await powerBombHelperFac.deploy()
    //     // await powerBombHelper.upgradeTo(powerBombHelperImpl.address)

    //     // await powerBombHelper.upgradeContract(powerBomb.address, "0x416e3eC7170a7293034D16Ad3C1ead2f276aE816")

    //     const router = new ethers.Contract(routerJoeAddr, router_ABI, deployer)
    //     await router.swapAVAXForExactTokens(
    //         ethers.utils.parseUnits("10000", 6), [WAVAXAddr, USDTAddr], client.address, Math.ceil(Date.now() / 1000),
    //         {value: ethers.utils.parseEther("500")}
    //     )
    //     await router.swapAVAXForExactTokens(
    //         ethers.utils.parseUnits("10000", 6), [WAVAXAddr, USDCAddr], client2.address, Math.ceil(Date.now() / 1000),
    //         {value: ethers.utils.parseEther("500")}
    //     )
    //     await router.swapAVAXForExactTokens(
    //         ethers.utils.parseUnits("10000", 18), [WAVAXAddr, DAIAddr], client3.address, Math.ceil(Date.now() / 1000),
    //         {value: ethers.utils.parseEther("500")}
    //     )
    //     const USDTContract = new ethers.Contract(USDTAddr, IERC20_ABI, deployer)
    //     // // console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6))
    //     const USDCContract = new ethers.Contract(USDCAddr, IERC20_ABI, deployer)
    //     // // console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6))
    //     const DAIContract = new ethers.Contract(DAIAddr, IERC20_ABI, deployer)
    //     // // console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18))

    //     const lpHolderAddr = "0x0d767adBa2656E8DBF666909B53c4580A3b58118"
    //     await network.provider.request({method: "hardhat_impersonateAccount", params: [lpHolderAddr]})
    //     const lpHolder = await ethers.getSigner(lpHolderAddr)
    //     await deployer.sendTransaction({to: lpHolderAddr, value: ethers.utils.parseEther("1")})
    //     const lpTokenContract = new ethers.Contract(curveAaveLpAddr, IERC20_ABI, deployer)
    //     await lpTokenContract.connect(lpHolder).transfer(client4.address, ethers.utils.parseUnits("10000", 18))
    //     // console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address)))

    //     // Deposit
    //     // await USDTContract.connect(client).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     // await powerBomb.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("10000", 6), 50)
    //     // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client.address))) // 9933.148301433628457033
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client.address), 6)) // 9998.836211
        
    //     // await USDCContract.connect(client2).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     // tx = await powerBomb.connect(client2).deposit(USDCAddr, ethers.utils.parseUnits("10000", 6), 50)
    //     // receipt = await tx.wait()
    //     // console.log(receipt.gasUsed.toString()) // 740526
    //     // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client2.address))) // 9929.799148034370807238
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client2.address), 6)) // 9995.464909
        
    //     // await DAIContract.connect(client3).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     // await powerBomb.connect(client3).deposit(DAIAddr, ethers.utils.parseUnits("10000", 18), 50)
    //     // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client3.address))) // 9930.272381197757716676
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client3.address), 6)) // 9995.941272
        
    //     // await lpTokenContract.connect(client4).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     // await powerBomb.connect(client4).deposit(curveAaveLpAddr, lpTokenContract.balanceOf(client4.address), 50)
    //     // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client4.address))) // 10000.0
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client4.address), 6)) // 10066.13
        
    //     // Deposit through helper
    //     await USDTContract.connect(client).approve(powerBombHelper.address, ethers.constants.MaxUint256)
    //     await powerBombHelper.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("10000", 6), 10000, 0, 50)

    //     await USDCContract.connect(client2).approve(powerBombHelper.address, ethers.constants.MaxUint256)
    //     tx = await powerBombHelper.connect(client2).deposit(USDCAddr, ethers.utils.parseUnits("10000", 6), 10000, 0, 50)

    //     await DAIContract.connect(client3).approve(powerBombHelper.address, ethers.constants.MaxUint256)
    //     await powerBombHelper.connect(client3).deposit(DAIAddr, ethers.utils.parseUnits("10000", 18), 10000, 0, 50)

    //     await lpTokenContract.connect(client4).approve(powerBombHelper.address, ethers.constants.MaxUint256)
    //     await powerBombHelper.connect(client4).deposit(curveAaveLpAddr, lpTokenContract.balanceOf(client4.address), 10000, 0, 50)

    //     // console.log(ethers.utils.formatEther(await powerBomb.getAllPool())) // 39793.219830665756980947
    //     // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward(WAVAXAddr))) // 0.00000086101449148
    //     // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward(CRVAddr))) // 0.0
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getAllPoolInUSD(), 6)) // 40056.372393
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getPricePerFullShareInUSD(), 6)) // 1.006613

    //     // Assume profit
    //     await network.provider.request({method: "evm_increaseTime", params: [864000]})
    //     await network.provider.send("evm_mine")
    //     // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward(WAVAXAddr))) // 0.999521335907961441
    //     // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward(CRVAddr))) // 0.029166098940146276

    //     // Harvest
    //     // console.log((await powerBomb.estimateGas.harvest()).toString())
    //     tx = await powerBomb.connect(bot).harvest()
    //     // receipt = await tx.wait()
    //     // console.log(receipt.gasUsed.toString()) // 430034
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client.address), 9))
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client2.address), 9))
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client3.address), 9))
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client4.address), 9))

    //     // const userBalance1 = await powerBomb.getUserBalance(client.address)
    //     // const userBalance2 = await powerBomb.getUserBalance(client2.address)
    //     // const userBalance3 = await powerBomb.getUserBalance(client3.address)
    //     // const userBalance4 = await powerBomb.getUserBalance(client4.address)
    //     // console.log(ethers.utils.formatEther(userBalance1.add(userBalance2).add(userBalance3).add(userBalance4)))
    //     // console.log(ethers.utils.formatEther(await powerBomb.getAllPool())) // 39793.219830665756980947

    //     // Claim
    //     // const wsOHMContract = new ethers.Contract(wsOHMAddr, IERC20_ABI, deployer)
    //     const gOHMContract = new ethers.Contract(gOHMAddr, IERC20_ABI, deployer)
    //     // await powerBomb.connect(client).claimReward(client.address)
    //     // console.log(ethers.utils.formatUnits(await wsOHMContract.balanceOf(client.address), 18)) // 0.000771862169515163
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client.address), 18))
    //     // await powerBomb.connect(client2).claimReward(client2.address)
    //     // console.log(ethers.utils.formatUnits(await wsOHMContract.balanceOf(client2.address), 18)) // 0.000771585680376034
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client2.address), 18))
    //     // await powerBomb.connect(client3).claimReward(client3.address)
    //     // console.log(ethers.utils.formatUnits(await wsOHMContract.balanceOf(client3.address), 18)) // 0.00077170612825017
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client3.address), 18))
    //     // await powerBomb.connect(client4).claimReward(client4.address)
    //     // console.log(ethers.utils.formatUnits(await wsOHMContract.balanceOf(client4.address), 18)) // 0.000777151488061739
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client4.address), 18))

    //     // const WAVAXContract = new ethers.Contract(WAVAXAddr, IERC20_ABI, deployer)
    //     // console.log(ethers.utils.formatEther(await WAVAXContract.balanceOf(powerBomb.address))) // 0.0
    //     // console.log(ethers.utils.formatUnits(await wsOHMContract.balanceOf(powerBomb.address), 18)) // 0.000000002

    //     // Withdraw
    //     console.log("===withdraw===")
    //     await powerBomb.connect(client).withdraw(USDTAddr, await powerBomb.getUserBalance(client.address), 50)
    //     console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6)) // 10000.240416
    //     console.log(ethers.utils.formatUnits(await gOHMContract.balanceOf(client.address), 18)) // 0.000109635638353943
    //     await powerBomb.connect(client2).withdraw(USDCAddr, await powerBomb.getUserBalance(client2.address), 50)
    //     console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6)) // 10001.787832
    //     console.log(ethers.utils.formatUnits(await gOHMContract.balanceOf(client2.address), 18)) // 0.000455615354981801
    //     await powerBomb.connect(client3).withdraw(DAIAddr, await powerBomb.getUserBalance(client3.address), 50)
    //     console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18)) // 10001.921880177805136236
    //     console.log(ethers.utils.formatUnits(await gOHMContract.balanceOf(client3.address), 18)) // 0.000455687999207308
    //     await powerBomb.connect(client4).withdraw(curveAaveLpAddr, await powerBomb.getUserBalance(client4.address), 50)
    //     console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address))) // 10000.0
    //     console.log(ethers.utils.formatUnits(await gOHMContract.balanceOf(client4.address), 18)) // 0.000459915695534317
    // })


    // it("Should work (MEMO) Aave av3pool LP on Curve", async () => {
    //     let tx, receipt
    //     // const [deployer, client, client2, client3, client4] = await ethers.getSigners()
    //     const [me, client, client2, client3, client4] = await ethers.getSigners()

    //     const deployerAddr = "0xd924EBAF113AEBE553bC6b83AEf8f9A1B9276d57"
    //     await network.provider.request({method: "hardhat_impersonateAccount", params: [deployerAddr]})
    //     const deployer = await ethers.getSigner(deployerAddr)
    //     await me.sendTransaction({to: deployerAddr, value: ethers.utils.parseEther("1000")})

    //     const botAddr = "0x117972bce574ec4df255075affb837dcfa5a7600"
    //     await network.provider.request({method: "hardhat_impersonateAccount", params: [botAddr]})
    //     const bot = await ethers.getSigner(botAddr)
    //     await me.sendTransaction({to: botAddr, value: ethers.utils.parseEther("1000")})

    //     // const PowerBombFac = await ethers.getContractFactory("PowerBombAvaxCurve33", deployer)
    //     // const powerBombProxy = await upgrades.deployProxy(PowerBombFac, [poolAddr, gaugeAddr, MEMOAddr], {kind: "uups"})
    //     // const powerBomb = await ethers.getContractAt("PowerBombAvaxCurve33", powerBombProxy.address, deployer)
    //     const powerBomb = await ethers.getContractAt("PowerBombAvaxCurve33", "0xB523b02556cFeEE0417222f696d9aee0deAd49bf", deployer)

    //     // const PowerBombHelperFac = await ethers.getContractFactory("PowerBombHelperCurve", deployer)
    //     // const powerBombHelperProxy = await upgrades.deployProxy(PowerBombHelperFac, [powerBomb.address, powerBomb.address], {kind: "uups"})
    //     // const powerBombHelper = await ethers.getContractAt("PowerBombHelperCurve", powerBombHelperProxy.address, deployer)
    //     // await powerBomb.setProxy(powerBombHelper.address)
    //     const powerBombHelper = await ethers.getContractAt("PowerBombHelperCurve", "0xA1b6A47927671e5e1FB20b906F527ad56b14144C", deployer)

    //     // await powerBomb.setProxy(powerBombHelper.address)
        
    //     // Upgrade
    //     const powerBombFac = await ethers.getContractFactory("PowerBombAvaxCurve33", deployer)
    //     const powerBombImpl = await powerBombFac.deploy()
    //     await powerBomb.connect(deployer).upgradeTo(powerBombImpl.address)

    //     const router = new ethers.Contract(routerJoeAddr, router_ABI, deployer)
    //     await router.swapAVAXForExactTokens(
    //         ethers.utils.parseUnits("10000", 6), [WAVAXAddr, USDTAddr], client.address, Math.ceil(Date.now() / 1000),
    //         {value: ethers.utils.parseEther("500")}
    //     )
    //     await router.swapAVAXForExactTokens(
    //         ethers.utils.parseUnits("10000", 6), [WAVAXAddr, USDCAddr], client2.address, Math.ceil(Date.now() / 1000),
    //         {value: ethers.utils.parseEther("500")}
    //     )
    //     await router.swapAVAXForExactTokens(
    //         ethers.utils.parseUnits("10000", 18), [WAVAXAddr, DAIAddr], client3.address, Math.ceil(Date.now() / 1000),
    //         {value: ethers.utils.parseEther("500")}
    //     )
    //     const USDTContract = new ethers.Contract(USDTAddr, IERC20_ABI, deployer)
    //     // console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6))
    //     const USDCContract = new ethers.Contract(USDCAddr, IERC20_ABI, deployer)
    //     // console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6))
    //     const DAIContract = new ethers.Contract(DAIAddr, IERC20_ABI, deployer)
    //     // console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18))

    //     const lpHolderAddr = "0xa55e6bb0f8819e2595b4864d3c368ce1849a28ab"
    //     await network.provider.request({method: "hardhat_impersonateAccount", params: [lpHolderAddr]})
    //     const lpHolder = await ethers.getSigner(lpHolderAddr)
    //     await deployer.sendTransaction({to: lpHolderAddr, value: ethers.utils.parseEther("1")})
    //     const lpTokenContract = new ethers.Contract(curveAaveLpAddr, IERC20_ABI, deployer)
    //     await lpTokenContract.connect(lpHolder).transfer(client4.address, ethers.utils.parseUnits("10000", 18))
    //     // console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address)))

    //     // Deposit
    //     // await USDTContract.connect(client).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     // await powerBomb.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("10000", 6), 50)
    //     // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client.address))) // 9933.148301433628457033
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client.address), 6)) // 9998.836211
        
    //     // await USDCContract.connect(client2).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     // tx = await powerBomb.connect(client2).deposit(USDCAddr, ethers.utils.parseUnits("10000", 6), 50)
    //     // receipt = await tx.wait()
    //     // console.log(receipt.gasUsed.toString()) // 740526
    //     // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client2.address))) // 9929.799148034370807238
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client2.address), 6)) // 9995.464909
        
    //     // await DAIContract.connect(client3).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     // await powerBomb.connect(client3).deposit(DAIAddr, ethers.utils.parseUnits("10000", 18), 50)
    //     // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client3.address))) // 9930.272381197757716676
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client3.address), 6)) // 9995.941272
        
    //     // await lpTokenContract.connect(client4).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     // await powerBomb.connect(client4).deposit(curveAaveLpAddr, lpTokenContract.balanceOf(client4.address), 50)
    //     // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client4.address))) // 10000.0
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client4.address), 6)) // 10066.13
        
    //     // Deposit through helper
    //     await USDTContract.connect(client).approve(powerBombHelper.address, ethers.constants.MaxUint256)
    //     await powerBombHelper.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("10000", 6), 0, 10000, 50)

    //     await USDCContract.connect(client2).approve(powerBombHelper.address, ethers.constants.MaxUint256)
    //     tx = await powerBombHelper.connect(client2).deposit(USDCAddr, ethers.utils.parseUnits("10000", 6), 0, 10000, 50)

    //     await DAIContract.connect(client3).approve(powerBombHelper.address, ethers.constants.MaxUint256)
    //     await powerBombHelper.connect(client3).deposit(DAIAddr, ethers.utils.parseUnits("10000", 18), 0, 10000, 50)

    //     await lpTokenContract.connect(client4).approve(powerBombHelper.address, ethers.constants.MaxUint256)
    //     await powerBombHelper.connect(client4).deposit(curveAaveLpAddr, lpTokenContract.balanceOf(client4.address), 0, 10000, 50)

    //     // console.log(ethers.utils.formatEther(await powerBomb.getAllPool())) // 276618.427885154179495236
    //     // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward(WAVAXAddr))) // 0.220792295129807996
    //     // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward(CRVAddr))) // 0.990733156834230352
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getAllPoolInUSD(), 6)) // 279040.222221
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getPricePerFullShareInUSD(), 6)) // 1.008755

    //     // Assume profit
    //     await network.provider.request({method: "evm_increaseTime", params: [864000]})
    //     await network.provider.send("evm_mine")
    //     // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward(WAVAXAddr))) // 0.835342871006063176
    //     // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward(CRVAddr))) // 1.479725585388830184

    //     // Harvest
    //     // console.log((await powerBomb.estimateGas.harvest()).toString())
    //     tx = await powerBomb.connect(bot).harvest()
    //     // receipt = await tx.wait()
    //     // console.log(receipt.gasUsed.toString()) // 430034
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client.address), 9)) // 0.000482682
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client2.address), 9)) // 0.000482161
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client3.address), 9)) // 0.000482224
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client4.address), 9)) // 0.000486712

    //     // const userBalance1 = await powerBomb.getUserBalance(client.address)
    //     // const userBalance2 = await powerBomb.getUserBalance(client2.address)
    //     // const userBalance3 = await powerBomb.getUserBalance(client3.address)
    //     // const userBalance4 = await powerBomb.getUserBalance(client4.address)
    //     // console.log(ethers.utils.formatEther(userBalance1.add(userBalance2).add(userBalance3).add(userBalance4)))
    //     // console.log(ethers.utils.formatEther(await powerBomb.getAllPool())) // 39793.219830665756980947

    //     // Claim
    //     const MEMOContract = new ethers.Contract(MEMOAddr, IERC20_ABI, deployer)
    //     // await powerBomb.connect(client).claimReward(client.address)
    //     // console.log(ethers.utils.formatUnits(await MEMOContract.balanceOf(client.address), 9)) // 0.002456063
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client.address), 9))
    //     // await powerBomb.connect(client2).claimReward(client2.address)
    //     // console.log(ethers.utils.formatUnits(await MEMOContract.balanceOf(client2.address), 9)) // 0.002455183
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client2.address), 9))
    //     // await powerBomb.connect(client3).claimReward(client3.address)
    //     // console.log(ethers.utils.formatUnits(await MEMOContract.balanceOf(client3.address), 9)) // 0.002455566
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client3.address), 9))
    //     // await powerBomb.connect(client4).claimReward(client4.address)
    //     // console.log(ethers.utils.formatUnits(await MEMOContract.balanceOf(client4.address), 9)) // 0.002472894
    //     // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client4.address), 9))

    //     // const WAVAXContract = new ethers.Contract(WAVAXAddr, IERC20_ABI, deployer)
    //     // console.log(ethers.utils.formatEther(await WAVAXContract.balanceOf(powerBomb.address))) // 0.0
    //     // console.log(ethers.utils.formatUnits(await MEMOContract.balanceOf(powerBomb.address), 9)) // 0.000000002

    //     // Withdraw
    //     console.log("===withdraw===")
    //     await powerBomb.connect(client).withdraw(USDTAddr, await powerBomb.getUserBalance(client.address), 50)
    //     console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6)) // 10002.271961
    //     console.log(ethers.utils.formatUnits(await MEMOContract.balanceOf(client.address), 9)) // 0.002456063
    //     await powerBomb.connect(client2).withdraw(USDCAddr, await powerBomb.getUserBalance(client2.address), 50)
    //     console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6)) // 10002.847105
    //     console.log(ethers.utils.formatUnits(await MEMOContract.balanceOf(client2.address), 9)) // 0.002455183
    //     await powerBomb.connect(client3).withdraw(DAIAddr, await powerBomb.getUserBalance(client3.address), 50)
    //     console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18)) // 10003.132399586520296406
    //     console.log(ethers.utils.formatUnits(await MEMOContract.balanceOf(client3.address), 9)) // 0.002455566
    //     await powerBomb.connect(client4).withdraw(curveAaveLpAddr, await powerBomb.getUserBalance(client4.address), 50)
    //     console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address))) // 1000.0
    //     console.log(ethers.utils.formatUnits(await MEMOContract.balanceOf(client4.address), 9)) // 0.002472894
    // })

    it("Should work (wMEMO) Aave av3pool LP on Curve", async () => {
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

        const PowerBombFac = await ethers.getContractFactory("PowerBombAvaxCurve33", deployer)
        const powerBombProxy = await upgrades.deployProxy(PowerBombFac, [poolAddr, gaugeAddr, wMEMOAddr], {kind: "uups"})
        const powerBomb = await ethers.getContractAt("PowerBombAvaxCurve33", powerBombProxy.address, deployer)
        // const powerBomb = await ethers.getContractAt("PowerBombAvaxCurve33", "0xB523b02556cFeEE0417222f696d9aee0deAd49bf", deployer)

        // const PowerBombHelperFac = await ethers.getContractFactory("PowerBombHelperCurve", deployer)
        // const powerBombHelperProxy = await upgrades.deployProxy(PowerBombHelperFac, [powerBomb.address, powerBomb.address], {kind: "uups"})
        // const powerBombHelper = await ethers.getContractAt("PowerBombHelperCurve", powerBombHelperProxy.address, deployer)
        // await powerBomb.setProxy(powerBombHelper.address)
        // const powerBombHelper = await ethers.getContractAt("PowerBombHelperCurve", "0xA1b6A47927671e5e1FB20b906F527ad56b14144C", deployer)

        // await powerBomb.setProxy(powerBombHelper.address)
        
        // Upgrade
        // const powerBombFac = await ethers.getContractFactory("PowerBombAvaxCurve33", deployer)
        // const powerBombImpl = await powerBombFac.deploy()
        // await powerBomb.connect(deployer).upgradeTo(powerBombImpl.address)

        const router = new ethers.Contract(routerJoeAddr, router_ABI, deployer)
        await router.swapAVAXForExactTokens(
            ethers.utils.parseUnits("10000", 6), [WAVAXAddr, USDTAddr], client.address, Math.ceil(Date.now() / 1000),
            {value: ethers.utils.parseEther("500")}
        )
        await router.swapAVAXForExactTokens(
            ethers.utils.parseUnits("10000", 6), [WAVAXAddr, USDCAddr], client2.address, Math.ceil(Date.now() / 1000),
            {value: ethers.utils.parseEther("500")}
        )
        await router.swapAVAXForExactTokens(
            ethers.utils.parseUnits("10000", 18), [WAVAXAddr, DAIAddr], client3.address, Math.ceil(Date.now() / 1000),
            {value: ethers.utils.parseEther("500")}
        )
        const USDTContract = new ethers.Contract(USDTAddr, IERC20_ABI, deployer)
        // console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6))
        const USDCContract = new ethers.Contract(USDCAddr, IERC20_ABI, deployer)
        // console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6))
        const DAIContract = new ethers.Contract(DAIAddr, IERC20_ABI, deployer)
        // console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18))

        const lpHolderAddr = "0xa55e6bb0f8819e2595b4864d3c368ce1849a28ab"
        await network.provider.request({method: "hardhat_impersonateAccount", params: [lpHolderAddr]})
        const lpHolder = await ethers.getSigner(lpHolderAddr)
        await deployer.sendTransaction({to: lpHolderAddr, value: ethers.utils.parseEther("1")})
        const lpTokenContract = new ethers.Contract(curveAaveLpAddr, IERC20_ABI, deployer)
        await lpTokenContract.connect(lpHolder).transfer(client4.address, ethers.utils.parseUnits("10000", 18))
        // console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address)))

        // Deposit
        await USDTContract.connect(client).approve(powerBomb.address, ethers.constants.MaxUint256)
        await powerBomb.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("10000", 6), 50)
        // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client.address))) // 9933.148301433628457033
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client.address), 6)) // 9998.836211
        
        await USDCContract.connect(client2).approve(powerBomb.address, ethers.constants.MaxUint256)
        tx = await powerBomb.connect(client2).deposit(USDCAddr, ethers.utils.parseUnits("10000", 6), 50)
        // receipt = await tx.wait()
        // console.log(receipt.gasUsed.toString()) // 740526
        // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client2.address))) // 9929.799148034370807238
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client2.address), 6)) // 9995.464909
        
        await DAIContract.connect(client3).approve(powerBomb.address, ethers.constants.MaxUint256)
        await powerBomb.connect(client3).deposit(DAIAddr, ethers.utils.parseUnits("10000", 18), 50)
        // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client3.address))) // 9930.272381197757716676
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client3.address), 6)) // 9995.941272
        
        await lpTokenContract.connect(client4).approve(powerBomb.address, ethers.constants.MaxUint256)
        await powerBomb.connect(client4).deposit(curveAaveLpAddr, lpTokenContract.balanceOf(client4.address), 50)
        // console.log(ethers.utils.formatEther(await powerBomb.getUserBalance(client4.address))) // 10000.0
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalanceInUSD(client4.address), 6)) // 10066.13
        
        // Deposit through helper
        // await USDTContract.connect(client).approve(powerBombHelper.address, ethers.constants.MaxUint256)
        // await powerBombHelper.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("10000", 6), 0, 10000, 50)

        // await USDCContract.connect(client2).approve(powerBombHelper.address, ethers.constants.MaxUint256)
        // tx = await powerBombHelper.connect(client2).deposit(USDCAddr, ethers.utils.parseUnits("10000", 6), 0, 10000, 50)

        // await DAIContract.connect(client3).approve(powerBombHelper.address, ethers.constants.MaxUint256)
        // await powerBombHelper.connect(client3).deposit(DAIAddr, ethers.utils.parseUnits("10000", 18), 0, 10000, 50)

        // await lpTokenContract.connect(client4).approve(powerBombHelper.address, ethers.constants.MaxUint256)
        // await powerBombHelper.connect(client4).deposit(curveAaveLpAddr, lpTokenContract.balanceOf(client4.address), 0, 10000, 50)

        // console.log(ethers.utils.formatEther(await powerBomb.getAllPool())) // 276618.427885154179495236
        // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward(WAVAXAddr))) // 0.220792295129807996
        // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward(CRVAddr))) // 0.990733156834230352
        // console.log(ethers.utils.formatUnits(await powerBomb.getAllPoolInUSD(), 6)) // 279040.222221
        // console.log(ethers.utils.formatUnits(await powerBomb.getPricePerFullShareInUSD(), 6)) // 1.008755

        // Assume profit
        await network.provider.request({method: "evm_increaseTime", params: [864000]})
        await network.provider.send("evm_mine")
        const WAVAXContract = new ethers.Contract(WAVAXAddr, IWAVAX_ABI, deployer)
        await WAVAXContract.deposit({value: ethers.utils.parseEther("0.1")})
        await WAVAXContract.transfer(powerBomb.address, ethers.utils.parseEther("0.1"))
        // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward(WAVAXAddr))) // 0.835342871006063176
        // console.log(ethers.utils.formatEther(await powerBomb.getPoolPendingReward(CRVAddr))) // 1.479725585388830184

        // Harvest
        // console.log("===harvest===")
        // console.log((await powerBomb.estimateGas.harvest()).toString())
        // tx = await powerBomb.connect(bot).harvest()
        tx = await powerBomb.harvest()
        // receipt = await tx.wait()
        // console.log(receipt.gasUsed.toString()) // 430034
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client.address), 18)) // 0.000063971068455801
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client2.address), 18)) // 0.000063972905846306
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client3.address), 18)) // 0.000063977712066213
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserPendingReward(client4.address), 18)) // 0.000064742170663319

        // const userBalance1 = await powerBomb.getUserBalance(client.address)
        // const userBalance2 = await powerBomb.getUserBalance(client2.address)
        // const userBalance3 = await powerBomb.getUserBalance(client3.address)
        // const userBalance4 = await powerBomb.getUserBalance(client4.address)
        // console.log(ethers.utils.formatEther(userBalance1.add(userBalance2).add(userBalance3).add(userBalance4)))
        // console.log(ethers.utils.formatEther(await powerBomb.getAllPool())) // 39793.219830665756980947

        // Claim
        // console.log("===claim===")
        const wMEMOContract = new ethers.Contract(wMEMOAddr, IERC20_ABI, deployer)
        // await powerBomb.connect(client).claimReward(client.address)
        // console.log(ethers.utils.formatUnits(await wMEMOContract.balanceOf(client.address), 18)) // 
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client.address), 18))
        // await powerBomb.connect(client2).claimReward(client2.address)
        // console.log(ethers.utils.formatUnits(await wMEMOContract.balanceOf(client2.address), 18)) // 
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client2.address), 18))
        // await powerBomb.connect(client3).claimReward(client3.address)
        // console.log(ethers.utils.formatUnits(await wMEMOContract.balanceOf(client3.address), 18)) // 
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client3.address), 18))
        // await powerBomb.connect(client4).claimReward(client4.address)
        // console.log(ethers.utils.formatUnits(await wMEMOContract.balanceOf(client4.address), 18)) // 
        // console.log(ethers.utils.formatUnits(await powerBomb.getUserAccumulatedReward(client4.address), 18))

        // const WAVAXContract = new ethers.Contract(WAVAXAddr, IERC20_ABI, deployer)
        // console.log(ethers.utils.formatEther(await WAVAXContract.balanceOf(powerBomb.address))) // 0.0
        // console.log(ethers.utils.formatUnits(await wMEMOContract.balanceOf(powerBomb.address), 18)) // 0.000000002

        // Withdraw
        console.log("===withdraw===")
        await powerBomb.connect(client).withdraw(USDTAddr, await powerBomb.getUserBalance(client.address), 50)
        console.log(ethers.utils.formatUnits(await USDTContract.balanceOf(client.address), 6)) // 9999.627823
        console.log(ethers.utils.formatUnits(await wMEMOContract.balanceOf(client.address), 18)) // 0.000063971068455801
        await powerBomb.connect(client2).withdraw(USDCAddr, await powerBomb.getUserBalance(client2.address), 50)
        console.log(ethers.utils.formatUnits(await USDCContract.balanceOf(client2.address), 6)) // 9999.581591
        console.log(ethers.utils.formatUnits(await wMEMOContract.balanceOf(client2.address), 18)) // 0.000167660037743669
        await powerBomb.connect(client3).withdraw(DAIAddr, await powerBomb.getUserBalance(client3.address), 50)
        console.log(ethers.utils.formatUnits(await DAIContract.balanceOf(client3.address), 18)) // 10000.060379711921474735
        console.log(ethers.utils.formatUnits(await wMEMOContract.balanceOf(client3.address), 18)) // 0.000167672633873238
        await powerBomb.connect(client4).withdraw(curveAaveLpAddr, await powerBomb.getUserBalance(client4.address), 50)
        console.log(ethers.utils.formatEther(await lpTokenContract.balanceOf(client4.address))) // 10000.0
        console.log(ethers.utils.formatUnits(await wMEMOContract.balanceOf(client4.address), 18)) // 0.000169676125125492
    })
})