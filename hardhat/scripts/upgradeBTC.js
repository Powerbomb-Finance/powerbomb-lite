const { ethers } = require("hardhat")

const proxyAdminAddr = "0x0b9cbe922a5db9180405e224c0f9a2e67d9db01d"
const proxyBTCAddr = "0x36f4ac72a572ada6d34c3a49c8a7faff9c9e4763"

async function main() {
    let tx
    const [deployer] = await ethers.getSigners()

    const PowerBomb = await ethers.getContractFactory("PowerBomb", deployer)
    const powerBomb = await PowerBomb.deploy()
    await powerBomb.deployTransaction.wait()
    console.log("New implementation contract for PowerBomb (BTC):", powerBomb.address)

    const proxyAdmin = new ethers.Contract(proxyAdminAddr, [
        "function upgrade(address, address) external"
    ], deployer)
    tx = await proxyAdmin.upgrade(proxyBTCAddr, powerBomb.address)
    await tx.wait()
    console.log("PowerBomb (BTC) upgraded successfully")

    const powerBombProxyBTC = await ethers.getContractAt("PowerBomb", proxyBTCAddr, deployer)
    tx = await powerBombProxyBTC.setHelper("0x5E391DD9c5DF458A63c0016E160A15c8A005B63E")
    await tx.wait()
    const helper = await powerBombProxyBTC.helper()
    console.log("PowerBomb (BTC) helper contract address:", helper)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })