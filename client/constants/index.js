const contractAddress = require("./contractAddress.json")
const mainAbi = require("./main.abi.json")
const lockAbi = require("./lock.abi.json")
const groupId = ""
const channelId = ""
const currency = "MATIC"
const ipfsGateway = (cid, suffixUrl) => {
    return "https://" + cid + ".ipfs.w3s.link/" + suffixUrl
}
const ipfsGateway1 = (cid, suffixUrl) => {
    return "https://ipfs.io/ipfs/" + cid + "/" + suffixUrl
}
const mainContractAddress = contractAddress.main

const rpcUrl = process.env.NEXT_PUBLIC_MANTLE_TESTNET_RPC_URL

const tableName = "main_80001_4676"

module.exports = {
    mainContractAddress,
    tableName,
    mainAbi,
    lockAbi,
    groupId,
    channelId,
    currency,
    ipfsGateway,
    ipfsGateway1,
    rpcUrl,
}
