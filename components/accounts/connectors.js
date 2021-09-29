import { InjectedConnector } from '@web3-react/injected-connector'
import { OneWalletConnector } from '@harmony-react/onewallet-connector'

export const injected = new InjectedConnector({ supportedChainIds: [1666600000] })
export const onewallet = new OneWalletConnector({ chainId: 1666600000 })
