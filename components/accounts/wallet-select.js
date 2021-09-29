import React, { useContext, useEffect, useState } from 'react'
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

//import { useEagerConnect, useInactiveListener } from '../hooks'
import {
    injected,
    onewallet
} from './connectors'
import Image from 'next/image'
import { AccountContext } from '../utils/accounts'

const ConnectorNames = {
    Injected: 'MetaMask',
    OneWallet: 'OneWallet',

}

const Icons = {
    [ConnectorNames.Injected]: "metamask.png",
    [ConnectorNames.OneWallet]: "one.png"
}

const connectorsByName = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.OneWallet]: onewallet
}

function getLibrary(provider) {
    let library;

    if (provider?.chainType === 'hmy') {
        library = provider.blockchain
    } else {
        library = new Web3Provider(provider)
        library.pollingInterval = 12000
    }

    return library
}

export default function WalletProvider({ openDialog }) {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <WalletSelect openDialog={openDialog} />
        </Web3ReactProvider>
    )
}

function WalletSelect() {
    const { config, setConfig } = useContext(AccountContext);

    const context = useWeb3React()
    const { connector, library, chainId, account, activate, deactivate, active, error } = context;
    const isHmyLibrary = (library?.messenger?.chainType === 'hmy');

    const [connectNewWallet, setConnectNewWallet] = useState(false);

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = React.useState()
    React.useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined)
        } else {
            activate(activatingConnector);
        }
    }, [activatingConnector, connector])


    React.useEffect(() => {
        if (active) {
            console.log(library);
            const isHmyLibrary = (library?.messenger?.chainType === 'hmy')

            setConfig({
                ...config,
                account: {
                    ...config?.account,
                    accountDlg: false,
                    account: account,
                    provider: isHmyLibrary ? library.messenger.provider : library.getSigner(account).connectUnchecked()
                },
                selectedNetwork: chainId
            })
        }
    }, [active]);

    const closeDialog = () => {
        setConfig({
            ...config,
            account: {
                ...config?.account,
                accountDlg: false,
            }
        })
    }

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    //const triedEager = useEagerConnect()

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    //useInactiveListener(!triedEager || !!activatingConnector)

    return (
        <div className={"modal " + (config?.account?.accountDlg ? "modal-open" : "")} style={{ "opacity": "1", "backdropFilter": "blur(16px)" }}>
            <div aria-modal="true" role="dialog" tabIndex="-1" aria-label="dialog" className="modal-box p-0 rounded bg-gradient-to-r from-blue-500 to-green-400">
                <div className="w-full p-px">
                    <div className="flex flex-col h-full w-full bg-gray-900 rounded p-6 overflow-y-auto">
                        <div className="flex flex-row">
                            <div className="flex-1 text-2xl font-thin">Select a Wallet</div>
                            <button className="btn btn-square btn-ghost btn-xs flex-none" onClick={closeDialog}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current text-error">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeeidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col gap-4 mt-4"
                        >
                            {Object.keys(connectorsByName).map(name => {
                                const currentConnector = connectorsByName[name]
                                const activating = currentConnector === activatingConnector
                                const connected = currentConnector === connector
                                const disabled = !!activatingConnector || connected || !!error

                                return (
                                    <div key={name} className="bg-black p-px rounded bg-gradient-to-r from-blue-500 to-green-400">
                                        <button className="btn rounded p-0 w-full"
                                            key={name}
                                            onClick={() => {
                                                if (active) {
                                                    deactivate();
                                                }
                                                setActivatingConnector(currentConnector)
                                                // activate(currentConnector)
                                            }}
                                        >
                                            <div className="flex w-full p-2">
                                                <div className="flex-1 font-thin text-lg text-left">{name}</div>
                                                <div className="flex-0"><Image src={"/" + Icons[name]} height="32px" width="32px" /></div>
                                            </div>
                                        </button></div>
                                )
                            })}
                        </div>

                        <div className="text-center flex flex-col mt-8 font-thin text-sm">
                            <span>New to Blockchain?</span>
                            <a href="https://ethereum.org/wallets/" className="link link-accent" target="_blank">Learn more about Wallets</a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
