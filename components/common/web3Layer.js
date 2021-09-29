import strategy from "./strategy";

const connectWeb3 = () => {

}

const getDefaultProvider = (strategyName, network="testnet") => {
    return strategy[strategyName].getDefaultProvider(network);
}

const getAPR = (app) => {
    return strategy[app.strategy].getAPR(app);
}

const getAvailableBalances = (app) => {
    return strategy[app.strategy].getTokenBalances(app);
}

const approve = async (app, total, token, award) => {
    return strategy[app.strategy].approveToken(app, total, token, award);
}
const powerbomb = (app, amount, tokenDeposit, tokenRewards) => {

}

const getPowerBombStats = (app) => {
    // call smart contract, get stats
}

const getPowerBombUserStats = (app) => {
    // call smart contract to get stats for a logged in user
}

const getConfiguredDeposits = () => {

}

export {
    getAPR,
    connectWeb3,
    getDefaultProvider,
    getAvailableBalances, 
    approve
}