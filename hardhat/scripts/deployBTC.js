const { ethers, upgrades } = require('hardhat')

const WBTCAddr = "0x3095c7557bCb296ccc6e363DE01b760bA031F2d9"

async function main() {
    const [deployer] = await ethers.getSigners()

    const PowerBomb = await ethers.getContractFactory("PowerBomb", deployer)
    const powerBomb = await upgrades.deployProxy(PowerBomb, [WBTCAddr])
    await powerBomb.deployed()

    console.log("Contract address for PowerBomb proxy (BTC):", powerBomb.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })