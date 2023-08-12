export const pagesRouterConnectKit = `import '@/styles/styles.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { createConfig, WagmiConfig } from 'wagmi'
import { mainnet, arbitrum } from '@wagmi/chains'
import { configureChains, mainnet } from '@wagmi/core'
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

const config = createConfig(
  getDefaultConfig({
    appName: 'Seranged-EVM-Bootstrap',
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_API_KEY,
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
          content="Zoom Zoom"
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
`
export const pagesRouterRainbowKit = `
import '@/styles/styles.css'
import '@rainbow-me/rainbowkit/styles.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, optimism } from '@wagmi/chains'
import { configureChains, mainnet } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { getDefaultWallets, midnightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { Navbar } from '@/components/Navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

const alchemyId = process.env.ALCHEMY_API_KEY

const { chains, publicClient } = configureChains(
  [mainnet, optimism, arbitrum],
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
        <meta name='description' content='Zoom Zoom' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      {/* Place inter.className in the classname below to activate the font accross the entire application  */}
      <main className=''>
        <WagmiConfig config={config}>
          <RainbowKitProvider chains={chains} modalSize='compact' theme={midnightTheme()}>
            <Navbar />
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </main>
    </>
  )
}
`
