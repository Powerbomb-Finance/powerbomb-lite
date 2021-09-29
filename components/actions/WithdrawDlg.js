
import Image from 'next/image';
import { useSnackbar } from 'notistack'
import { useContext, useEffect, useState } from 'react'
import DepositView from '../accounts/deposits';
import { withdrawSLP, getDepositBalances } from '../common/strategy/harmony';
import useStickyState from '../common/useStickyState';
import { AccountContext, truncateAccount } from '../utils/accounts'
import SelectToken from './WithdrawTokenSelect';

//
export default function WithdrawDlg({ facts }) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    // const [transactions, setTransactions] = useStickyState([], "transactionList");
    const { config, setConfig } = useContext(AccountContext);

    const [results, setResults] = useState(null);
    const btc = results?.filter(r => r.token === "btc")[0]
    const eth = results?.filter(r => r.token === "eth")[0]
    const [processing, setProcessing] = useState(false);
    const [withdrawValue, setValue] = useState(0);
    const [withdrawValueEth, setValueEth] = useState(0);

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
                withdrawDlg: false
            }
        })
    }

    const withdraw = (amount, token) => {
        console.log("Lets withdraw", token)
        setConfig({
            ...config,
            account: {
                ...config?.account,
                tokenSelectDlg: true,
                selectPoolToken: token,
                selectTokenAmount: amount
            }
        })
    }

    const getAmount = (token) => {
        if (token === "btc") {
            return withdrawValue;
        }
        else if (token === "eth") {
            return withdrawValueEth;
        }
        return 0;
    }

    const isValid = (token) => {
        if (token === "btc") {
            if (withdrawValue == 0) return true;
            return withdrawValue > 0 && withdrawValue <= btc?.deposited;
        }
        else if (token === "eth") {
            if (withdrawValueEth == 0) return true;
            return withdrawValueEth > 0 && withdrawValueEth <= eth?.deposited;
        }

        return false; // unsupported token
    }

    return (
        <div className={"modal " + (config?.account?.withdrawDlg ? "modal-open" : "")} data-reach-dialog-overlay="" style={{ "opacity": "1", "backdropFilter": "blur(16px)" }}>
            <SelectToken/>
            <div aria-modal="true" role="dialog" tabIndex="-1" aria-label="dialog" className="modal-box rounded p-px bg-gradient-to-r from-blue-400 to-green-400" data-reach-dialog-content="">
                <div className="w-full ">
                    <div className="flex flex-col h-full w-full rounded bg-gray-900 p-6 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4 ">
                            <h2 className="text-2xl font-medium font-bold">Withdraw</h2>
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
                                                <h2 className="text-5xl pr-4">{btc?.deposited}</h2>
                                                <div>USD</div>
                                            </div>
                                            <div className="flex flex-row font-thin text-sm py-4">
                                                {results?.filter(r => r.token === "btc")[0]?.harvest} BTC EARNED
                                            </div>
                                        </div>
                                        <div className="form-control flex-1 p-1">
                                            <div className="relative">
                                                <div data-tip={!isValid('btc') ? "Invalid amount entered" : ""} className={"w-full z-40 " + (!isValid("btc") ? "tooltip tooltip-secondary tooltip-top tooltip-open" : "")}>
                                                    <input type="number" placeholder="Search" className={"input input-bordered w-full " + (!isValid("btc") ? " input-error" : "")} value={withdrawValue} onChange={e => setValue(e.target.value)} />
                                                </div>
                                                <button disabled={!isValid('btc')} onClick={e => isValid("btc") && withdraw(withdrawValue, "btc")} className={"absolute top-0 right-0 rounded-l-none btn z-50 btn-primary " + (processing ? "loading" : "")} >WITHDRAW</button>
                                                
                                            </div>
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
                                                <h2 className="text-5xl pr-4">{eth?.deposited}</h2>
                                                <div>USD</div>
                                            </div>
                                            <div className="flex flex-row font-thin text-sm py-4">
                                                {results?.filter(r => r.token === "eth")[0]?.harvest} ETH EARNED
                                            </div>
                                        </div>
                                        <div className="form-control flex-1 p-1">
                                            <div className="relative">
                                                <div data-tip={!isValid('eth') ? "Invalid amount entered" : ""} className={"w-full z-40 " + (!isValid('eth') ? "tooltip tooltip-secondary tooltip-top tooltip-open" : "")}>
                                                    <input type="number" placeholder="Search" className={"input input-bordered w-full " + (!isValid('eth') ? " input-error" : "")} value={withdrawValueEth} onChange={e => setValueEth(e.target.value)} />
                                                </div>
                                                <button disabled={!isValid('eth')} onClick={e => isValid("eth") && withdraw(withdrawValueEth, "eth")} className={"absolute top-0 right-0 rounded-l-none btn z-50 btn-primary " + (processing ? "loading" : "")}>WITHDRAW</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


