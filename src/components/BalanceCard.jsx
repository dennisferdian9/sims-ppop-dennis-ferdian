import React, { useEffect, useState } from 'react'
import eyeWhite from '@/assets/eye-white.svg'
import eyeWhiteSlash from '@/assets/eye-slash-white.svg'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useLogoutUser } from '@/services/logout';


export default function BalanceCard() {
    const logoutUser = useLogoutUser()
    const [balance, setBalance] = useState(20000)
    const [balanceVisible, setBalanceVisible] = useState(false)

    const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_ENDPOINT
        const response = await axios.get(endpoint + '/balance', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.status === 401) logoutUser()
        if (response.status !== 200) return
        
        const data = response.data.data

        setBalance(data.balance)
      } catch (error) {
        console.error(error)
        if (error.response?.status === 401) {
          await logoutUser()
        }
      }
    }
    fetchProfile()
  },[token, logoutUser])

    const notVisibleBalance = () => (
        <span className='flex items-center gap-x-1'>
            {Array(6).fill(0).map((_, i) => (
            <div key={i} className="size-3 bg-white rounded-full"></div>
            ))}
        </span>
    )

  return (
    <div className='text-white bg-red-600 px-4 py-3 rounded h-full flex-col'>
        <p>Saldo anda</p>
        <div className='text-white font-bold flex gap-x-2 mt-4 text-2xl mb-2'>
            Rp.
            {balanceVisible 
            ? <span>{balance}</span> 
            : notVisibleBalance()
            }
        </div>
        <button className='flex gap-x-2 items-center hover:opacity-80 cursor-pointer text-sm' onClick={() => setBalanceVisible(!balanceVisible)} type='button'>
            { balanceVisible ? 'Tutup saldo': 'Lihat saldo'}
           <img className='size-4' src={balanceVisible ? eyeWhite : eyeWhiteSlash} alt="" /> 
        </button>
    </div>
  )
}
