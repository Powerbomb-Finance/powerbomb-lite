import { ethers } from 'ethers'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css'
import { CountUp } from 'use-count-up'
import FactsCarousel from '../components/carousel/factscarousel'
import NavBar from '../components/common/navbar'
import { main } from '../components/common/strategy/harmony'
import useStickyState from '../components/common/useStickyState'
import Configuration from '../components/deposits/Configuration'
import {AccountContext, connectAccount} from '../components/utils/accounts'
import WalletSelect from '../components/accounts/wallet-select'
import Accounts from '../components/accounts/accounts'
import WithdrawDlg from '../components/actions/WithdrawDlg'
import HarvestDlg from '../components/actions/HarvestDlg'
import AccountDlg from '../components/actions/DepositDlg'
import NetworkProvider from '../components/accounts/network-select'

const FACTS = [
  {
    header:(`Use your stablecoins to earn liquidity mining rewards, that are automatically 
    swapped to a crypto of your choice.`),
    description:"Stack what matters to YOU!"
  },
  {
  header:(<div>What if you could <strong>EARN</strong> interest on your dollars</div>),
  description: "... Except its paid in Bitcoin?",
  total: 105.3462,
  footer: "Bitcoin Paid back to Users"
}, {
  header:(<div>What if you could <strong>CHOOSE</strong> the rewards you're paid out in</div>),
  description: "... Get Bitcoin, Eth or USDT?",
  total: 1005.3462,
  footer: "Ethereum Paid back to Users"
}];
//
export default function Home() {
  const router = useRouter();
  const [apr, setAPR] = useStickyState(null, "apr");
  const [facts, setFacts] = useState(FACTS);
  const {config, setConfig} = useContext(AccountContext);

  console.log(config, setConfig);

  useEffect(e=>{
    if (apr === null || !apr.yearlyAPR) return;
    console.log("> Current APR is", apr);
    FACTS.push({
      header:(<div>Powerbomb helps earn <strong>PASSIVE</strong> income while you sleep</div>),
      description:"... " + apr?.yearlyAPR + " % APR on SushiSwap Harmony One",
      total:2325323,
      footer:"USD in TVL in Powerbomb"
    }); 
  }, [apr]);

  const connect = async () => {
    setConfig({
      ...config,
      account: {
        ...config?.account,
        accountDlg: true,
      }
    }) 
  }

  const showWithdraw = () => {
    setConfig({
        ...config,
        account: {
            ...config?.account,
            withdrawDlg: true
        }
    })
  }

  const showHarvest = () => {
    setConfig({
        ...config,
        account: {
            ...config?.account,
            harvestDlg: true
        }
    })
  }

  console.log(config)
  
  return (
    <div style={{
      backgroundImage: "url('/background.jpeg')",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundSize: "100% 100%",
      backgroundColor: "rgba(0,0,0,0.7)",
      backgroundBlendMode: "darken",
      color: "white"
    }} className="h-screen w-screen container-fluid px-0 backdrop-filter backdrop-blur-lg">
      <WalletSelect/>
      <NetworkProvider/>
      <WithdrawDlg/>
      <HarvestDlg/>
      <AccountDlg/>
      <Accounts/>
      <div className="fixed w-screen bg-black bg-opacity-25 z-5">
        <div className="container-fluid text-center bg-primary font-thin text-dark py-1 mb-2"> Always make sure your browser is on <strong>powerbomb.finance</strong> before interacting with the app! </div>
        <NavBar account={config?.account}/>
      </div>
      <div className="flex lg:flex-row flex-col lg:px-16 lg:pt-28 pt-32 w-screen">
        <div className="flex-1 lg:w-full lg:h-full text-center m-auto lg:visible invisible h-0 w-0">
          <Image src="/logo-isometric.png" width="300px" height="200px"/>
        </div>
        <div className="flex-1">
        <div className="lg:text-4xl lg:text-left text-center text-2xl">
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400">
            Powerbomb Finance</span> <div className="lg:text-xl text-sm">is the leading defi yield optimizer on</div>
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-600"> {config?.supportedNetworks?.find(e=>e.chainId === config?.selectedNetwork)?.displayName || "Harmony"} Blockchain</span>. 

        </div>
        <FactsCarousel facts={facts}/>
        
        </div>
      </div>

      <div className=" flex flex-col w-screen items-center overflow-y-scroll z-10">
        <div className="flex flex-row gap-4 mb-2 flex-wrap justify-center">
          {/* <div className="flex gap-4">
          {config?.account?.account && <button onClick={e=>showHarvest()} className="btn bg-gradient-to-r from-purple-500 to-purple-600 ring-red-500 ring-opacity-25 hover:pulse hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-600 md:btn-md btn-sm">Harvest</button>}
          {config?.account?.account && <button onClick={e=>showWithdraw()} className="btn bg-gradient-to-r from-purple-500 to-purple-600 ring-red-500 ring-opacity-25 hover:pulse hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-600 md:btn-md btn-sm">Withdraw</button>}
          </div> */}
          {!config?.account?.account && <button onClick={connect} className="btn bg-gradient-to-r from-blue-600 to-red-600 ring-2 hover:bg-gradient-to-r hover:from-red-500 hover:to-yellow-600 ring-gray-500 ring-opacity-25 md:btn-md btn-sm">Connect Wallet</button>}
          <button className="btn btn-ghost md:btn-md btn-sm">Learn More</button>
        </div>
        <div className="w-full md:px-16">
          <Configuration account={config?.account} />
        </div>
        

        {/** todo - attributions for pictures */}
      </div>
    </div>
  )
}
