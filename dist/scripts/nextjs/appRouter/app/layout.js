'use client';
import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import React from 'react';
import { Inter } from 'next/font/google';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { createPublicClient, http } from 'viem';
import { arbitrum, mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import Navbar from '@/components/Navbar';
const inter = Inter({ subsets: ['latin'] });
// // WAGMI Chains
const { chains } = configureChains([mainnet, arbitrum], [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]);
const projectId = 'WalletConnectID(NeedsReplacing)';
const { connectors } = getDefaultWallets({
    appName: 'EVM-FE-Boilerplate',
    projectId,
    chains,
});
const config = createConfig({
    autoConnect: true,
    connectors,
    publicClient: createPublicClient({
        chain: mainnet,
        transport: http(),
    }),
});
export default function RootLayout({ children }) {
    return (React.createElement(React.Fragment, null,
        React.createElement("head", null,
            React.createElement("title", null, "EVM-FE-Boilerplate"),
            React.createElement("meta", { name: 'description', content: 'EVM-FE-Boilerplate' }),
            React.createElement("meta", { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
            React.createElement("link", { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon.png' })),
        React.createElement("html", { lang: 'en' },
            React.createElement("body", { className: `${inter.className}` },
                React.createElement(WagmiConfig, { config: config },
                    React.createElement(RainbowKitProvider, { chains: chains, modalSize: 'compact', theme: darkTheme() },
                        React.createElement(Navbar, null),
                        children))))));
}
