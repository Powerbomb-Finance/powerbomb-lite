
import Image from 'next/image';
import { useSnackbar } from 'notistack'
import { useContext, useEffect, useState } from 'react'
import { getDepositBalances } from '../common/strategy/harmony';
import { AccountContext, truncateAccount } from '../utils/accounts'

//
export default function DepositView({showFilter = e=>e}) {
    const { config, setConfig } = useContext(AccountContext);
    const [results, setResults] = useState(null);
    const [retrieveResult, setRetrieving] = useState(false);

    useEffect(e => {
        if (!config?.account?.account) return;
        if (retrieveResult) return;

        setRetrieving(true);

        const fn = async () => {
            const result = await getDepositBalances({
                strategy: "harmony",
                provider: config?.account?.provider,
                account: config?.account?.account
            });
            console.log("Result is", result);
            setResults(showFilter(result));
            setRetrieving(false);
        }
        fn();

    }, [config?.account?.account]);

    return (
        <div className="flex flex-row gap-2 flex-none m-2 mr-6 place-self-end">
            {
                results?.map((result, i) => {
                    // if (result.deposited <= 0) return <></>;

                    return <div key={i} className="flex-none flex flex-row gap-2">
                        <div className="flex-none rounded">
                            <div className=" w-10 h-10">
                                <Image src={`/tokens/${result.token}.jpeg`} height="40px" width="40px"></Image>
                            </div>
                        </div>
                        <div className="flex-none flex flex-col">
                            <div className="flex-1 text-sm font-thin">Deposit: {result.deposited}</div>
                            <div className="flex-1 text-sm font-thin">Harvest: {result.harvest}</div>
                        </div>
                    </div>
                })
            }

        </div>
    )
}


