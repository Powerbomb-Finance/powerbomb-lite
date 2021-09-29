import { createContext } from 'react';

export const AccountContext = createContext({
  config: {
    account: null,
    accountDlg: false,
    accountDetails: false,
    provider: null,
    supportedNetworks: []
  },
  update: () => {}
});

export const truncateAccount = (config) => {
  const { account } = config;
  if (!account) return "";
  return account?.account?.substring(0, 5) + "..." + account?.account?.substring(account?.account?.length - 3)
}