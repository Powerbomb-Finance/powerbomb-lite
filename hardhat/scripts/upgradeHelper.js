const { ethers } = require("hardhat")

const proxyAdminAddr = "0xbe6a4db3480efccab2281f30fe97b897beef408c"
const proxyHelperAddr = "0x5E391DD9c5DF458A63c0016E160A15c8A005B63E"

async function main() {
    let tx
    const [deployer] = await ethers.getSigners()

    const PowerBombHelper = await ethers.getContractFactory("PowerBombHelper", deployer)
    const powerBombHelper = await PowerBombHelper.deploy()
    await powerBombHelper.deployTransaction.wait()
    console.log("New implementation contract for PowerBombHelper:", powerBombHelper.address)

    const proxyAdmin = new ethers.Contract(proxyAdminAddr, [
        "function upgrade(address, address) external"
    ], deployer)
    tx = await proxyAdmin.upgrade(proxyHelperAddr, powerBombHelper.address)
    await tx.wait()
    console.log("PowerBombHelper upgraded successfully")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
