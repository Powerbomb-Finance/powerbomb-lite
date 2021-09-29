
import { useSnackbar } from 'notistack'
import { useContext, useEffect, useState } from 'react'
import { AccountContext, truncateAccount } from '../utils/accounts'
import DepositView from './deposits';

//
export default function Accounts({ facts }) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { config, setConfig } = useContext(AccountContext);


    const copyToClipboard = () => {
        navigator.clipboard.writeText(config?.account?.account);
        enqueueSnackbar("Copied Address to Clipboard",
            {
                variant: "info",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            });
    }

    const closeAccountDetails = () => {
        setConfig({
            ...config,
            account: {
                ...config?.account,
                accountDetails: false
            }
        })
    }

    const changeAccount = () => {
        setConfig({
            ...config,
            account: {
                ...config?.account,
                accountDetails: false,
                accountDlg: true,
            }
        })
    }

    return (
        <div className={"modal " + (config?.account?.accountDetails && config?.account?.account ? "modal-open" : "")} data-reach-dialog-overlay="" style={{ "opacity": "1", "backdropFilter": "blur(16px)" }}>
            <div aria-modal="true" role="dialog" tabIndex="-1" aria-label="dialog" className="modal-box rounded p-px bg-gradient-to-r from-blue-400 to-green-400" data-reach-dialog-content="">
                <div className="w-full ">
                    <div className="flex flex-col h-full w-full rounded bg-gray-900 p-6 overflow-y-auto">
                        <div className="space-y-3">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between mb-4 ">
                                    <h2 className="text-2xl font-medium font-bold">Account</h2>
                                    <div onClick={closeAccountDetails} className="flex items-center justify-center w-6 h-6 cursor-pointer text-info hover:text-high-emphesis">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="font-thin text-baseline">Connected with MetaMask</div>
                                        <div className="flex space-x-3">
                                            <button onClick={changeAccount} className="bg-dark-700 bg-opacity-20 outline-gray rounded text-gray hover:bg-opacity-40 disabled:bg-opacity-20 px-2 py-1 text-xs rounded disabled:cursor-not-allowed focus:outline-none">Change</button>
                                        </div>
                                    </div>
                                    <div id="web3-account-identifier-row" className="flex flex-col justify-center space-y-3">
                                        <div className="bg-gray-800 py-2 px-3 rounded">
                                            <div className="text-base font-medium">{config?.account?.account}</div>
                                        </div>
                                        <div className="flex items-center space-x-3 gap-2">
                                            <a target="_blank" rel="noopener noreferrer" href={"https://beta.explorer.harmony.one/#/address/" + config?.account?.account} className="text-baseline whitespace-nowrap text-blue opacity-80 hover:opacity-100 focus:opacity-100 space-x-1 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                                <div className="text-sm font-medium currentColor">View on explorer</div>
                                            </a>
                                            <div className="flex items-center flex-shrink-0 space-x-1 no-underline cursor-pointer whitespace-nowrap hover:no-underline focus:no-underline active:no-underline text-blue opacity-80 hover:opacity-100 focus:opacity-100" onClick={copyToClipboard}>
                                                <div className="text-sm font-medium currentColor">Copy Address</div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 py-3">
                                        <div>Account Balances</div>
                                        <DepositView />
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


