const { ethers, network, upgrades } = require("hardhat");
const IERC20_ABI = require("../abis/IERC20_ABI.json")

const USDTAddr = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
const USDCAddr = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
const WETHAddr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const WBTCAddr = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
const SUSHIAddr = "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2"
// const slpAddr = "0xD86A120a06255Df8D4e2248aB04d4267E23aDfaA"
const binanceAddr = "0x28C6c06298d514Db089934071355E5743bf21d60"
const slpHolderAddr = "0x9DbEEda68b1246eb70FDd9ceAf1b3B2d508e6391"

describe("PowerBomb", function () {
    // it("Should work (BTC)", async function () {
    //     const [deployer, client, client2] = await ethers.getSigners()

    //     const PowerBomb = await ethers.getContractFactory("PowerBomb", deployer)
    //     const powerBomb = await upgrades.deployProxy(PowerBomb, [WBTCAddr])
    //     await powerBomb.deployed()

    //     network.provider.request({method: "hardhat_impersonateAccount", params: [binanceAddr]})
    //     const binanceAcc = await ethers.getSigner(binanceAddr)
    //     const USDTContract = new ethers.Contract(USDTAddr, IERC20_ABI, binanceAcc)
    //     const USDCContract = new ethers.Contract(USDCAddr, IERC20_ABI, binanceAcc)
    //     await USDTContract.transfer(client.address, ethers.utils.parseUnits("10000", 6))
    //     await USDCContract.transfer(client.address, ethers.utils.parseUnits("10000", 6))
        
    //     network.provider.request({method: "hardhat_impersonateAccount", params: [slpHolderAddr]})
    //     const slpHolderAcc = await ethers.getSigner(slpHolderAddr)
    //     await deployer.sendTransaction({to: slpHolderAddr, value: ethers.utils.parseEther("1")})
    //     const slpContract = new ethers.Contract(slpAddr, IERC20_ABI, slpHolderAcc)
    //     await slpContract.transfer(client2.address, ethers.utils.parseUnits("100", 6))

    //     // Deposit
    //     await USDTContract.connect(client).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     await USDCContract.connect(client).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     await powerBomb.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("1000", 6))
    //     await powerBomb.connect(client).deposit(USDCAddr, ethers.utils.parseUnits("1000", 6))

    //     await slpContract.connect(client2).approve(powerBomb.address, ethers.constants.MaxUint256)
    //     await powerBomb.connect(client2).deposit(slpAddr, ethers.utils.parseUnits("100", 6))
        
    //     // // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalance(client.address), 6))
    //     // // console.log(ethers.utils.formatUnits(await powerBomb.getUserBalance(client2.address), 6))

    //     // Assume profit
    //     const WETHContract = new ethers.Contract(WETHAddr, IERC20_ABI, binanceAcc)
    //     await WETHContract.transfer(powerBomb.address, ethers.utils.parseUnits("1", 16))
    //     const SUSHIContract = new ethers.Contract(SUSHIAddr, IERC20_ABI, binanceAcc)
    //     await SUSHIContract.transfer(powerBomb.address, ethers.utils.parseUnits("10", 18))

    //     // Give back SLP
    //     // console.log((await slpContract.balanceOf(deployer.address)).toString())
    //     slpContract.connect(deployer).transfer(powerBomb.address, slpContract.balanceOf(deployer.address))
    //     // console.log((await slpContract.balanceOf(deployer.address)).toString())
    //     // console.log((await slpContract.balanceOf(powerBomb.address)).toString())

    //     // Withdraw
    //     console.log("===withdraw===")
    //     const WBTCContract = new ethers.Contract(WBTCAddr, IERC20_ABI, binanceAcc)
    //     // console.log((await WBTCContract.balanceOf(powerBomb.address)).toString())

    //     console.log((await slpContract.balanceOf(powerBomb.address)).toString())

    //     let slpAmount = await powerBomb.getUserBalance(client2.address)
    //     await powerBomb.connect(client2).withdraw(slpAmount.div(2))
    //     // console.log(ethers.utils.formatUnits(await slpContract.balanceOf(client2.address), 6))
    //     // console.log((await WBTCContract.balanceOf(powerBomb.address)).toString())

    //     console.log((await slpContract.balanceOf(powerBomb.address)).toString())

    //     slpAmount = await powerBomb.getUserBalance(client.address)
    //     await powerBomb.connect(client).withdraw(slpAmount.div(2))
    //     // console.log((await WBTCContract.balanceOf(powerBomb.address)).toString())

    //     console.log((await slpContract.balanceOf(powerBomb.address)).toString())

    //     // await powerBomb.transferOutSLP()

    //     // Assume rewards
    //     await WETHContract.transfer(powerBomb.address, ethers.utils.parseUnits("5", 15))
    //     await SUSHIContract.transfer(powerBomb.address, ethers.utils.parseUnits("5", 18))

    //     // Deposit
    //     await powerBomb.connect(client).deposit(USDTAddr, ethers.utils.parseUnits("1000", 6))

    //     console.log((await slpContract.balanceOf(powerBomb.address)).toString())

    //     slpContract.connect(deployer).transfer(powerBomb.address, slpContract.balanceOf(deployer.address))

    //     console.log((await slpContract.balanceOf(powerBomb.address)).toString())

    //     // Claim
    //     await powerBomb.connect(client).claimReward()
    //     await powerBomb.connect(client2).claimReward()

    //     console.log((await WBTCContract.balanceOf(client.address)).toString())
    //     console.log((await WBTCContract.balanceOf(client2.address)).toString())
    // })

    it("Should work (BTC)", async function () {
        const [deployer, client, client2] = await ethers.getSigners()

        const ALCXAddr = "0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF"
        const ALCXHolderAddr = "0xc00AC4de5BBE235135E67ba58bDe41d4d863f6B8"
        const slpAddr = "0xC3f279090a47e80990Fe3a9c30d24Cb117EF91a8"

        const PowerBomb = await ethers.getContractFactory("PowerBomb", deployer)
        // const powerBomb = await upgrades.deployProxy(PowerBomb, [WBTCAddr])
        const powerBomb = await upgrades.deployProxy(PowerBomb, [WETHAddr])
        await powerBomb.deployed()

        network.provider.request({method: "hardhat_impersonateAccount", params: [binanceAddr]})
        const binanceAcc = await ethers.getSigner(binanceAddr)
        const WETHContract = new ethers.Contract(WETHAddr, IERC20_ABI, binanceAcc)
        await WETHContract.transfer(client.address, ethers.utils.parseUnits("1", 18))

        network.provider.request({method: "hardhat_impersonateAccount", params: [ALCXHolderAddr]})
        const ALCXHolderAcc = await ethers.getSigner(ALCXHolderAddr)
        const ALCXContract = new ethers.Contract(ALCXAddr, IERC20_ABI, ALCXHolderAcc)
        await ALCXContract.transfer(client2.address, ethers.utils.parseUnits("10", 18))

        await powerBomb.setSlippagePerc(10000);

        // Deposit
        await WETHContract.connect(client).approve(powerBomb.address, ethers.constants.MaxUint256)
        await ALCXContract.connect(client2).approve(powerBomb.address, ethers.constants.MaxUint256)
        await powerBomb.connect(client).deposit(WETHAddr, ethers.utils.parseUnits("1", 18))
        await WETHContract.connect(client).transfer(deployer.address, WETHContract.balanceOf(client.address))
        await powerBomb.connect(client2).deposit(ALCXAddr, ethers.utils.parseUnits("10", 18))

        for (let i=0; i<100; i++) {
            await network.provider.send("evm_mine")
        }

        // console.log(((await powerBomb.getPoolPendingReward())[0]).toString()) // 725744938254469
        // console.log(((await powerBomb.getPoolPendingReward())[1]).toString()) // 31693423836800

        await powerBomb.harvest()

        // console.log((await powerBomb.getUserPendingReward(client.address)).toString()) // 261 34728318039930
        // console.log((await powerBomb.getUserPendingReward(client2.address)).toString()) // 261 34759963824144

        // await powerBomb.connect(client).claimReward()
        // await powerBomb.connect(client2).claimReward()

        // const WBTCContract = new ethers.Contract(WBTCAddr, IERC20_ABI, binanceAcc)
        // console.log((await WBTCContract.balanceOf(client.address)).toString()) // 261
        // console.log((await WBTCContract.balanceOf(client2.address)).toString()) // 261

        // console.log((await WETHContract.balanceOf(client.address)).toString()) // 34693589721891
        // console.log((await WETHContract.balanceOf(client2.address)).toString()) // 34725203860320

        const clientSLPAmt = await powerBomb.getUserBalance(client.address)
        const client2SLPAmt = await powerBomb.getUserBalance(client2.address)

        // const slpContract = new ethers.Contract(slpAddr, IERC20_ABI, deployer)
        // await powerBomb.connect(client).withdraw(slpAddr, clientSLPAmt)
        // console.log((await slpContract.balanceOf(client.address)).toString()) // 1.494750713463609721
        // await powerBomb.connect(client2).withdraw(slpAddr, client2SLPAmt)
        // console.log((await slpContract.balanceOf(client2.address)).toString()) // 1.496112788024152178

        // await powerBomb.connect(client).withdraw(WETHAddr, clientSLPAmt)
        // console.log((await WETHContract.balanceOf(client.address)).toString()) // 0.996985905935436396
        // await powerBomb.connect(client2).withdraw(WETHAddr, client2SLPAmt)
        // console.log((await WETHContract.balanceOf(client2.address)).toString()) // 0.996383795114477418

        await powerBomb.connect(client).withdraw(ALCXAddr, clientSLPAmt)
        console.log((await ALCXContract.balanceOf(client.address)).toString()) // 9.946076057993945927
        await powerBomb.connect(client2).withdraw(ALCXAddr, client2SLPAmt)
        console.log((await ALCXContract.balanceOf(client2.address)).toString()) // 9.969863466928795788

        // const WBTCContract = new ethers.Contract(WBTCAddr, IERC20_ABI, binanceAcc)
        // console.log((await WBTCContract.balanceOf(client.address)).toString()) // 261
        // console.log((await WBTCContract.balanceOf(client2.address)).toString()) // 261

        console.log((await WETHContract.balanceOf(client.address)).toString()) // 34693589721891
        console.log((await WETHContract.balanceOf(client2.address)).toString()) // 34725203860320
    })
});