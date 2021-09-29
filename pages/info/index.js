import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import 'tailwindcss/tailwind.css'
import { CountUp } from 'use-count-up'
import NavBar from '../../components/common/navbar'

const TEAM = [
    {
        name: "Peter Wall",
        pic: "https://picsum.photos/id/1005/600/600",
        role: "CEO",
        blurb: `Peter was a member of the management team that founded Argo and has been responsible for day-to-day operations since the company launched.

        He’s passionate about how blockchain and cryptocurrencies can impact people’s everyday lives. Known as a guy who gets things done, Peter’s varied career includes work as a technology entrepreneur, journalist, and filmmaker. He lives in Ottawa, Canada.`,
    },
    {
        name: "Perry Hothi",
        pic: "https://picsum.photos/id/1008/600/600",
        role: "CTO",
        blurb: `Perry leads Argo’s technological development and mining strategies. Before getting into the Blockchain space, Perry was CTO at a major brick-and-clicks retailer in the US, where he led the company’s expansion into 220 locations worldwide. 
        
        Presently, Perry is the driving force behind Argo’s technological operations. He has been in the Blockchain space for over seven years and his insights have allowed Argo to continue to run its agile, low-cost, high-margin operations.`,
    }
]
//
export default function Home() {
    const [deposit, setDeposit] = useState("");
    const [interest, setInterest] = useState("");
    return (
        <div style={{
            backgroundImage: "url('/gradient-bg.jpeg')",
            backgroundRepeat: "none",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundColor: "rgba(0,0,0,0.8)",
            backgroundBlendMode: "darken"
        }} className="h-screen w-screen container-fluid px-0">
            <NavBar icon="/bull.png" desc="Bull Fighter" />
            <div className="text-center hero-content text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">
                        Meet the Team!
                    </h1>
                    <p className="mb-5">
                        We are a multi-talented, dynamic team of NFT, DeFI and blockchain penguins,
                        technologists, entrepreneurs, and engineers from all walks of life.  As we continue to grow,
                        we’re committed to recruiting the brightest top-performers and industry experts to help
                        us continue to bring our vision to life.
                    </p>
                </div>
            </div>
            <div className="flex flex-col">
                {TEAM.map(team=>(<div className="mb-12">
                    <div className="hero bg-base-200">
                        <div className="flex-col hero-content lg:flex-row-reverse lg:mx-32 font-thin">
                            <img src={team.pic} className="max-w-sm rounded-lg shadow-2xl" />
                            <div>
                                <h1 className="mb-5 text-3xl">
                                    {team.name} - {team.role}
                                </h1>
                                <p className="mb-5">
                                    
                                    {team.blurb.split("\n").map(e=><span>{e}<br/></span>)}
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                </div>))}
            </div>

        </div>
    )
}
