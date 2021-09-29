
import { ethers } from 'ethers';
import Image from 'next/image';
import { useSnackbar } from 'notistack'
import { useContext, useEffect, useState } from 'react'
import { requiresApproval, transferSplit, transferToken } from '../common/strategy/harmony';
import useStickyState from '../common/useStickyState';
import { approve, getDefaultProvider } from '../common/web3Layer';
import { AccountContext, truncateAccount } from '../utils/accounts'

//
export default function AccountDlg({ facts }) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { config, setConfig } = useContext(AccountContext);
    const [approval, setApproval] = useState(undefined);
    // const [transactions, setTransactions] = useStickyState([], "transactionList");

    const closeAccount = () => {
        console.log("Close withdraw dlg");
        setConfig({
            ...config,
            account: {
                ...config?.account,
                depositDlg: false
            }
        })

        currentStep(0);
        setProcessing(false);
    }

    const approveClicked = async () => {
        setProcessing(true);
        try {
            const res = await approve({ //set max approval
                provider: config?.account?.provider,
                strategy: "harmony",
                account: config?.account?.account
            }, ethers.constants.MaxUint256, config?.account?.inputToken, config?.account?.interestToken);

            // res.action = "approve";
            // transactions.push(res);
            // setTransactions(JSON.parse(JSON.stringify(transactions))); // update state ... must be a better way 
            enqueueSnackbar(<div>Transaction Approved - <a href={"https://explorer.harmony.one/tx/" + res?.hash} target="_blank">{res?.hash}</a></div>,
                {
                    variant: "info",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                    autoHideDuration: 10000
                });
            currentStep(1);

        } catch (e) {
            console.error(e);
            enqueueSnackbar(<div>Approval Failed - Please check logs</div>,
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

    const transferClicked = async () => {
        setProcessing(true);
        try {
            console.log(config?.account?.interestToken);
            let res = "";
            if (config?.account?.interestToken === "mixed") {
                res = await transferSplit({
                    provider: config?.account?.provider,
                    strategy: "harmony",
                    account: config?.account?.account
                }, config?.account?.depositAmt, config?.account?.breakdown || { "btc": 5000, "eth": 5000}, config?.account?.inputToken);
                console.log("transfer clicked - using split transfer mode", res, config);    
            }
            else {
                res = await transferToken({
                    provider: config?.account?.provider,
                    strategy: "harmony",
                    account: config?.account?.account
                }, config?.account?.depositAmt, config?.account?.inputToken, config?.account?.interestToken);
                console.log("transfer clicked", res, config);

            }
            // res.action = "transfer";
            // transactions.push(res);
            // setTransactions(JSON.parse(JSON.stringify(transactions))); // update state ... must be a better way 

            enqueueSnackbar(<div>Deposit Accepted - <a href={"https://explorer.harmony.one/tx/" + res?.hash} target="_blank">{res?.hash}</a></div>,
                {
                    variant: "info",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
            currentStep(0);

            closeAccount(); // close and dismiss
        }
        catch (e) {
            console.error(e);

            enqueueSnackbar(<div>Deposit Failed - Please check logs</div>,
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

    useEffect(() => {
        if (config?.account?.depositDlg) {
            setProcessing(true);
            const fn = async () => {
                const result = await requiresApproval({
                    provider: config?.account?.provider,
                    strategy: "harmony",
                    account: config?.account?.account
                }, config?.account?.inputToken, config?.account?.depositAmt, config?.account?.interestToken);
                console.log(result);
                setApproval(result);
                setProcessing(false);
                if (result) {
                    currentStep(0);
                }
                else {
                    currentStep(1);
                }
            }
            fn();
        }
    }, [config?.account?.depositDlg]);

    const [processing, setProcessing] = useState(false);
    const [step, currentStep] = useState(0);
    // depositDlg: true,
    //                 depositAmt: powerBombValue,
    //                 inputToken: deposit,
    //                 interestToken: interest,
    return (
        <div className={"modal " + (config?.account?.depositDlg ? "modal-open" : "")} data-reach-dialog-overlay="" style={{ "opacity": "1", "backdropFilter": "blur(16px)" }}>
            <div aria-modal="true" role="dialog" tabIndex="-1" aria-label="dialog" className="modal-box rounded p-px bg-gradient-to-r from-blue-400 to-green-400" data-reach-dialog-content="">
                <div className="w-full ">
                    <div className="flex flex-col h-full w-full rounded bg-gray-900 p-6 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4 ">
                            <h2 className="text-2xl font-medium font-bold">Powerbomb Deposit</h2>
                            <div onClick={e => { closeAccount() }} className="flex items-center justify-center w-6 h-6 cursor-pointer text-info hover:text-high-emphesis">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <div className="flex flex-col gap-2  bg-gradient-to-r from-gray-700 to-gray-900 p-2 rounded">
                                <div className="flex-1 flex flex-row gap-4 mx-auto">
                                    <Image className="rounded-xl" src={`/tokens/${config?.account?.inputToken}.jpeg`} width="80px" height="80px" />
                                    <Image src={`/convert.png`} width="80px" height="80px" />
                                    <Image className="rounded-xl" src={`/tokens/${config?.account?.interestToken + (config?.account?.interestToken === "mixed" ? ".png" : ".jpeg")}`} width="80px" height="80px" />
                                </div>
                                <div className="flex flex-row mx-auto">
                                    <div className="text-5xl text-center">
                                        {config?.account?.depositAmt}
                                    </div>
                                    {config?.account?.inputToken}
                                </div>
                            </div>
                            <div className="font-thin text-center">
                                You are depositing <span className="bg-black rounded font-bold p-1">{config?.account?.depositAmt} {config?.account?.inputToken}</span> for Interest paid in <b>{config?.account?.interestToken}</b>
                            </div>
                            <button className={"btn btn-primary " + (processing ? "loading" : "") + " " + (approval ? " " : " hidden")} disabled={step != 0} onClick={approveClicked}>Approve {config?.account?.depositAmt} {config?.account?.inputToken}</button>
                            <button className={"btn btn-secondary " + (processing ? "loading" : "")} disabled={step != 1} onClick={transferClicked}>Deposit {config?.account?.depositAmt} {config?.account?.inputToken} to Powerbomb</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


