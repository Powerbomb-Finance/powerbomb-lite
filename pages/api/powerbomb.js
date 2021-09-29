import { ethers } from 'ethers';

import { getAllPoolInUSD, getPendingPowerbombRewards, harvestRewards } from '../../components/common/strategy/harmony'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const getSigner = () => {
    return new ethers.Wallet(process.env.PRIVATE_KEY, new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL));
}

export default async function handler(req, res) {
    console.log("Powerbomb bot called", new Date())
    const signer = getSigner();
    const returnObj = {

    }

    const result = await getPendingPowerbombRewards({
        strategy: "harmony",
        provider: signer,
        account: signer.address
    });

    returnObj.pendingBeforeHarvest = result;

    const deposits = await getAllPoolInUSD({
        strategy: "harmony",
        provider: signer,
        account: signer.address
    });

    returnObj.currentTotalDeposits = deposits.toString();

    if (+result.one > 1) {
        const r = await harvestRewards({
            strategy: "harmony",
            provider: config?.account?.provider,
            account: config?.account?.account
        });

        returnObj.pendingAfterHarvest = await getPendingPowerbombRewards({
            strategy: "harmony",
            provider: signer,
            account: signer.address
        });

        returnObj.harvestResult = r;
        returnObj.message = "Rewards threshold met, we called harvest";
    }
    else {
        returnObj.message = "Rewards threshold not met, we did not call harvest";
    }

    returnObj.timestamp = new Date().getTime();

    console.log("Powerbomb bot called - result is ", returnObj, new Date());

    res.status(200).json(returnObj)
}