
import Image from 'next/image';
import { useSnackbar } from 'notistack'
import { useContext, useEffect, useState } from 'react'
import DepositView from '../accounts/deposits';
import { claimAllRewards, claimRewards, getDepositBalances } from '../common/strategy/harmony';
import useStickyState from '../common/useStickyState';
import { AccountContext, truncateAccount } from '../utils/accounts'

//
export default function HarvestDlg({ facts }) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { config, setConfig } = useContext(AccountContext);
    // const [transactions, setTransactions] = useStickyState([], "transactionList");


    const [results, setResults] = useState(null);
    const btc = results?.filter(r => r.token === "btc")[0]
    const eth = results?.filter(r => r.token === "eth")[0]

    const [processing, setProcessing] = useState(false);

    useEffect(e => {
        if (!config?.account?.account) return;

        if (config?.account?.depositDlg || config?.account?.withdrawDlg) {
            return;
        }

        const fn = async () => {
            const result = await getDepositBalances({
                strategy: "harmony",
                provider: config?.account?.provider,
                account: config?.account?.account
            });
            setResults(result);
        }
        fn();

    }, [config?.account?.account, config?.account?.depositDlg, config?.account?.withdrawDlg]);

    const closeWithdraw = () => {
        console.log("Close withdraw dlg");
        setConfig({
            ...config,
            account: {
                ...config?.account,
                harvestDlg: false
            }
        })
    }

    const harvestAll = async () => {
        setProcessing(true);
        try {
            const res = await claimAllRewards({
                provider: config?.account?.provider,
                strategy: "harmony",
                account: config?.account?.account
            });

            console.log("harvest all rewards clicked", res, config);
            // transactions.push(res);
            // setTransactions(JSON.parse(JSON.stringify(transactions))); // update state ... must be a better way 
            enqueueSnackbar(<div>Harvest All Rewards Successfully - <a href={"https://explorer.harmony.one/tx/" + res?.hash} target="_blank">{res?.hash}</a></div>,
                {
                    variant: "info",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });

            closeWithdraw(); // close and dismiss
        }
        catch (e) {
            console.error(e);

            enqueueSnackbar(<div>Harvest All Rewards Failed - Please check logs</div>,
                {
                    variant: "error",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
        }
        setProcessing(false);
    }

    const harvest = async (token) => {
        setProcessing(true);
        try {
            const res = await claimRewards({
                provider: config?.account?.provider,
                strategy: "harmony",
                account: config?.account?.account
            }, token);

            console.log("harvest clicked", res, config);
            // transactions.push(res);
            // setTransactions(JSON.parse(JSON.stringify(transactions))); // update state ... must be a better way 
            enqueueSnackbar(<div>Harvest Successfully - <a href={"https://explorer.harmony.one/tx/" + res?.hash} target="_blank">{res?.hash}</a></div>,
                {
                    variant: "info",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });

            closeWithdraw(); // close and dismiss
        }
        catch (e) {
            console.error(e);

            enqueueSnackbar(<div>Harvest Failed - Please check logs</div>,
                {
                    variant: "error",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
        }
        setProcessing(false);
    }

    return (
        <div className={"modal " + (config?.account?.harvestDlg ? "modal-open" : "")} data-reach-dialog-overlay="" style={{ "opacity": "1", "backdropFilter": "blur(16px)" }}>
            <div aria-modal="true" role="dialog" tabIndex="-1" aria-label="dialog" className="modal-box rounded p-px bg-gradient-to-r from-blue-400 to-green-400" data-reach-dialog-content="">
                <div className="w-full ">
                    <div className="flex flex-col h-full w-full rounded bg-gray-900 p-6 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4 ">
                            <h2 className="text-2xl font-medium font-bold">Harvest</h2>
                            <div onClick={e => closeWithdraw()} className="flex items-center justify-center w-6 h-6 cursor-pointer text-info hover:text-high-emphesis">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="w-full p-px bg-gradient-to-r from-gray-500 to-gray-700 rounded">
                                <div className="card card-side bg-gray-900 rounded">
                                    <div className="p-2 flex-none">
                                        <Image src="/bitcoin.png" width="100px" height="100px" />
                                    </div>
                                    <div className="card-body p-2 flex-1">
                                        <h2 className="card-title text-sm font-thin">Your Bitcoin Earning Pool</h2>
                                        <div className="flex flex-col">
                                            <div className="flex flex-row">
                                                <h2 className="text-5xl pr-4">{btc?.harvest}</h2>
                                                <div>BTC EARNED</div>
                                            </div>
                                            <div className="flex flex-row font-thin text-sm py-4">
                                                {btc?.deposited} USD DEPOSITED
                                            </div>
                                        </div>
                                        <div className="form-control flex-1 p-1">
                                            <button onClick={e => harvest("btc")} className={"absolute top-0 right-0 rounded-l-none btn z-50 btn-primary " + (processing ? "loading" : "")} >HARVEST - {btc?.harvest} BTC</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full p-px bg-gradient-to-r mt-4 from-gray-500 to-gray-700 rounded">
                                <div className="card card-side bg-gray-900 rounded">
                                    <div className="p-2 flex-none">
                                        <Image src="/ethereum.png" width="100px" height="100px" />
                                    </div>
                                    <div className="card-body p-2 flex-1">
                                        <h2 className="card-title text-sm font-thin">Your Ethereum Earning Pool</h2>
                                        <div className="flex flex-col">
                                            <div className="flex flex-row">
                                                <h2 className="text-5xl pr-4">{eth?.harvest}</h2>
                                                <div>ETH EARNED</div>
                                            </div>
                                            <div className="flex flex-row font-thin text-sm py-4">
                                                {eth?.deposited} USD DEPOSITED
                                            </div>
                                        </div>
                                        <div className="form-control flex-1 p-1">
                                            <button onClick={e => harvest("eth")} className={"absolute top-0 right-0 rounded-l-none btn z-50 btn-primary " + (processing ? "loading" : "")}>HARVEST - {eth?.harvest} ETH</button>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-action">
                                <div className="form-control flex-1 p-1">
                                    <button onClick={e => harvestAll()} className={" top-0 right-0 rounded-l-none btn z-50 btn-primary " + (processing ? "loading" : "")}>HARVEST ALL REWARDS</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


