const { ethers, upgrades } = require('hardhat')

const proxyBTCAddr = "0x36f4ac72a572ada6d34c3a49c8a7faff9c9e4763"
const proxyETHAddr = "0x62acbbe9733c776f02aeba1e254ac41a7170b397"

async function main() {
    const [deployer] = await ethers.getSigners()

    const PowerBombHelper = await ethers.getContractFactory("PowerBombHelper", deployer)
    const powerBombHelper = await upgrades.deployProxy(PowerBombHelper, [proxyBTCAddr, proxyETHAddr])
    await powerBombHelper.deployed()

    console.log("Contract address for PowerBombHelper proxy:", powerBombHelper.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })