export const appRouterRainbowKit = `'use client'
import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import React from 'react'
import { Inter } from 'next/font/google'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, arbitrum } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { Navbar } from '@/components/Navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

// // WAGMI Chains
const { publicClient, chains } = configureChains(
  [mainnet, arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()],
)

const projectId = 'WalletConnectAPIKey(NeedsReplacing)'

const { connectors } = getDefaultWallets({
  appName: 'Serannged-EVM-Bootstrap',
  projectId,
  chains,
})

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <head>
        <title>Seranged EVM Bootstrap</title>
        <meta name='description' content='Seranged EVM Bootstrap' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/png' sizes='64x64' href='/favicon.png' />
      </head>
      <html lang='en'>
      {/* Place inter.className in the classname below to activate the font accross the entire application  */}
        <body className=''>
          <WagmiConfig config={config}>
            <RainbowKitProvider chains={chains} modalSize='compact' theme={darkTheme()}>
              <Navbar />
              {children}
            </RainbowKitProvider>
          </WagmiConfig>
        </body>
      </html>
    </>
  )
}
`;
export const appRouterConnectKit = `'use client'
import '@/styles/globals.css'
import React from 'react'
import { Inter } from 'next/font/google'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, arbitrum } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { Navbar } from '@/components/Navbar/Navbar'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'

const inter = Inter({ subsets: ['latin'] })

const alchemyId = process.env.ALCHEMY_API_KEY

// // WAGMI Chains
const { publicClient, chains } = configureChains(
  [mainnet, arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <head>
        <title>Seranged EVM Bootstrap</title>
        <meta name='description' content='Seranged EVM Bootstrap' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/png' sizes='64x64' href='/favicon.png' />
      </head>
      <html lang='en'>
      {/* Place inter.className in the classname below to activate the font accross the entire application  */}
        <body className=''>
          <WagmiConfig config={config}>
            <ConnectKitProvider theme='midnight'>
              <Navbar />
              {children}
            </ConnectKitProvider>
          </WagmiConfig>
        </body>
      </html>
    </>
  )
}
`;
