import React from 'react'
import logo from '@/assets/logo.png'
import { Link, NavLink } from 'react-router-dom'

export default function HeaderMenu() {
  return (
    <div className='fixed inset-x-0 top-0  py-6 bg-white z-10  mx-auto shadow w-screen'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
            <Link to="/" >
              <div className='flex gap-x-2 items-center w-max mb-4'>
                  <img className='size-4' alt='Logo PPOP' src={logo}/>
                  <h1 className='text-xl font-bold'>SIMS PPOB</h1>
              </div>
            </Link>
            <div className='flex gap-x-4 '>
                <NavLink className={({isActive}) => isActive ? 'text-red-800' : 'text-gray-500'} to="/topup" >Top Up</NavLink>
                <NavLink className={({isActive}) => isActive ? 'text-red-800' : 'text-gray-500'}  to="/transactions" >Transaction</NavLink>
                <NavLink className={({isActive}) => isActive ? 'text-red-800' : 'text-gray-500'}  to="/account" >Akun</NavLink>
            </div>
        </div>
    </div>
  )
}
