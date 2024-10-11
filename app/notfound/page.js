import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div className='grid justify-center  '>
      <h1 className='  text-3xl'>Page Not Found</h1>
      <Link href='/user' ><p className='text-underline'>Go to all users</p> </Link>
          </div>
  )
}
