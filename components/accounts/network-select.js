
const supportedWallets = ["Harmony", "Ethereum", "Polygon (Matic)", "Fantom",
    "Arbitrum One", "OKEx", "HECO", "BSC", "xDai", "Avalanche", "Celo", "Moonriver"];


const supportedWalletsName = ["Harmony Mainnet Shard 0", "Ethereum Mainnet", "Matic(Polygon) Mainnet",
    "Fantom Opera", "Arbitrum One", "OKExChain Mainnet", "Huobi ECO Chain Mainnet",
    "Binance Smart Chain Mainnet", "xDAI Chain", "Avalanche Mainnet", "Celo Mainnet", "Moonriver"];

const networkIcon = ["harmony.jpeg", "ethereum.jpeg", "polygon.jpeg", "fantom.jpeg", "arbitrum.jpeg",
    "okex.jpeg", "heco.jpeg", "bsc.jpeg", "xdai.jpeg", "avalanche.jpeg", "celo.jpeg", "moonriver.jpeg"]

//   

//   

import React, { useContext, useEffect, useState } from 'react'
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then(res => res.json())
//import { useEagerConnect, useInactiveListener } from '../hooks'
import {
    injected,
    onewallet
} from './connectors'
import Image from 'next/image'
import { AccountContext } from '../utils/accounts'
import { ethers } from 'ethers';

export default function NetworkProvider({ openDialog }) {
    return (
        <NetworkSelect openDialog={openDialog} />
    )
}

function NetworkSelect() {
    const { data, error } = useSWR('https://chainid.network/chains.json', fetcher)
    const { config, setConfig } = useContext(AccountContext);

    const closeDialog = () => {
        setConfig({
            ...config,
            account: {
                ...config?.account,
                networkDlg: false,
            }
        })
    }

    const addNetwork = async (chain) => {
        const chainId = chain.name.indexOf ("Ethereum") >= 0 ? "0x01" : (ethers.utils.hexlify(+chain.chainId)).trim();
        const params = [{
            chainId: chainId,
            chainName: chain.name,
            nativeCurrency: chain.nativeCurrency,
            rpcUrls: chain.rpc.filter(e=>e.indexOf("{")<0),
            blockExplorerUrls: chain.explorers?.map(e=>e.url) || null
        }]

        console.log(params);
    
        try {
            const result = await window.ethereum.request({ method: 'wallet_addEthereumChain', params });
            updateNetworkChanged(chain);
            console.log(result);
        }
        catch (e) {
            // ignore!
            updateNetworkChanged(chain);
        }
    }

    const updateNetworkChanged = (chain) => {
        setConfig({
            ...config,
            account: {
                ...config?.account,
                networkDlg: false,
            },
            unsupportedNetwork: chain.chainId !== 1666600000,
            selectedNetwork: chain.chainId
        })
    }

    useEffect(e => {
        console.log(data);
        if (data) {
            setConfig({
                ...config,
                supportedNetworks: data.filter(e => supportedWalletsName.indexOf(e.name) >= 0).map(e => {
                    e.displayName = supportedWallets[supportedWalletsName.indexOf(e.name)];
                    return e;
                })
            });
        }
    }, [data]);

    if (!data) {
        return <></>
    }

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    //const triedEager = useEagerConnect()

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    //useInactiveListener(!triedEager || !!activatingConnector)

    return (
        <div className={"modal " + (config?.account?.networkDlg ? "modal-open" : "")} style={{ "opacity": "1", "backdropFilter": "blur(16px)" }}>
            <div aria-modal="true" role="dialog" tabIndex="-1" aria-label="dialog" className="modal-box p-0 rounded bg-gradient-to-r from-blue-500 to-green-400">
                <div className="w-full p-px">
                    <div className="flex flex-col h-full w-full bg-gray-900 rounded p-6 overflow-y-auto">
                        <div className="flex flex-row">
                            <div className="flex-1 text-2xl font-thin">Select a Network</div>
                            <button className="btn btn-square btn-ghost btn-xs flex-none" onClick={closeDialog}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current text-error">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeeidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-6 mt-6">
                            {config?.supportedNetworks?.map((network, index) => (
                                <div key={index} className="bg-black p-px rounded bg-gray-400">

                                    <button className="btn rounded p-0 w-full"
                                        key={index}
                                        onClick={() => {
                                            addNetwork(network)
                                        }}
                                    >
                                        <div className="flex w-full p-2">
                                            <div className="flex-1 font-thin text-lg text-left">{network.displayName}</div>
                                            <div className="flex-0"><Image src={"/supported/" + networkIcon[supportedWalletsName.indexOf(network.name)]} height="32px" width="32px" /></div>
                                        </div>
                                    </button>
                                </div>
                            ))}
                           
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
