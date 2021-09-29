import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css'
import DepositView from '../accounts/deposits'
import { getDepositBalances } from '../common/strategy/harmony'
import useStickyState from '../common/useStickyState'
import { getAPR, getAvailableBalances, getDefaultProvider } from '../common/web3Layer'
import { AccountContext } from '../utils/accounts'

const supportedTokens = [
    "usdt", "usdc", "lp"
];
//
function Configuration({ account }) {
    const { config, setConfig } = useContext(AccountContext);
    const [deposit, setDeposit] = useState("");
    const [interest, setInterest] = useState("");
    const [tokenBalance, setTokenBalance] = useState(null);
    const [apr, setAPR] = useStickyState(null, "apr");

    const [loadingBalance, setLoading] = useState(false);
    const [powerBombValue, setValue] = useState(0);

    const [results, setResults] = useState(null);
    const [retrieveResult, setRetrieving] = useState(false);

    const retrieveBalance = () => {
        if (!config?.account?.account) return;
        if (retrieveResult) return;

        setRetrieving(true);

        const fn = async () => {
            const result = await getDepositBalances({
                strategy: "harmony",
                provider: config?.account?.provider,
                account: config?.account?.account
            });
            const res = {};
            result.map(token => res[token.token] = token);
            console.log("Balance is retrieved", res)
            setResults(res);
            setRetrieving(false);
        }
        fn();

    }

    useEffect(e => {
        if (config?.account?.depositDlg || config?.account?.withdrawDlg) {
            return;
        }
        console.log("Withdraw / Deposit being called, lets retrieve balance");
        setValue(0);
        retrieveBalance();
    }, [config?.account?.account, config?.account?.depositDlg, config?.account?.withdrawDlg]);

    useEffect(e => {
        if (config?.account?.depositDlg || config?.account?.withdrawDlg || config?.account?.harvestDlg) {
            return;
        }
        console.log(account?.account);
        if (!account?.account) return;
        // get balance of all tokens we support!
        console.log(account);
        const fn = async () => {
            setLoading(true);
            const result = await getAvailableBalances({
                strategy: "harmony",
                provider: account?.provider,
                account: account?.account
            });
            setTokenBalance(result);
            console.log(result);
            setLoading(false);
        }
        fn();
    }, [account?.account, config?.account?.depositDlg, config?.account?.withdrawDlg, config?.account?.harvestDlg])


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

    const canPowerbomb = () => {
        console.log(config?.account);

        if (!config?.account) return false;

        if (powerBombValue <= 0) return false; // invalid
        if (!interest || interest.length === 0) return false;
        if (!deposit || deposit.length === 0) return false;
        if (!isValid()) return false; // not valid

        console.log(tokenBalance, powerBombValue);

        return true;
    }

    const powerbomb = async () => {
        if (!config?.account) {
            setConfig({
                ...config,
                account: {
                    ...config?.account,
                    accountDlg: true
                }
            });
            return;
        }
        else {
            if (powerBombValue <= 0) return; // invalid
            if (!interest || interest.length === 0) return;
            if (!deposit || deposit.length === 0) return;
            if (!isValid()) return; // not valid

            setConfig({
                ...config,
                account: {
                    ...config?.account,
                    depositDlg: true,
                    depositAmt: powerBombValue,
                    inputToken: deposit,
                    interestToken: interest,
                }
            });
            return;
        }
    }

    useEffect(e => {

        const fn = async () => {
            const apr = await getAPR({ provider: getDefaultProvider("harmony", "mainnet"), strategy: "harmony" })
            console.log(apr);
            setAPR(apr);
        }
        fn();
    }, []);

    const isValid = () => {
        return (tokenBalance && tokenBalance[deposit] && !isNaN(+tokenBalance[deposit].balance) && powerBombValue <= +tokenBalance[deposit].balance && powerBombValue >= 0)
    }

    const selectionsMade = () => {
        return (isValid() && powerBombValue > 0 && interest.length > 0);
    }

    
    console.log(config, config?.supportedNetworks?.find(e=>e.chainId === config?.selectedNetwork)   );

    if (config?.unsupportedNetwork) {
        return (<div className="flex items-center w-full px-4 py-10 bg-cover card bg-base-200" style={{"backgroundImage": "url('gradient-bg.jpeg')"}}>
        <div className="card glass lg:card-side text-neutral-content">
          <figure className="p-6">
            <Image src="/logo.png" class="rounded-lg shadow-lg" width="300px" height="200px"/>
          </figure> 
          <div className="max-w-md card-body">
            <h2 className="card-title">Chain Integration in Progress</h2> 
            <p>Support for <span className="bg-gray-800 p-2 rounded-lg">{config?.supportedNetworks?.find(e=>e.chainId === config?.selectedNetwork)?.displayName}</span> is being developed. Follow us on Twitter for updates!</p> 
            <div className="card-actions">
              <a className="btn glass rounded-full" href="https://twitter.com/powerbombfi?s=09" target="_blank">Follow Us</a>
            </div>
          </div>
        </div>
      </div>
      )
    }

    return (
        <div className="md  :flex md:flex-row md:gap-12 flex flex-col gap-3">
            <div className="bg-gray-900 md:p-px p-px w-full md:gap-1 gap-1 p-px bg-gradient-to-r from-blue-400 to-green-400 rounded">
                <div className="flex flex-col bg-black rounded h-full">
                    <div className="text-center">Step 1 - Deposit Dollars!</div>
                    <div className="text-center">I want to deposit ...</div>

                    <div className="flex flex-col gap-2 my-2 mx-4 p-1 bg-gray-800 rounded">
                        {supportedTokens.map(token => {
                            return (<div key={token} className={"bg-black p-px rounded bg-gradient-to-r " + (deposit === token ? "from-red-400 to-yellow-400" : "from-gray-300 to-gray-600")}>
                                <button className="btn rounded p-0 w-full bg-gray-800"
                                    key={token}
                                    onClick={() => {
                                        setDeposit(token)
                                    }}
                                >
                                    <div className="flex w-full p-2">
                                        <div className="flex-1 font-thin text-lg text-left">{token}</div>
                                        <div className="flex-1 text-right px-2">{tokenBalance && (!isNaN(tokenBalance[token]?.balance)) && "" + tokenBalance[token]?.balance.toFixed(2) || "-Connect-"}</div>
                                        <div className="flex-0"><Image src={"/tokens/" + token + ".jpeg"} height="32px" width="32px" /></div>
                                    </div>
                                </button></div>);
                        })}
                    </div>
                    <div className="form-control flex-1 p-1 flex flex-row mx-4">
                        {deposit.length > 0 && <div className="avatar">
                            <div className="m-1 w-10 h-10 mask mask-squircle">
                                {deposit.length > 0 && <Image src={"/tokens/" + deposit + ".jpeg"} alt="token" width="40px" height="40px"></Image>}
                            </div>
                        </div>}

                        <div className="relative flex-1">
                            <div data-tip={!isValid() && tokenBalance && tokenBalance[deposit] ? "Invalid amount entered" : ""} className={"w-full z-40 " + (!isValid() && tokenBalance && tokenBalance[deposit] ? "tooltip tooltip-secondary tooltip-bottom tooltip-open" : "")}>
                                <input type="number" placeholder="Search" className={"input input-bordered w-full " + (!isValid() && tokenBalance && tokenBalance[deposit] ? " input-error" : "")} value={powerBombValue} onChange={e => setValue(e.target.value)} />
                            </div>
                            <button className="absolute top-0 right-0 rounded-l-none btn z-50" onClick={e => setValue(+tokenBalance[deposit].balance)} disabled={loadingBalance || deposit.length === 0 || !tokenBalance || isNaN(tokenBalance[deposit]?.balance)}>max</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 lg:p-px p-px w-full lg:gap-1 gap-1 p-px bg-gradient-to-r from-blue-400 to-green-400 rounded">
                <div className="flex flex-col bg-black rounded h-full">
                    <div className="text-center">Step 2 - Select Interest!</div>
                    <div className="text-center">I want to earn ...</div>
                    <div className="flex flex-col gap-2 my-2 mx-4 p-1 bg-gray-800 rounded">
                        {["btc", "eth", "mixed"].map(token => {
                            return (<div key={token} className={"bg-black p-px rounded bg-gradient-to-r " + (interest === token ? "from-red-400 to-yellow-400" : "from-gray-300 to-gray-600")}>
                                <button className="btn rounded p-0 w-full bg-gray-800"
                                    key={token}
                                    onClick={() => {
                                        setInterest(token)
                                    }}
                                >
                                    <div className="flex w-full p-2">
                                        <div className="flex-0 font-thin text-lg text-left">{token}</div>
                                        {token === "mixed" ? <div className="flex-0 text-left px-2 font-thin text-xs"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 rounded bg-black hover:bg-purple-600 transform rotate-90"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg></div> : null}
                                        {token === "mixed" ? <div className="flex-1 text-right px-2 font-thin text-xs">Distribute</div> : <div className="flex-1 text-right px-2 font-thin text-xs">{results && results[token] ? `Dep: ${Math.round(results[token].deposited * 1000)/1000} / Harvest: ${Math.round(results[token].harvest * 1000) / 1000}` : "-Connect-"}</div>}
                                        {token !== "mixed" && <div className="flex-0"><Image src={"/tokens/" + token + ".jpeg"} height="32px" width="32px" /></div>}
                                        {token === "mixed" && <div className="flex-0"><Image src={"/tokens/" + token + ".png"} height="32px" width="32px" /></div>}
                                    </div>
                                </button></div>);
                        })}
                    </div>
                    <div className="text-center text-sm">Yield will be converted to <span className="text-red-500">{interest}</span></div>
                    <div className="mx-auto flex gap-1 my-1">
                        {config?.account?.account && <button onClick={e => showHarvest()} className="btn bg-gradient-to-r from-purple-500 to-purple-600 ring-red-500 ring-opacity-25 hover:pulse hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-600 btn-sm">Harvest</button>}
                        {config?.account?.account && <button onClick={e => showWithdraw()} className="btn bg-gradient-to-r from-purple-500 to-purple-600 ring-red-500 ring-opacity-25 hover:pulse hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-600 btn-sm">Withdraw</button>}
                    </div>
                    
                </div>
            </div>
            <div className="bg-gray-900 lg:p-px p-px w-full lg:gap-1 gap-1 p-px bg-gradient-to-r from-blue-400 to-green-400 rounded">
                <div className="flex flex-col bg-black rounded h-full">
                    <div className="text-center">Step 3 - Powerbomb!</div>
                    <div className="flex flex-col gap-2 mx-4 bg-gradient-to-r from-gray-700 to-gray-900 p-2 rounded">
                        <div className="flex-1 flex flex-row gap-4 mx-auto">
                            <Image className="rounded-xl" src={`/tokens/${deposit}.jpeg`} width="80px" height="80px" />
                            <Image src={`/convert.png`} width="80px" height="80px" />
                            <Image className="rounded-xl" src={interest === "mixed" ? `/tokens/${interest}.png` : `/tokens/${interest}.jpeg`} width="80px" height="80px" />
                        </div>
                        <div className="flex flex-row mx-auto">
                            <div className="text-3xl text-center">
                                {powerBombValue}
                            </div>
                            {deposit}
                        </div>
                    </div>
                    <div className="font-thin text-center text-sm">
                        You are depositing <span className="bg-black rounded font-bold p-1">{powerBombValue} {deposit}</span> for Interest paid in <b>{interest?.length > 0 ? interest : "?"}</b>
                    </div>
                    <div className="avatar placeholder flex-none lg:m-auto my-auto">
                        <div onClick={powerbomb} className={"cursor-pointer text-neutral-content md:rounded-full rounded md:w-28 md:h-28 h-12 w-full flex flex-col " + (canPowerbomb() ? "bg-gradient-to-r from-red-500 to-yellow-600 hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-600 " : "bg-gradient-to-r from-gray-500 to-gray-600 ")}>
                            <span className="md:text-lg text-sm text-center animate-pulse">
                                {apr && (apr?.yearlyAPR + "% APR") || "Loading"}
                            </span>
                            <span className="md:text-3xl font-extrabold">
                                GO
                    </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Configuration;

// <div className="bg-gray-700 rounded flex-1 flex flex-row">
//                     <div className="flex flex-row flex-1">
//                         <div className="dropdown dropdown-top">
//                             <div tabIndex="0" className="m-1 btn">Deposit</div>
//                             <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-64">
//                                 <li>
//                                     <a className={"flex flex-row " + (tokenBalance && tokenBalance['usdt']?.balance === 0 && " opacity-25")} onClick={e => setDeposit("usdt")}><Image className="rounded" alt="usdt token" src="/tokens/usdt.jpeg" width="48px" height="48px" /> <span>1USDT</span></a>
//                                 </li>
//                                 <li>
//                                     <a className={"flex flex-row " + (tokenBalance && tokenBalance['usdc']?.balance === 0 && " opacity-25")} onClick={e => setDeposit("usdc")}><Image className="rounded" alt="usdc token" src="/tokens/usdc.jpeg" width="48px" height="48px" /> 1USDC</a>
//                                 </li>
//                                 <li>
//                                     <a className={"flex flex-row " + (tokenBalance && tokenBalance['lp']?.balance === 0 && " opacity-25")} onClick={e => setDeposit("lp")}><Image className="rounded" alt="usdt token" src="/tokens/lp.jpeg" width="48px" height="48px" /> 1USDT-1USDC-SP</a>
//                                 </li>
//                             </ul>
//                         </div>
//                         {deposit.length > 0 && <div className="avatar">
//                             <div className="m-2 w-10 h-10 mask mask-squircle">
//                                 {deposit.length > 0 && <Image src={"/tokens/" + deposit + ".jpeg"} alt="token" width="40px" height="40px"></Image>}
//                             </div>
//                         </div>}
//                         {deposit.length > 0 && <div className="m-1">
//                             <div className="font-thin text-sm">Balance:</div>
//                             {!loadingBalance && <div className="text-lg">{tokenBalance && (!isNaN(tokenBalance[deposit].balance)) && "" + tokenBalance[deposit].balance || "-Connect-"}</div>}
//                             {loadingBalance && <button className="btn btn-shadow btn-xs bg-gray-700 border-0 w-full loading"></button>}
//                         </div>}
//                     </div>
//                     <div className="flex flex-1">
                        // <div className="form-control flex-1 p-1">
                        //     <div className="relative">
                        //         <div data-tip={!isValid() && tokenBalance && tokenBalance[deposit] ? "Invalid amount entered" : ""} className={"w-full z-40 " + (!isValid() && tokenBalance && tokenBalance[deposit] ? "tooltip tooltip-secondary tooltip-bottom tooltip-open" : "")}>
                        //             <input type="number" placeholder="Search" className={"input input-bordered w-full " + (!isValid() && tokenBalance && tokenBalance[deposit] ? " input-error" : "")} value={powerBombValue} onChange={e => setValue(e.target.value)} />
                        //         </div>
                        //         <button className="absolute top-0 right-0 rounded-l-none btn z-50" onClick={e => setValue(+tokenBalance[deposit].balance)} disabled={loadingBalance || deposit.length === 0 || !tokenBalance || isNaN(tokenBalance[deposit]?.balance)}>max</button>
                        //     </div>
                        // </div>
//                         {/* <input type="number" placeholder="Amount" className="flex-1 m-1 input input-bordered" /> */}
//                     </div>
//                 </div>

//                 {/* <button className="btn bg-gray-700 m-auto btn-circle"><Image src="/mask.png" width="36px" height="36px"></Image></button> */}
//                 <div className="avatar placeholder flex-none lg:m-auto ">
//                     <div onClick={powerbomb} className="cursor-pointer text-neutral-content md:rounded-full rounded md:w-28 md:h-28 h-12 w-full bg-gradient-to-r from-red-500 to-yellow-600 flex flex-col hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-600">
//                         <span className="md:text-lg text-sm text-center animate-pulse">
//                             {apr && (apr?.yearlyAPR + "% APR") || "Loading"}
//                         </span>
//                         <span className="md:text-lg font-thin animate-bounce">
//                             POWERBOMB
//                     </span>
//                     </div>
//                 </div>
//                 <div className="bg-gray-700 rounded flex-1 flex flex-row">
//                     <div className="flex flex-row flex-1">
//                         <div className="bg-gray-700 flex-none">
//                             <div className="dropdown dropdown-top">
//                                 <div tabIndex="0" className="m-1 btn">Interest</div>
//                                 <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
//                                     <li>
//                                         <a><Image onClick={e => setInterest("btc")} className="rounded" alt="btc token" src="/tokens/btc.jpeg" width="48px" height="48px" /> 1WBTC</a>
//                                     </li>
//                                     <li>
//                                         <a><Image onClick={e => setInterest("eth")} className="rounded" alt="eth token" src="/tokens/eth.jpeg" width="48px" height="48px" /> 1ETH</a>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>

//                         <div className="avatar flex-1">
//                             <div className="m-2 w-10 h-10 mask mask-squircle">
//                                 {interest.length > 0 && <Image src={"/tokens/" + interest + ".jpeg"} alt="token" width="40px" height="40px"></Image>}
//                             </div>
//                         </div>

//                     </div>
//                     <DepositView />

//                 </div>
//             </div>