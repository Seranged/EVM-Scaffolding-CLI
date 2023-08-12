export const page404 = `import Link from 'next/link'
import React from 'react'

// You can just delete this file if you want to use the pre-defined Next.js 404 page. I gave it incase you want to build a pre-defined and are not sure how Next.js works

export default function NotFound() {
  return (
    <main className='min-w-[calc(100vh)]  min-h-[calc(85vh)] flex justify-center items-center'>
      <div className='flex flex-col justify-center'>
        <div className='text-white'>Page Not Found</div>
        <Link className='w-full flex justify-center mt-4' href='/'>
          <button type='button'>Homepage</button>
        </Link>
      </div>
    </main>
  )
}
`