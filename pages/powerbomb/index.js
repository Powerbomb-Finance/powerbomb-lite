import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css'
import { CountUp } from 'use-count-up'
import Accounts from '../../components/accounts/accounts'
import WalletProvider from '../../components/accounts/wallet-select'
import AccountDlg from '../../components/actions/DepositDlg'
import NavBar from '../../components/common/navbar'
import { getAllPoolInUSD, getPendingPowerbombRewards, harvestRewards } from '../../components/common/strategy/harmony'
import { AccountContext } from '../../components/utils/accounts'

//
export default function Home() {
    const { config, setConfig } = useContext(AccountContext);
    const [amount, setAmount] = useState({});
    const [activeDeposits, setActiveDeposits] = useState(0)
    const [refresh, setRefresh] = useState(false);

    const connect = async () => {
        setConfig({
            ...config,
            account: {
                ...config?.account,
                accountDlg: true,
            }
        })
    }

    const harvest = async () => {
        const result = confirm("Are you sure you want to harvest?")
        console.log(result);

        if (result) {
            const r = await harvestRewards({
                strategy: "harmony",
                provider: config?.account?.provider,
                account: config?.account?.account
            });

            alert("Result is " + result);
            console.log(result);

            setRefresh(!refresh);
            
        }
    }

    useEffect(e => {
        if (!config?.account?.account) {
            return;
        }
        // get amount to be harvested
        const fn = async () => {
            const res = await getPendingPowerbombRewards({
                strategy: "harmony",
                provider: config?.account?.provider,
                account: config?.account?.account
            });

            const deposits = await getAllPoolInUSD({
                strategy: "harmony",
                provider: config?.account?.provider,
                account: config?.account?.account
            });

            console.log(res);
            console.log(deposits);
            setAmount(res);
            setActiveDeposits(deposits);

        }
        fn();

    }, [config?.account?.account, refresh]);



    return (
        <div style={{
            backgroundImage: "url('/gradient-bg.jpeg')",
            backgroundRepeat: "none",
            backgroundPosition: "center",
            backgroundAttackment: "fixed",
            backgroundSize: "cover",
            backgroundColor: "rgba(0,0,0,0.6)",
            backgroundBlendMode: "darken"
        }} className="h-screen w-screen container-fluid px-0">
            <NavBar icon="/bull.png" desc="Bull Fighter" account={config?.account} />
            <WalletProvider />
            <Accounts />
            <div className="card bordered bg-black bg-opacity-75 lg:w-1/2 m-auto sm:w-full">
                <div className="card-body w-full">
                    <h1>Harvest Function for generating and disbursement of awards</h1>
                    {!config?.account?.account && <button onClick={connect} className="btn bg-gradient-to-r from-blue-600 to-red-600 ring-2 hover:bg-gradient-to-r hover:from-red-500 hover:to-yellow-600 ring-gray-500 ring-opacity-25 md:btn-md btn-sm">Connect Wallet</button>}

                    <div>
                        Total Rewards available:
                    </div>
                    <div>Sushi: {amount?.sushi}</div>
                    <div>One: {amount?.one}</div>


                    <div>
                        Total USD Deposited:{activeDeposits.toString()}</div>


                    <button className="btn btn-primary" disabled={!config?.account?.account} onClick={harvest}>Harvest</button>

                </div>
            </div>
        </div>
    )
}
