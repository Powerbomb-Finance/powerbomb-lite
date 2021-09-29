import { getAPR, getDefaultProvider, getBalances, getDepositBalances, approveToken, transferToken } from "./harmony";

const strategy = {
    "harmony": {
        getAPR: getAPR,
        getDefaultProvider: getDefaultProvider,
        getTokenBalances: getBalances,
        getDepositBalances: getDepositBalances,

        approveToken: approveToken,
        transferToken: transferToken,
    }

}
export default strategy;