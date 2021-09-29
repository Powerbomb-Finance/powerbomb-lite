import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import 'tailwindcss/tailwind.css'
import { CountUp } from 'use-count-up'
import NavBar from '../../components/common/navbar'

//
export default function Home() {
    const [deposit, setDeposit] = useState("");
    const [interest, setInterest] = useState("");
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
            <NavBar icon="/bull.png" desc="Bull Fighter" />
            <div className="card bordered bg-black bg-opacity-75 lg:w-1/2 m-auto sm:w-full">
                <div className="card-body w-full">
                    <div className="flex flex-col">
                        <div className="flex flex-row w-full items-center">
                            <div className="m-auto">
                                <div className="stats text-center">
                                    <div className="stat bg-opacity-0 pr-0">
                                        <div className="stat-value text-dark text-6xl">
                                            <CountUp isCounting end={69.420} duration={3.2} thousandsSeparator="," />
                                        </div>
                                        <div className="stat-desc text-dark">BTC you have Received</div>
                                    </div>
                                </div>

                                <div className="stats text-center">
                                    <div className="stat bg-opacity-0 pr-0">
                                        <div className="stat-value text-dark text-6xl">
                                            <CountUp isCounting end={420.69} duration={3.2} thousandsSeparator="," />
                                        </div>
                                        <div className="stat-desc text-dark">ETH you have Received</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="m-auto"><Image src="/logo.png" alt="logo" width="240px" height="130px" /></div>

                        <div className="bg-gray-900 flex flex-col p-4 w-full gap-4">
                            <div className="bg-gray-700 rounded flex">
                                <div className="dropdown dropdown-top">
                                    <div tabIndex="0" className="m-1 btn">Deposit</div>
                                    <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                                        <li>
                                            <a onClick={e=>setDeposit("usdt")}><Image className="rounded" alt="usdt token" src="/tokens/usdt.jpeg" width="48px" height="48px" /> 1USDT</a>
                                        </li>
                                        <li>
                                            <a onClick={e=>setDeposit("usdc")}><Image className="rounded" alt="usdc token" src="/tokens/usdc.jpeg" width="48px" height="48px" /> 1USDC</a>
                                        </li>
                                        <li>
                                            <a onClick={e=>setDeposit("usdt")}><Image className="rounded" alt="usdt token" src="/tokens/usdt.jpeg" width="48px" height="48px" /> 1USDT-1USDC-SP</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    {deposit.length > 0 && <Image src = {"/tokens/" + deposit + ".jpeg"} alt="token" width="48px" height="48px"></Image>}
                                </div>
                                <input type="text" placeholder="Amount" className="input input-bordered"></input>
                            </div>

                            <button className="btn bg-gray-700 m-auto btn-circle">%</button>
                            <div className="bg-gray-700 rounded">
                                <div className="bg-gray-700">
                                    <div className="dropdown dropdown-top">
                                        <div tabIndex="0" className="m-1 btn">Interest</div>
                                        <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                                            <li>
                                                <a><Image className="rounded" alt="btc token" src="/tokens/btc.jpeg" width="48px" height="48px" /> 1WBTC</a>
                                            </li>
                                            <li>
                                                <a><Image className="rounded" alt="eth token" src="/tokens/eth.jpeg" width="48px" height="48px" /> 1ETH</a>
                                            </li>
                                            <li>
                                                <a><Image className="rounded" alt="usdc token" src="/tokens/usdc.jpeg" width="48px" height="48px" /> 1USDC</a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="m-auto">
                            <button className="btn btn-primary mr-4 mt-4">Approve</button>
                            <button className="btn bg-gradient-to-r from-red-500 to-yellow-600 ring-red-500 ring-opacity-25">Powerbomb</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
