import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AccountContext, truncateAccount } from "../utils/accounts";

export default function NavBar({ icon, desc, account }) {
    const { config, setConfig } = useContext(AccountContext);
    const [ injected, setInjected ] = useState("");

    const accountsClicked = (e) => {
        if (config.account) {
            setConfig({
                ...config,
                account: {
                    ...config?.account,
                    accountDetails: true
                }
            })
        }
    }

    const networksClicked = () => {
        //if (config.account) {
            setConfig({
                ...config,
                account: {
                    ...config?.account,
                    networkDlg: true
                }
            })
        //}
    }

    useEffect(e=>{
        setInjected(config.selectedNetwork ? config.selectedNetwork : parseInt(window.ethereum?.chainId, 16));
    }, [config.supportedNetworks, config.selectedNetwork])

    return (<div className="navbar mb-2 text-neutral-content flex">
        <div className="flex-1 mpx-2 mx-2">
            <span className="text-lg font-bold bg-gradient-to-r from-gray-300 to-gray-200 rounded shadow">
                <Image src="/powerbomb-logo.png" width="250px" height="45px"/>
            </span>
        </div>

        <div onClick={networksClicked} className="mr-2 w-auto flex items-center rounded bg-gray-700 hover:bg-gray-800 md:p-0.5 mt-2 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
            <div id="web3-status-connected" className=" md:block hidden flex items-center px-2 py-2 text-sm rounded-lg bg-gray-900 text-white">
                <div className="md:block hidden">
                    {(config?.selectedNetwork || injected) && config?.supportedNetworks ? config?.supportedNetworks.find(e=>e.chainId === config?.selectedNetwork || e.chainId === injected).displayName : "<Select Network>"}
                </div>
            </div>
            <div className="md:hidden block">
                <Image src="/wallet.png" height="32px" width="32px" />
            </div>
        </div>

        {account && account.account && <div onClick={accountsClicked} className="w-auto flex items-center rounded bg-gray-700 hover:bg-gray-800 md:p-0.5 mt-2 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
            <div id="web3-status-connected" className=" md:block hidden flex items-center px-3 py-2 text-sm rounded-lg bg-gray-900 text-white">
                <div className="mr-2 md:block hidden">{truncateAccount(config)}</div>
            </div>
            <div className="md:hidden block">
                <Image src="/wallet.png" height="32px" width="32px" />
            </div>
        </div>}
        <div className="flex-none px-2 mx-2 lg:flex">
            <div className="flex items-stretch">
                <a className="btn btn-ghost btn-xs rounded-btn" href="/info">
                    <div className="md:hidden block"><Image src="/team.png" height="32px" width="32px" /></div>
                    <span className="md:block hidden">Team</span>
                </a>
                <a className="btn btn-ghost btn-xs rounded-btn" href="https://medium.com/powerbombfinance" target="_blank">
                    <div className="md:hidden block"><Image className="md:hidden block" src="/medium.png" height="32px" width="32px" /></div>
                    <span className="md:block hidden">Medium</span>
                </a>
                <a className="btn btn-ghost btn-xs rounded-btn" href="https://twitter.com/powerbombfi?s=09" target="_blank">
                    <div className="md:hidden block"><Image className="md:hidden block" src="/twitter.png" height="32px" width="32px" /></div>
                    <span className="md:block hidden">Twitter</span>
                </a>
            </div>
        </div>

    </div>);
}