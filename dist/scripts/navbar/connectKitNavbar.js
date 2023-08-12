export const ConnectKitNavbar = `import React from 'react'
import { truncateAddress } from '@/functions/truncateAddress'
import { ChainIcon, ConnectKitButton } from 'connectkit'
import { useModal } from 'connectkit'

export const CustomConnectButton = () => {
  const useModalHook = useModal()
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, ensName, chain }) => {
        return (
          <div className='flex space-x-3 right-2 '>
            {chain?.id && (
              <button type='button' className='flex rounded-xl border border-slate-500 bg-gradient-to-b from-zinc-800/30 to-zinc-500/50 px-3 py-2 hover:bg-zinc-800/50' onClick={useModalHook.openSwitchNetworks}>
                <ChainIcon id={chain?.id} unsupported={chain?.unsupported} /> <div className='ml-1'>{chain.name}</div>
              </button>
            )}
            <div className={'flex flex-col'}>
              <button type='button' onClick={show} className='rounded-xl border border-slate-500 bg-gradient-to-b from-zinc-800/30 to-zinc-500/50 px-3 py-2 hover:bg-zinc-800/50'>
                {isConnected ? ensName ?? truncateAddress(address || '') : 'Connect Wallet'}
              </button>
            </div>
          </div>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
`;
