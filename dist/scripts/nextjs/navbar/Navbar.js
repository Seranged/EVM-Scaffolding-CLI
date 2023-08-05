'use client';
import React from 'react';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
const Navbar = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'fixed right-5 top-4 z-50 md:right-10 md:top-10' },
            React.createElement(ConnectButton.Custom, null, ({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
                const connected = mounted && account && chain;
                return (React.createElement(React.Fragment, null,
                    !mounted && (React.createElement("div", { className: 'rounded-xl border text-center border-slate-500 bg-gradient-to-b from-zinc-800/30 to-zinc-500/50 p-2' }, "Initalizing...")),
                    React.createElement("div", { ...(!mounted && {
                            'aria-hidden': true,
                            className: 'opacity-0 cursor-default select-none',
                        }) }, (() => {
                        if (!connected) {
                            return (React.createElement("button", { className: 'rounded-xl border border-slate-500 bg-gradient-to-b from-zinc-800/30 to-zinc-500/50 p-2 hover:bg-zinc-800/50', onClick: openConnectModal, type: 'button' }, "Connect Wallet"));
                        }
                        if (chain.unsupported) {
                            return (React.createElement("button", { className: 'rounded-xl border border-red-500 bg-gradient-to-b from-zinc-800/30 to-zinc-500/50 p-2 hover:bg-zinc-800/50', onClick: openChainModal, type: 'button' }, "Wrong network"));
                        }
                        return (React.createElement("div", { className: 'flex space-x-5' },
                            React.createElement("button", { onClick: openChainModal, className: 'flex justify-center', type: 'button' },
                                React.createElement("div", { className: 'flex space-x-2 rounded-xl border border-slate-500 bg-gradient-to-b from-zinc-800/30 to-zinc-500/50 p-2 hover:bg-zinc-800/50' },
                                    chain.iconUrl && (React.createElement(Image, { alt: chain.name ?? 'Chain icon', src: chain.iconUrl, width: 20, height: 20, style: { objectFit: 'contain' } })),
                                    React.createElement("div", null, chain.name))),
                            React.createElement("button", { className: 'rounded-xl border border-slate-500 bg-gradient-to-b from-zinc-800/30 to-zinc-500/50 px-3 py-2 hover:bg-zinc-800/50', onClick: openAccountModal, type: 'button' }, account.displayName)));
                    })())));
            })),
        React.createElement("div", { className: 'fixed right-80 top-10 z-10' },
            React.createElement("div", { className: "relative flex place-items-center before:absolute before:h-[300px] before:w-[680px]  before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-10 after:h-[190px] after:w-[840px] after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]" }))));
};
export default Navbar;
