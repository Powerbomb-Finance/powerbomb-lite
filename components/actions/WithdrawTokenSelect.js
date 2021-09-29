
import Image from 'next/image';
import { useSnackbar } from 'notistack'
import { useContext, useEffect, useState } from 'react'
import { transferToken, withdrawSLP } from '../common/strategy/harmony';
import useStickyState from '../common/useStickyState';
import { approve, getDefaultProvider } from '../common/web3Layer';
import { AccountContext, truncateAccount } from '../utils/accounts'

//
const supportedTokens = [
    "usdt", "usdc", "lp"
];

export default function SelectToken({ facts }) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { config, setConfig } = useContext(AccountContext);
    // const [transactions, setTransactions] = useStickyState([], "transactionList");
    const [selectedToken, setSelectedToken] = useState("");

    const closeWithdraw = (isComplete) => {
        console.log("Close withdraw dlg");
        setConfig({
            ...config,
            account: {
                ...config?.account,
                tokenSelectDlg: false,
                selectPoolToken: "",
                selectTokenAmount: 0,
                withdrawDlg: !isComplete // hide if we succeeded
            }
        })
        setSelectedToken("");
        setProcessing(false);
    }

    const withdraw = async () => {
        const pool = config?.account?.selectPoolToken;
        const value = config?.account?.selectTokenAmount;
        const targetToken = selectedToken;

        setProcessing(true);
        try {
            // amount / 2 * 0.995 (variance of 0.005)

            const res = await withdrawSLP({
                provider: config?.account?.provider,
                strategy: "harmony",
                account: config?.account?.account
            }, pool, value / 2 * 0.995, targetToken);

            console.log("withdraw slp clicked", res, config);
            // transactions.push(res);
            // setTransactions(JSON.parse(JSON.stringify(transactions))); // update state ... must be a better way 
            enqueueSnackbar(<div>Withdraw {value} {targetToken} Successfully - <a href={"https://explorer.harmony.one/tx/" + res?.hash} target="_blank">{res?.hash}</a></div>,
                {
                    variant: "info",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });

            closeWithdraw(true); // close and dismiss
        }
        catch (e) {
            console.error(e);

            enqueueSnackbar(<div>Withdraw {value} {targetToken} Failed - Please check logs</div>,
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

    const [processing, setProcessing] = useState(false);
    console.log(selectedToken);

    return (
        <div className={"modal " + (config?.account?.tokenSelectDlg ? "modal-open" : "")} data-reach-dialog-overlay="" style={{ "opacity": "1", "backdropFilter": "blur(16px)" }}>
            <div aria-modal="true" role="dialog" tabIndex="-1" aria-label="dialog" className="modal-box rounded p-px bg-gradient-to-r from-blue-400 to-green-400" data-reach-dialog-content="">
                <div className="w-full ">
                    <div className="flex flex-col h-full w-full rounded bg-gray-900 p-6 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4 ">
                            <h2 className="text-2xl font-medium font-bold">Powerbomb Withdraw</h2>
                            <div onClick={e => { closeWithdraw() }} className="flex items-center justify-center w-6 h-6 cursor-pointer text-info hover:text-high-emphesis">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <div className="flex flex-col gap-2  bg-gradient-to-r from-gray-700 to-gray-900 p-2 rounded">
                                <div className="flex-1 flex flex-row gap-4 mx-auto">
                                    <Image className="rounded-xl" src={`/tokens/${config?.account?.selectPoolToken}.jpeg`} width="80px" height="80px" />
                                    <Image className="transform rotate-180" src={`/convert.png`} width="80px" height="80px" />
                                    <Image className="rounded-xl" src={"/tokens/" + (selectedToken === "" ? "questionmark.png" : selectedToken + ".jpeg")} width="80px" height="80px" />
                                </div>
                                <div className="flex flex-row mx-auto">
                                    <div className="text-5xl text-center">
                                        {config?.account?.selectTokenAmount}
                                    </div>
                                    USD
                                </div>
                            </div>
                            <div className="font-thin text-center">
                                You are withdrawing <span className="bg-black rounded font-bold p-1">{config?.account?.selectTokenAmount} USD</span> from the <b>{config?.account?.selectPoolToken}</b> pool
                            <br/>
                            Select the token you want to receive
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                {supportedTokens.map(token => {
                                    return (<div key={token} className={"bg-black p-px rounded bg-gradient-to-r " + (selectedToken === token ? "from-red-400 to-yellow-400":"from-gray-300 to-gray-600")}>
                                        <button className="btn rounded p-0 w-full"
                                            key={token}
                                            onClick={() => {
                                                setSelectedToken(token)
                                            }}
                                        >
                                            <div className="flex w-full p-2">
                                                <div className="flex-1 font-thin text-lg text-left">{token}</div>
                                                <div className="flex-0"><Image src={"/tokens/" + token + ".jpeg"} height="32px" width="32px" /></div>
                                            </div>
                                        </button></div>);
                                })}
                            </div>
                            <button className={"btn btn-secondary " + (processing ? "loading" : "")} onClick={withdraw}>Withdraw {config?.account?.selectTokenAmount} {config?.account?.inputToken}</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


