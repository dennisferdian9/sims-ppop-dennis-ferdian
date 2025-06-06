import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLogoutUser } from '@/services/logout';

export default function ServiceList() {
  const logoutUser = useLogoutUser()
  const [serviceList, setServiceList] = useState([])
  const token = useSelector((state) => state.auth.token);

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
        
        const serializeData = response.data.data.map(item => {
          return {
            id: item.service_code,
            icon: item.service_icon,
            name: item.service_name,
            tarif: item.service_tariff
          }
        })
        setServiceList(serializeData)
      } catch(error) {
        console.error(error)
        if (error.response?.status === 401) {
          await logoutUser()
        }
      }
    }
    fetchService()
  }, [token])

  const stringToslug = (text) => {
    return text.toLowerCase().split('_').join('-')
  }

  return (
    <div className='grid grid-cols-12'>
      {
        serviceList.map((service) => (
          <Link  key={service.id} to={`/bayar/${stringToslug(service.id)}`}>
            <div className='cursor-pointer'>
              <img className='mx-auto' src={service.icon}  alt={service.name} />
              <div className='text-center text-sm'>{service.name}</div>
            </div>
          </Link>
        ))
      }

    </div>
    
  )
}
