import React, { useEffect, useState } from 'react'
import profilePhoto from '@/assets/profile-photo.png'
import BalanceCard from './BalanceCard'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useLogoutUser } from '@/services/logout';

export default function AccountBanner() {
  const logoutUser = useLogoutUser()
  const token = useSelector((state) => state.auth.token);
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_ENDPOINT
        const response = await axios.get(endpoint + '/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.status !== 200) return
        
        const data = response.data.data
        
        const partsImage = data.profile_image.split('/');

        const slug = partsImage[partsImage.length - 1];
        if (slug !== 'null') {
          setImage(data.profile_image)
        }
        setName(`${data.first_name} ${data.last_name}`)
    
      } catch (error) {
        console.error(error)
        if (error.response?.status === 401) {
          await logoutUser()
        }
      }   
    }
    fetchProfile()
  },[token, logoutUser])
  return (
    <div className='grid grid-cols-5'>
        <div className=' col-span-3'>
            <img className='size-20 rounded-full mb-4' src={image.length ? image : profilePhoto} alt='profile'/>
            <div>Selamat datang, </div>
            <p className='font-bold text-2xl'>{name}</p>
        </div>
        <div className=' col-span-2 h-full'>
          <BalanceCard/>
        </div>
    </div>
  )
}
