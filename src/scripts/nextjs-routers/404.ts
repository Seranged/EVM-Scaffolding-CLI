export const page404 = `import Link from 'next/link'
import React from 'react'

// You can just delete this file if you want to use the pre-defined Next.js 404 page. I gave it incase you want to build a pre-defined and are not sure how Next.js works

export default function NotFound() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
    <div className='flex flex-col justify-center'>
        <div className='rounded-xl border border-slate-500 bg-gradient-to-b from-zinc-800/30 to-zinc-500/40 p-4'>Page Not Found</div>
        <Link className='flex justify-center' href='/'>
          <button type='button' className='mt-3 rounded-xl border border-slate-500 bg-gradient-to-b p-3 from-zinc-800/30 to-zinc-500/40 hover:from-zinc-800/40 hover:to-zinc-500/50'>Homepage</button>
        </Link>
      </div>
    </main>
  )
}
`
