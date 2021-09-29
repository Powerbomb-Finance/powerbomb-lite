const { ethers } = require('hardhat')

const proxyBTCAddr = "0x36f4ac72a572ada6d34c3a49c8a7faff9c9e4763"
const proxyETHAddr = "0x62acbbe9733c776f02aeba1e254ac41a7170b397"
const proxyAdminAddr = "0x0b9cbe922a5db9180405e224c0f9a2e67d9db01d"
const siewAccAddr = "0x2C10aC0E6B6c1619F4976b2ba559135BFeF53c5E"

async function main() {
    const [deployer] = await ethers.getSigners()

    // const powerBombBTC = await ethers.getContractAt("PowerBomb", proxyBTCAddr, deployer)
    // const powerBombETH = await ethers.getContractAt("PowerBomb", proxyETHAddr, deployer)

    // await powerBombBTC.transferOwnership(siewAccAddr)
    // await powerBombETH.transferOwnership(siewAccAddr)

    // console.log("Both ownership of contracts had transferred to:", await powerBombETH.owner())

    const proxyAdminContract = new ethers.Contract(
        proxyAdminAddr,
        ["function transferOwnership(address) external", "function owner() external view returns (address)"],
        deployer
    )
    await proxyAdminContract.transferOwnership(siewAccAddr)
    console.log("Proxy admin contract had transferred to:", await proxyAdminContract.owner())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })