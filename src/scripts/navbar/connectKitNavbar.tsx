export const ConnectKitNavbar = `import React from 'react'
import { truncateAddress } from '@/functions/truncateAddress'
import { ChainIcon, ConnectKitButton } from 'connectkit'
import { useModal } from 'connectkit'

export const Navbar = () => {
  const useModalHook = useModal()
  return (
    <>
      <div className="fixed right-5 top-4 z-50 md:right-7 md:top-7">
        <ConnectKitButton.Custom>
          {({ isConnected, show, address, ensName, chain }) => {
            return (
              <div className="flex space-x-3 right-2 ">
                {chain?.id && (
                  <button
                    type="button"
                    className="flex rounded-xl border border-slate-500 bg-gradient-to-b from-zinc-800/30 to-zinc-500/50 px-3 py-2 hover:bg-zinc-800/50"
                    onClick={useModalHook.openSwitchNetworks}
                  >
                    <ChainIcon id={chain?.id} unsupported={chain?.unsupported} />{' '}
                    <div className="ml-1">{chain.name}</div>
                  </button>
                )}
                <div className={'flex flex-col'}>
                  <button
                    type="button"
                    onClick={show}
                    className="rounded-xl border border-slate-500 bg-gradient-to-b from-zinc-800/30 to-zinc-500/50 px-3 py-2 hover:bg-zinc-800/50"
                  >
                    {isConnected ? ensName ?? truncateAddress(address || '') : 'Connect Wallet'}
                  </button>
                </div>
              </div>
            )
          }}
        </ConnectKitButton.Custom>
      </div>
      <div className="fixed right-80 top-10 z-10">
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[680px]  before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-10 after:h-[190px] after:w-[840px] after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]"></div>
      </div>
    </>
  )
}
`
