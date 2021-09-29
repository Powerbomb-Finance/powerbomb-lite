import { SnackbarProvider } from 'notistack';
import { useMemo, useState } from 'react'
import { AccountContext } from '../components/utils/accounts'

function MyApp({ Component, pageProps }) {
  const [config, setConfig] = useState({});

  const value = useMemo(
    () => ({ config, setConfig }),
    [config]
  )

  return (<SnackbarProvider maxSnack={3}>
    <AccountContext.Provider value={value}>
      <Component {...pageProps}>
      </Component>
    </AccountContext.Provider>
  </SnackbarProvider>);
}

export default MyApp
