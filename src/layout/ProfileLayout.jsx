import HeaderMenu from '@/components/HeaderMenu'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
  return (
    <div>
        <HeaderMenu/>
        <div className='mt-40 mx-auto max-w-7xl'>
            <Outlet />
        </div>
    </div>
  )
}
