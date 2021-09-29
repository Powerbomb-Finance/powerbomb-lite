const { ethers, upgrades } = require('hardhat')

const WETHAddr = "0x6983D1E6DEf3690C4d616b13597A09e6193EA013"

async function main() {
    const [deployer] = await ethers.getSigners()

    const PowerBomb = await ethers.getContractFactory("PowerBomb", deployer)
    const powerBomb = await upgrades.deployProxy(PowerBomb, [WBTCAddr])
    await powerBomb.deployed()

    console.log("Contract address for PowerBomb proxy (ETH):", powerBomb.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })