import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLogoutUser } from '@/services/logout';

export default function PromotionBanner() {
    const logoutUser = useLogoutUser()

    const [promotionList, setPromotionList] = useState([])
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
      const fetchBanner = async () => {
       try {
        const endpoint = import.meta.env.VITE_API_ENDPOINT
        const response = await axios.get(endpoint + '/banner', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.status !== 200) return
        
        const data = response.data.data
        setPromotionList(data)
       } catch (error) {
         console.error(error)
            if (error.response?.status === 401) {
              await logoutUser()
            }
       }
    }
    fetchBanner()
  },[token, logoutUser])
  return (
     <>
        <p className='font-bold mb-4'>Temukan promo menarik</p>
        <div className="flex gap-x-4 overflow-x-scroll snap-x
         remove-scroll pr-10">
    {
        promotionList.map((promotion) => (
        <div
            key={promotion.banner_name} 
            className='w-80 snap-start shrink-0'           
        >
            <img className='w-full' alt={promotion.banner_image} src={promotion.banner_image}/>
        </div>
        ))
    }
        </div>
     </>

  )
}
