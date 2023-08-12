export const FamilyKitNavbar = `import React from 'react'
import { ChainIcon, ConnectKitButton } from 'connectkit'
import { Button } from 'react95'
import { useModal } from 'connectkit'
import { useRouter } from 'next/router'

export const truncateAddress = (address: string) => {
    if (!!address && isHexValue(address)) {
        return \`\\\\\\\${address.slice(0, 5)}...\\\\\\\${address.slice(address.length - 4)}\`   
     } else {
      console.error('Address is not defined or is not a hex value.')
      return address
    }
  }
  
  export const isHexValue = (value: string) => {
    const hexRegex = /^0x[0-9a-fA-F]+$/
    return hexRegex.test(value)
  }
  

export const CustomConnectButton = () => {
  const router = useRouter()
  const useModalHook = useModal()
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, ensName, chain }) => {
        return (
          <div className='flex space-x-3 right-2'>
            {chain?.id && (
              <Button onClick={useModalHook.openSwitchNetworks}>
                <ChainIcon id={chain?.id} unsupported={chain?.unsupported} /> <div className='ml-1'>{chain.name}</div>
              </Button>
            )}
            <div className={'flex flex-col'}>
              <Button onClick={show} className=''>
                {isConnected ? ensName ?? truncateAddress(address || '') : 'Connect Wallet'}
              </Button>
            </div>
          </div>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
`
