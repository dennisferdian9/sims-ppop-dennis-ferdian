import React from 'react'
import { Outlet } from 'react-router-dom'
import illusLogin from '@/assets/illus-auth.png'

export default function AuthLayout() {
  return (
     <div className='grid grid-cols-5 max-w-7xl mx-auto'>
      <main className='w-full col-span-3'>
        <Outlet />
      </main>
      <div className='col-span-2 h-screen'><img className='w-full h-full' alt='' src={illusLogin}/></div>
    </div>
  )
}
