const { ethers } = require("hardhat")

async function main() {
    const proxyAdmin = await ethers.getContract("ContractProxyAdmin")
    const contractV2 = await ethers.getContract("ContractV2")
    const transparentProxy = await ethers.getContract("Contract_Proxy")

    const proxyContract = await ethers.getContractAt("Contract", transparentProxy.address)
    let version = await proxyContract.version()
    console.log(version.toString())

    const upgradeTx = await proxyAdmin.upgrade(transparentProxy.address, contractV2.address)
    await upgradeTx.wait(1)
    const contractV2proxy = await ethers.getContractAt("ContractV2", transparentProxy.address)
    version = await contractV2proxy.version()
    console.log(version.toString())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
