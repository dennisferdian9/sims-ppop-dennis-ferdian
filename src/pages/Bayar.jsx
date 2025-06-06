import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import InputNumber from '@/components/InputNumber'
import moneyIcon from '@/assets/money.svg'
import { useLogoutUser } from '@/services/logout';

export default function Bayar() {
    const logoutUser = useLogoutUser()

    const { slug } = useParams();
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token);
    const [service, setService] = useState({
        id: '',
        icon: '',
        name: '',
        tarif: ''
    })

    const slugToId = slug.split('-').join('_').toUpperCase();

   useEffect(() => {
    const fetchService = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_ENDPOINT
        const response = await axios.get(endpoint + '/services', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.status !== 200) return
        
        const servicePage = response.data.data.find(item => item.service_code === slugToId)
        if (!servicePage) {
            return navigate('/')
        }
        setService({
            id: servicePage.service_code,
            icon: servicePage.service_icon,
            name: servicePage.service_name,
            tarif: servicePage.service_tariff
        })
      } catch(error) {
        console.error(error);
        if (error.response?.status === 401) {
          await logoutUser()
        }
      }
    }
    fetchService()
  }, [token, slugToId, navigate])

  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      const data = {
        service_code: service.id
      }
      const endpoint = import.meta.env.VITE_API_ENDPOINT
        const response = await axios.post(endpoint + '/transaction',data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.status !== 200) return
        alert('bayar berhasil!!')
        navigate(0);
      } catch (error) {
          if (error.response && error.response.status === 401) {
            await logoutUser()
            return
          } 
          if (error.response && error.response.status === 400) {
            alert(error.response.data.message)
          }
          console.error(error)
      }
  }


  return (
    <div className='mt-20'>
        <h2 className='mb-4'>Pembayaran</h2>
        <div className='flex items-center gap-x-2 mb-4 font-bold'>
            {service.icon && <img className='size-10' src={service.icon} alt={service.name}/>}
            {service.name}</div>
        <form onSubmit={submitHandler}>
            <InputNumber disabled={true} step={1000} min={10000} max={1000000} icon={moneyIcon} value={service.tarif}  placeholder='NominalBayar' name='bayar' type='number' />
            <button
                className='w-full py-2 bg-red-600 mt-3 text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300'
            >
                Bayar
            </button>
        </form>
    </div>
  )
}
