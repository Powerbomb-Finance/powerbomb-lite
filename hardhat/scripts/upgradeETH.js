const { ethers } = require("hardhat")

const proxyAdminAddr = "0x0b9cbe922a5db9180405e224c0f9a2e67d9db01d"
const proxyETHAddr = "0x62acbbe9733c776f02aeba1e254ac41a7170b397"

async function main() {
    let tx
    const [deployer] = await ethers.getSigners()

    const PowerBomb = await ethers.getContractFactory("PowerBomb", deployer)
    const powerBomb = await PowerBomb.deploy()
    await powerBomb.deployTransaction.wait()
    console.log("New implementation contract for PowerBomb (ETH):", powerBomb.address)

    const proxyAdmin = new ethers.Contract(proxyAdminAddr, [
        "function upgrade(address, address) external"
    ], deployer)
    tx = await proxyAdmin.upgrade(proxyETHAddr, powerBomb.address)
    await tx.wait()
    console.log("PowerBomb (ETH) upgraded successfully")

    const powerBombProxyETH = await ethers.getContractAt("PowerBomb", proxyETHAddr, deployer)
    tx = await powerBombProxyETH.setHelper("0x5E391DD9c5DF458A63c0016E160A15c8A005B63E")
    await tx.wait()
    const helper = await powerBombProxyETH.helper()
    console.log("PowerBomb (ETH) helper contract address:", helper)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })