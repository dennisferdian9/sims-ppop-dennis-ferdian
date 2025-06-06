import InputNumber from '@/components/InputNumber'
import React, { useState } from 'react'
import moneyIcon from '@/assets/money.svg'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutUser } from '@/services/logout';
import { nominalToCurrency } from '@/utils/nominalToCurrency';

export default function Topup() {
  const logoutUser = useLogoutUser()

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [nominal, setNominal] = useState(10000)
  const nominalList = [10000, 20000, 50000, 100000, 250000, 500000]

  const pickNominalHandler = (val) => {
    setNominal(val)
  }

  const setNominalHandler = (val) => {
    setNominal(val)
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      const data = {
        top_up_amount: nominal
      }
      const endpoint = import.meta.env.VITE_API_ENDPOINT
        const response = await axios.post(endpoint + '/topup',data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.status !== 200) return
        alert('topup berhasil!!')
        navigate(0);
      } catch (error) {
          console.error(error)
          if (error.response && error.response.status === 401) {
            await logoutUser()
          }
      }
  }

  return (
    <div className='mt-10'>
        <span>Silahkan masukkan</span>
        <h2>Nominal Top Up</h2>
        <div className='grid grid-cols-2 gap-x-3'>
          <div>
          <form onSubmit={submitHandler}>
            <InputNumber 
              disabled={true}
              step={1000} 
              min={10000} 
              max={1000000} 
              icon={moneyIcon} 
              value={nominal} 
              setValue={setNominalHandler}  
              placeholder='Masukkan nominal Top up' 
              name='lastName' 
              type='number' 
            />
            <button 
              disabled={nominal < 1000 || nominal > 1000000} 
              className='w-full py-2 bg-red-600 mt-3 text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300'
            >
              Top Up
            </button>
          </form>
          </div>
          <div className='grid gap-2 grid-cols-3 grid-rows-2'>
            {
              nominalList.map((nom) => (
                <button 
                  key={nom} 
                  onClick={() => pickNominalHandler(nom)}
                  className='col-span-1 rounded-sm py-1 border border-gray-300 font-bold cursor-pointer hover:bg-gray-100' 
                >
                  {nominalToCurrency(nom)}
                </button>
              ))
            }
          </div>
        </div>
    </div>
  )
}

