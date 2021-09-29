import { ethers } from "ethers";
import { getParameterCaseInsensitive, getPoolPrices } from "./helpers/eth_helper";
import { getHarmonyToken, getHarmonyPrices, getBalanceOf, approveTransfer, allowance } from "./helpers/harmony_helper";
import powerbomb from "../../../contracts/PowerBomb.json";
import powerbombHelper from "../../../contracts/PowerBombHelper.json";

function _print(val) {
    console.log(val);
}

const HELPER_ADDRESS = "0x5E391DD9c5DF458A63c0016E160A15c8A005B63E";
const weakCache = {};

const getContractFromCache = (App, address) => {
    if (!weakCache[address]) {
        weakCache[address] = new ethers.Contract(address, powerbomb.abi, App.provider);
    }

    return weakCache[address];
}

const getHelperContract = (App) => {
    if (!weakCache[HELPER_ADDRESS]) {
        weakCache[HELPER_ADDRESS] = new ethers.Contract(HELPER_ADDRESS, powerbombHelper.abi, App.provider);
    }

    return weakCache[HELPER_ADDRESS];
}

const getTokenDepositAddress = (token) => {
    let tokenAddress = LP_CONF_ADDRESS;
    if (token === "usdc") {
        tokenAddress = USDC_ADDRESS;
    }
    else if (token === "usdt") {
        tokenAddress = USDT_ADDRESS;
    }

    return tokenAddress;
}

// make dynamic
export function getSupportedProtocols() {
    return [{
        protocol: "btc",
        address: "0x36f4ac72A572ADa6D34C3A49c8a7FAfF9c9E4763",
    }, {
        protocol: "eth",
        address: "0x62AcBBe9733c776F02AEBa1e254aC41A7170B397",
    }, {
        protocol: "mixed",
        noBalance: true,
        address: "0x5E391DD9c5DF458A63c0016E160A15c8A005B63E",
    }];
}

//await powerBombHelper.harvest()

export async function harvestRewards(App) {
    const powerBombHelper = getHelperContract(App);

    return await powerBombHelper.harvest();
}


export async function getUserBalance(App, address) {
    if (!App.provider || !App.account) return 0;

    return (await getContractFromCache(App, address).getUserBalanceInUSD(App.account));
}

export async function getPendingRewards(App, address) {
    if (!App.provider || !App.account) return 0;

    console.log(App, address, "test");

    return (await getContractFromCache(App, address).getUserPendingReward(App.account));
}

export async function getAllPoolInUSD(App) {
    const powerBombHelper = getHelperContract(App);

    const allPoolInUSD = await powerBombHelper.getAllPoolInUSD()

    return allPoolInUSD.div(10 ** 6);
}

export async function getPendingPowerbombRewards(App) {
    const powerbombHelper = getHelperContract(App);

    const [pendingWONE, pendingSUSHI] = await powerbombHelper.getPoolPendingReward()

    return { one: ethers.utils.formatEther(pendingWONE), sushi: ethers.utils.formatEther(pendingSUSHI) };
}

export async function claimAllRewards(App) {
    const powerbombHelper = getHelperContract(App);
    const txn = await powerbombHelper.claimReward(App.account);
    return await txn.wait();
}

export async function claimRewards(App, award) {
    const powerbombContract = getSupportedProtocols().filter(e => e.protocol === award)[0];
    const contract = getContractFromCache(App, powerbombContract.address);

    const txn = await contract.claimReward(App.account);
    return await txn.wait();
}

export async function withdrawSLP(App, pool, amount, award) {
    const powerbombContract = getSupportedProtocols().filter(e => e.protocol === pool)[0];
    const contract = getContractFromCache(App, powerbombContract.address);
    
    const txn = await contract.withdraw(getTokenDepositAddress(award), Math.round(amount * 10 ** 6)); // represented as number so multiply   
    return await txn.wait();
}

export async function requiresApproval(App, token, total, award) {
    console.log(award)
    const powerbombContract = getSupportedProtocols().filter(e => e.protocol === award)[0];
    // approve powerbomb contract

    const tokenAddress = getTokenDepositAddress(token);

    const txn = await allowance(App, tokenAddress, powerbombContract.address, total);
    return txn;
}

export async function approveToken(App, total, token, award) {
    const powerbombContract = getSupportedProtocols().filter(e => e.protocol === award)[0];
    // approve powerbomb contract

    const tokenAddress = getTokenDepositAddress(token);
    const txn = await approveTransfer(App, total, tokenAddress, powerbombContract.address);
    return await txn.wait();
}

// no award token because we are doing a token split for our balance depending on breakdown
export async function transferSplit(App, total, breakdown, token) {
    // deposit(IERC20Upgradeable token, uint amount, uint btcSplit, uint ethSplit)
    const helper = getHelperContract(App);
    const tokenAddress = getTokenDepositAddress(token);
    
    console.log(total * 10 ** 6, breakdown);
    const txn = await helper.deposit(tokenAddress, Math.round(total * 10 ** 6), breakdown.btc, breakdown.eth); // todo: multi-coin support

    return await txn.wait();
}

export async function transferToken(App, total, token, award) {
    const powerbombContract = getSupportedProtocols().filter(e => e.protocol === award)[0];
    const contract = getContractFromCache(App, powerbombContract.address);
    const tokenAddress = getTokenDepositAddress(token);
    const txn = await contract.deposit(tokenAddress, Math.round(total * 10 ** 6)); // convert to usdc representation, todo move this somewhere else
    return await txn.wait();
}

export async function getDepositBalances(App) {
    // get deposit balance, which is token vs { deposit, harvest }
    if (!App.provider || !App.account) return [];
    const result = [];
    for (const protocol of getSupportedProtocols()) {
        if (protocol.noBalance) continue;
        const balance = await getUserBalance(App, protocol.address);
        const harvest = await getPendingRewards(App, protocol.address);

        // todo: update this
        result.push({ token: protocol.protocol, deposited: balance.toNumber() / 10 ** 6, harvest: harvest.toNumber() });
    }

    // console.log(result);

    // return [
    //     { "token": "btc", "deposited": 1000, "harvest": "0.0023"},
    //     { "token": "eth", "deposited": 1000, "harvest": "0.0101"},
    // ]
    return result;
}

// 
const LP_CONF_ADDRESS = "0x0c51171b913Db10ade3fd625548E69C9C63aFb96";
// lookup in our configurable SC
const USDT_ADDRESS = "0x3C2B8Be99c50593081EAA2A724F0B8285F5aba8f";
const USDC_ADDRESS = "0x985458E523dB3d53125813eD68c274899e9DfAb4";

const poolIndex = 6; // Hard coded - verify this is ok ...

export function getDefaultProvider(network = "testnet") {
    if (network === "testnet") {
        return new ethers.providers.JsonRpcProvider("https://api.s0.b.hmny.io");
    }
    else {
        return new ethers.providers.JsonRpcProvider("https://api.harmony.one");
    }
}

export async function getBalances(App) {
    const usdt = await getBalanceOf(App, USDT_ADDRESS, App.account);
    const usdc = await getBalanceOf(App, USDC_ADDRESS, App.account);
    const lp = await getBalanceOf(App, LP_CONF_ADDRESS, App.account);

    return {
        usdt,
        usdc,
        lp
    }
}

export async function getAPR(App) {

    const SUSHI_CHEF_ABI = [{ "inputs": [{ "internalType": "contract IERC20", "name": "_sushi", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "name": "Deposit", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "indexed": true, "name": "pid", "internalType": "uint256" }, { "internalType": "uint256", "indexed": false, "type": "uint256", "name": "amount" }, { "internalType": "address", "indexed": true, "name": "to", "type": "address" }], "type": "event" }, { "name": "EmergencyWithdraw", "anonymous": false, "inputs": [{ "name": "user", "type": "address", "internalType": "address", "indexed": true }, { "internalType": "uint256", "indexed": true, "name": "pid", "type": "uint256" }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }, { "internalType": "address", "name": "to", "type": "address", "indexed": true }], "type": "event" }, { "type": "event", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "indexed": true, "type": "uint256", "internalType": "uint256", "name": "pid" }, { "name": "amount", "indexed": false, "internalType": "uint256", "type": "uint256" }], "name": "Harvest", "anonymous": false }, { "anonymous": false, "inputs": [{ "type": "uint256", "internalType": "uint256", "indexed": true, "name": "pid" }, { "type": "uint256", "indexed": false, "name": "allocPoint", "internalType": "uint256" }, { "name": "lpToken", "internalType": "contract IERC20", "indexed": true, "type": "address" }, { "name": "rewarder", "indexed": true, "type": "address", "internalType": "contract IRewarder" }], "type": "event", "name": "LogPoolAddition" }, { "type": "event", "inputs": [{ "type": "uint256", "indexed": true, "name": "pid", "internalType": "uint256" }, { "name": "allocPoint", "indexed": false, "type": "uint256", "internalType": "uint256" }, { "internalType": "contract IRewarder", "indexed": true, "type": "address", "name": "rewarder" }, { "type": "bool", "indexed": false, "name": "overwrite", "internalType": "bool" }], "name": "LogSetPool", "anonymous": false }, { "name": "LogSushiPerSecond", "inputs": [{ "name": "sushiPerSecond", "type": "uint256", "internalType": "uint256", "indexed": false }], "anonymous": false, "type": "event" }, { "anonymous": false, "type": "event", "name": "LogUpdatePool", "inputs": [{ "type": "uint256", "internalType": "uint256", "name": "pid", "indexed": true }, { "type": "uint64", "internalType": "uint64", "name": "lastRewardTime", "indexed": false }, { "type": "uint256", "indexed": false, "name": "lpSupply", "internalType": "uint256" }, { "name": "accSushiPerShare", "type": "uint256", "indexed": false, "internalType": "uint256" }] }, { "name": "OwnershipTransferred", "anonymous": false, "inputs": [{ "internalType": "address", "name": "previousOwner", "type": "address", "indexed": true }, { "internalType": "address", "type": "address", "indexed": true, "name": "newOwner" }], "type": "event" }, { "anonymous": false, "inputs": [{ "type": "address", "internalType": "address", "name": "user", "indexed": true }, { "type": "uint256", "name": "pid", "indexed": true, "internalType": "uint256" }, { "type": "uint256", "name": "amount", "indexed": false, "internalType": "uint256" }, { "internalType": "address", "indexed": true, "name": "to", "type": "address" }], "name": "Withdraw", "type": "event" }, { "stateMutability": "view", "type": "function", "name": "SUSHI", "inputs": [], "outputs": [{ "type": "address", "internalType": "contract IERC20", "name": "" }], "constant": true, "signature": "0xab560e10" }, { "type": "function", "outputs": [{ "type": "bool[]", "name": "successes", "internalType": "bool[]" }, { "type": "bytes[]", "name": "results", "internalType": "bytes[]" }], "name": "batch", "stateMutability": "payable", "inputs": [{ "type": "bytes[]", "name": "calls", "internalType": "bytes[]" }, { "internalType": "bool", "name": "revertOnFail", "type": "bool" }] }, { "inputs": [], "type": "function", "stateMutability": "nonpayable", "name": "claimOwnership", "outputs": [] }, { "outputs": [{ "internalType": "contract IERC20", "type": "address", "name": "" }], "name": "lpToken", "stateMutability": "view", "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "type": "function" }, { "stateMutability": "view", "type": "function", "inputs": [], "name": "migrator", "outputs": [{ "type": "address", "internalType": "contract IMigratorChef", "name": "" }], "constant": true, "signature": "0x7cd07e47" }, { "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "owner", "inputs": [], "type": "function", "stateMutability": "view", "constant": true, "signature": "0x8da5cb5b" }, { "outputs": [{ "internalType": "address", "type": "address", "name": "" }], "name": "pendingOwner", "stateMutability": "view", "inputs": [], "type": "function", "constant": true, "signature": "0xe30c3978" }, { "name": "permitToken", "stateMutability": "nonpayable", "outputs": [], "inputs": [{ "name": "token", "type": "address", "internalType": "contract IERC20" }, { "name": "from", "type": "address", "internalType": "address" }, { "name": "to", "type": "address", "internalType": "address" }, { "name": "amount", "type": "uint256", "internalType": "uint256" }, { "type": "uint256", "internalType": "uint256", "name": "deadline" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "type": "bytes32", "name": "r" }, { "name": "s", "type": "bytes32", "internalType": "bytes32" }], "type": "function" }, { "stateMutability": "view", "type": "function", "name": "poolInfo", "outputs": [{ "type": "uint128", "name": "accSushiPerShare", "internalType": "uint128" }, { "type": "uint64", "internalType": "uint64", "name": "lastRewardTime" }, { "type": "uint64", "name": "allocPoint", "internalType": "uint64" }], "inputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }] }, { "name": "rewarder", "stateMutability": "view", "inputs": [{ "name": "", "internalType": "uint256", "type": "uint256" }], "outputs": [{ "internalType": "contract IRewarder", "name": "", "type": "address" }], "type": "function" }, { "type": "function", "inputs": [], "stateMutability": "view", "outputs": [{ "internalType": "uint256", "type": "uint256", "name": "" }], "name": "sushiPerSecond", "constant": true, "signature": "0xa06e408b" }, { "name": "totalAllocPoint", "type": "function", "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view", "inputs": [], "constant": true, "signature": "0x17caf6f1" }, { "type": "function", "stateMutability": "nonpayable", "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }, { "name": "direct", "internalType": "bool", "type": "bool" }, { "type": "bool", "internalType": "bool", "name": "renounce" }], "name": "transferOwnership", "outputs": [] }, { "stateMutability": "view", "inputs": [{ "type": "uint256", "internalType": "uint256", "name": "" }, { "type": "address", "name": "", "internalType": "address" }], "outputs": [{ "type": "uint256", "name": "amount", "internalType": "uint256" }, { "name": "rewardDebt", "internalType": "int256", "type": "int256" }], "name": "userInfo", "type": "function" }, { "name": "poolLength", "outputs": [{ "type": "uint256", "internalType": "uint256", "name": "pools" }], "type": "function", "stateMutability": "view", "inputs": [], "constant": true, "signature": "0x081e3eda" }, { "outputs": [], "stateMutability": "nonpayable", "name": "add", "inputs": [{ "name": "allocPoint", "type": "uint256", "internalType": "uint256" }, { "type": "address", "internalType": "contract IERC20", "name": "_lpToken" }, { "internalType": "contract IRewarder", "name": "_rewarder", "type": "address" }], "type": "function" }, { "outputs": [], "name": "set", "type": "function", "stateMutability": "nonpayable", "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "name": "_allocPoint", "type": "uint256", "internalType": "uint256" }, { "name": "_rewarder", "internalType": "contract IRewarder", "type": "address" }, { "type": "bool", "internalType": "bool", "name": "overwrite" }] }, { "name": "setSushiPerSecond", "stateMutability": "nonpayable", "type": "function", "inputs": [{ "internalType": "uint256", "type": "uint256", "name": "_sushiPerSecond" }], "outputs": [] }, { "inputs": [{ "name": "_migrator", "internalType": "contract IMigratorChef", "type": "address" }], "name": "setMigrator", "stateMutability": "nonpayable", "type": "function", "outputs": [] }, { "outputs": [], "inputs": [{ "type": "uint256", "internalType": "uint256", "name": "_pid" }], "stateMutability": "nonpayable", "type": "function", "name": "migrate" }, { "inputs": [{ "name": "_pid", "type": "uint256", "internalType": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "type": "function", "stateMutability": "view", "name": "pendingSushi", "outputs": [{ "internalType": "uint256", "name": "pending", "type": "uint256" }] }, { "name": "massUpdatePools", "outputs": [], "type": "function", "inputs": [{ "name": "pids", "type": "uint256[]", "internalType": "uint256[]" }], "stateMutability": "nonpayable" }, { "outputs": [{ "internalType": "struct MiniChefV2.PoolInfo", "components": [{ "name": "accSushiPerShare", "internalType": "uint128", "type": "uint128" }, { "name": "lastRewardTime", "type": "uint64", "internalType": "uint64" }, { "type": "uint64", "internalType": "uint64", "name": "allocPoint" }], "name": "pool", "type": "tuple" }], "inputs": [{ "name": "pid", "type": "uint256", "internalType": "uint256" }], "stateMutability": "nonpayable", "name": "updatePool", "type": "function" }, { "inputs": [{ "type": "uint256", "internalType": "uint256", "name": "pid" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address", "type": "address", "name": "to" }], "outputs": [], "name": "deposit", "stateMutability": "nonpayable", "type": "function" }, { "name": "withdraw", "inputs": [{ "name": "pid", "internalType": "uint256", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }], "type": "function", "stateMutability": "nonpayable", "outputs": [] }, { "name": "harvest", "stateMutability": "nonpayable", "type": "function", "inputs": [{ "internalType": "uint256", "type": "uint256", "name": "pid" }, { "name": "to", "internalType": "address", "type": "address" }], "outputs": [] }, { "type": "function", "name": "withdrawAndHarvest", "outputs": [], "stateMutability": "nonpayable", "inputs": [{ "type": "uint256", "internalType": "uint256", "name": "pid" }, { "type": "uint256", "internalType": "uint256", "name": "amount" }, { "name": "to", "type": "address", "internalType": "address" }] }, { "name": "emergencyWithdraw", "inputs": [{ "type": "uint256", "internalType": "uint256", "name": "pid" }, { "type": "address", "internalType": "address", "name": "to" }], "type": "function", "stateMutability": "nonpayable", "outputs": [] }]
    const ONE_REWARDS_ABI = [{ "type": "constructor", "stateMutability": "nonpayable", "inputs": [{ "type": "address", "name": "_rewardToken", "internalType": "contract IERC20" }, { "type": "uint256", "name": "_rewardPerSecond", "internalType": "uint256" }, { "type": "address", "name": "_MASTERCHEF_V2", "internalType": "address" }] }, { "type": "event", "name": "LogInit", "inputs": [], "anonymous": false }, { "type": "event", "name": "LogOnReward", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "LogPoolAddition", "inputs": [{ "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "allocPoint", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "LogRewardPerSecond", "inputs": [{ "type": "uint256", "name": "rewardPerSecond", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "LogSetPool", "inputs": [{ "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "allocPoint", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "LogUpdatePool", "inputs": [{ "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint64", "name": "lastRewardTime", "internalType": "uint64", "indexed": false }, { "type": "uint256", "name": "lpSupply", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "accSushiPerShare", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "OwnershipTransferred", "inputs": [{ "type": "address", "name": "previousOwner", "internalType": "address", "indexed": true }, { "type": "address", "name": "newOwner", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "add", "inputs": [{ "type": "uint256", "name": "allocPoint", "internalType": "uint256" }, { "type": "uint256", "name": "_pid", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "claimOwnership", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "massUpdatePools", "inputs": [{ "type": "uint256[]", "name": "pids", "internalType": "uint256[]" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "onSushiReward", "inputs": [{ "type": "uint256", "name": "pid", "internalType": "uint256" }, { "type": "address", "name": "_user", "internalType": "address" }, { "type": "address", "name": "to", "internalType": "address" }, { "type": "uint256", "name": "", "internalType": "uint256" }, { "type": "uint256", "name": "lpToken", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "owner", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "pendingOwner", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "pending", "internalType": "uint256" }], "name": "pendingToken", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "address", "name": "_user", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address[]", "name": "rewardTokens", "internalType": "contract IERC20[]" }, { "type": "uint256[]", "name": "rewardAmounts", "internalType": "uint256[]" }], "name": "pendingTokens", "inputs": [{ "type": "uint256", "name": "pid", "internalType": "uint256" }, { "type": "address", "name": "user", "internalType": "address" }, { "type": "uint256", "name": "", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "poolIds", "inputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint128", "name": "accSushiPerShare", "internalType": "uint128" }, { "type": "uint64", "name": "lastRewardTime", "internalType": "uint64" }, { "type": "uint64", "name": "allocPoint", "internalType": "uint64" }], "name": "poolInfo", "inputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "pools", "internalType": "uint256" }], "name": "poolLength", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "rewardPerSecond", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "set", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "uint256", "name": "_allocPoint", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setRewardPerSecond", "inputs": [{ "type": "uint256", "name": "_rewardPerSecond", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "transferOwnership", "inputs": [{ "type": "address", "name": "newOwner", "internalType": "address" }, { "type": "bool", "name": "direct", "internalType": "bool" }, { "type": "bool", "name": "renounce", "internalType": "bool" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "tuple", "name": "pool", "internalType": "struct ComplexRewarderTime.PoolInfo", "components": [{ "type": "uint128", "name": "accSushiPerShare", "internalType": "uint128" }, { "type": "uint64", "name": "lastRewardTime", "internalType": "uint64" }, { "type": "uint64", "name": "allocPoint", "internalType": "uint64" }] }], "name": "updatePool", "inputs": [{ "type": "uint256", "name": "pid", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "amount", "internalType": "uint256" }, { "type": "uint256", "name": "rewardDebt", "internalType": "uint256" }], "name": "userInfo", "inputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }, { "type": "address", "name": "", "internalType": "address" }] }]

    const SUSHI_CHEF_ADDR = "0x67da5f2ffaddff067ab9d5f025f8810634d84287";
    const rewardTokenTicker = "SUSHI";
    const rewardOneTicker = "WONE";
    const SUSHI_CHEF = new ethers.Contract(SUSHI_CHEF_ADDR, SUSHI_CHEF_ABI, App.provider);
    const ONE_REWARDS_ADDR = await SUSHI_CHEF.rewarder(0);
    const ONE_REWARDS_CONTRACT = new ethers.Contract(ONE_REWARDS_ADDR, ONE_REWARDS_ABI, App.provider);

    const oneTokenAddress = "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a";

    const rewardsPerWeek = await SUSHI_CHEF.sushiPerSecond() / 1e18 * 604800;
    const oneRewardsPerWeek = await ONE_REWARDS_CONTRACT.rewardPerSecond() / 1e18 * 604800;

    const tokens = {};
    const prices = await getHarmonyPrices();

    return await loadHarmonySushiContract(App, tokens, prices, SUSHI_CHEF, SUSHI_CHEF_ADDR, SUSHI_CHEF_ABI, rewardTokenTicker,
        "SUSHI", null, rewardsPerWeek, "pendingSushi", [0], ONE_REWARDS_CONTRACT, ONE_REWARDS_ADDR, ONE_REWARDS_ABI,
        rewardOneTicker, oneTokenAddress, oneRewardsPerWeek);

}

async function loadHarmonySushiContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
    deathPoolIndices, chefOneRewardsContract, chefOneRewardsAddress, chefOneRewardsAbi, rewardOneTicker, oneTokenAddress,
    oneRewardsPerWeek) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();
    var tokens = {};

    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getHarmonyToken(App, rewardTokenAddress, chefAddress);
    const rewardsPerWeek = rewardsPerWeekFixed ??
        await chefContract.callStatic[rewardsPerBlockFunction]()
        / 10 ** rewardToken.decimals * 604800 / 3

    // const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    //     await getSushiPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, chefOneRewardsContract,
    //         chefOneRewardsAddress)));
    const poolInfos = [await getSushiPoolInfo(App, chefContract, chefAddress, poolIndex, pendingRewardsFunction, chefOneRewardsContract,
        chefOneRewardsAddress)];

    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getHarmonyToken(App, address, chefAddress);
    }));

    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "harmony") : undefined);
    // for (let i = 0; i < poolCount; i++) {
    // if (poolPrices[i]) {
    const apr = printSushiPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[0], poolIndex, poolPrices[0],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, null, "harmony", chefOneRewardsAbi, chefOneRewardsAddress, oneRewardsPerWeek,
        rewardOneTicker, oneTokenAddress, poolInfos[0].pendingOneTokens)

    return apr;
}

async function getSushiPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction, chefOneRewardsContract,
    chefOneRewardsAddress) {
    const poolInfo = await chefContract.poolInfo(poolIndex);
    const lpToken = await chefContract.lpToken(poolIndex);
    console.log(poolInfo, lpToken);
    if (poolInfo.allocPoint == 0) {
        return {
            address: lpToken,
            allocPoints: poolInfo.allocPoint ?? 1,
            poolToken: null,
            userStaked: 0,
            pendingRewardTokens: 0,
        };
    }
    const poolToken = await getHarmonyToken(app, lpToken, chefAddress);
    // const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    //const userInfoMatic = await chefMaticRewardsContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    // const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    // const pendingOneTokens = await chefOneRewardsContract.pendingToken(poolIndex, app.YOUR_ADDRESS);
    // const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
        address: lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        // userStaked: staked,
        // pendingRewardTokens: pendingRewardTokens / 10 ** 18,
        // pendingOneTokens: pendingOneTokens / 10 ** 18,
    };
}

function printSushiPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
    totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
    pendingRewardsFunction, fixedDecimals, claimFunction, chain = "harmony",
    chefOneRewardsAbi, chefOneRewardsAddress, oneRewardsPerWeek,
    rewardOneTicker, oneTokenAddress, pendingOneTokens) {
    fixedDecimals = fixedDecimals ?? 2;
    const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken);
    var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
    let poolOneRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * oneRewardsPerWeek;
    if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const rewardOnePrice = getParameterCaseInsensitive(prices, oneTokenAddress)?.usd;
    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;

    const apr = printSushiAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
        staked_tvl, userStaked, poolPrices.price, fixedDecimals, poolOneRewardsPerWeek, rewardOnePrice, rewardOneTicker);

    return apr;
}

function printSushiAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek,
    stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
    fixedDecimals, poolOneRewardsPerWeek, rewardOnePrice, rewardOneTicker) {
    var usdPerWeek = poolRewardsPerWeek * rewardPrice;
    var usdOnePerWeek = poolOneRewardsPerWeek * rewardOnePrice;
    fixedDecimals = fixedDecimals ?? 2;
    var weeklyAPR = usdPerWeek / staked_tvl * 100;
    var yearlySushiAPR = weeklyAPR * 52;
    var weeklyOneAPR = usdOnePerWeek / staked_tvl * 100;
    var yearlyOneAPR = weeklyOneAPR * 52;
    let totalYearlyAPR = yearlySushiAPR + yearlyOneAPR;
    return {
        yearlyAPR: (Math.round(totalYearlyAPR * 100) / 100),
    }
}