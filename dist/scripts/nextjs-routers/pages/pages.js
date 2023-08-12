export const pagesRouterConnectKit = `import '@/styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { createConfig, WagmiConfig } from 'wagmi'
import { mainnet, arbitrum } from '@wagmi/chains'
import { configureChains } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { Navbar } from '@/components/Navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

const alchemyId = process.env.ALCHEMY_API_KEY

const { chains, publicClient } = configureChains(
  [mainnet, arbitrum],
  [alchemyProvider({ apiKey: alchemyId }), publicProvider()],
)

const projectId = 'WalletConnectAPIKey(NeedsReplacing)'

const config = createConfig(
  getDefaultConfig({
    appName: 'Seranged-EVM-Bootstrap',
    walletConnectProjectId: projectId,
    autoConnect: true,
    publicClient,
    alchemyId,
    chains,
  }),
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Seranged-EVM-Bootstrap</title>
        <meta
          name='description'
          content="Seranged EVM Bootstrap"
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      {/* Place inter.className in the classname below to activate the font accross the entire application  */}
      <main className=''>
          <WagmiConfig config={config}>
            <ConnectKitProvider theme="midnight">
              <Navbar />
              <Component {...pageProps} />
            </ConnectKitProvider>
          </WagmiConfig>
      </main>
    </>
  )
}
`;
export const pagesRouterRainbowKit = `
import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { createConfig, WagmiConfig } from 'wagmi'
import { mainnet, arbitrum } from '@wagmi/chains'
import { configureChains } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { Navbar } from '@/components/Navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

const alchemyId = process.env.ALCHEMY_API_KEY

const { chains, publicClient } = configureChains(
  [mainnet, arbitrum],
  [alchemyProvider({ apiKey: alchemyId }), publicProvider()],
)
const projectId = 'WalletConnectAPIKey(NeedsReplacing)'

const { connectors } = getDefaultWallets({
  appName: 'Seranged-EVM-Bootstrap',
  projectId,
  chains,
})

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Seranged-EVM-Bootstrap</title>
        <meta name='description' content='Seranged EVM Bootstrap' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/png' sizes='64x64' href='/favicon.png' />
      </Head>
      {/* Place inter.className in the classname below to activate the font accross the entire application  */}
      <main className=''>
        <WagmiConfig config={config}>
          <RainbowKitProvider chains={chains} modalSize='compact' theme={darkTheme()}>
            <Navbar />
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </main>
    </>
  )
}
`;
