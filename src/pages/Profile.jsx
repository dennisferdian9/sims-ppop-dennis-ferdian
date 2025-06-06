import InputText from '@/components/InputText';
import { useLogoutUser } from '@/services/logout';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import atIcon from '@/assets/at.svg'
import userIcon from '@/assets/user.svg'
import ProfilePicture from '@/components/ProfilePicture';
import { updateProfile, updateProfileImage } from '@/services/updateProfile';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate()
    const logoutUser = useLogoutUser()
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        image: '',
        email: ''
    })
    const [initProfile, setInitProfile] = useState({
        firstName: '',
        lastName: '',
        image: '',
        email: ''
    })
    const [isDisabled, setIsDisabled] = useState(true)
    const token = useSelector((state) => state.auth.token);

     const isFormChanged = () => {
      const profileKeys = Object.keys(profile);

      const allFieldsEmpty = profileKeys.every((key) => {
        const value = profile[key];
        if (typeof value === 'string') {
          return value.trim() === '';
        }
        return !value; 
      });
      const isDifferent = profileKeys.some((key) => {
        const value = profile[key];
        const initValue = initProfile[key];

        if (typeof value === 'string') {
          return value !== initValue;
        }
        if (value instanceof File) {
          return true;
        }
        return value !== initValue;
      });

      return !allFieldsEmpty && isDifferent;
    };

      
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
            const fetchedProfile = {
              firstName: data.first_name,
              lastName: data.last_name,
              image: slug === 'null' ? '' : data.profile_image,
              email: data.email
            };

            setProfile(fetchedProfile);
            setInitProfile(fetchedProfile);

            } catch (error) {
            console.error(error)
            if (error.response?.status === 401) {
                await logoutUser()
            }
            }   
        }
    fetchProfile()
    }, [])

    const setEmail = (val) => {
      setProfile(prev => ({...prev, email: val}))
    }
    const setFirstName = (val) => {
      setProfile(prev => ({...prev, firstName: val}))
    }

    const setLastName = (val) => {
      setProfile(prev => ({...prev, lastName: val}))
    }

    const setProfilePicture = (files) => {
      setProfile(prev => ({...prev, image: files}))

    }
    
    const cancelEdit = () => {
      setProfile(initProfile)
      setIsDisabled(true)
    }
      

    const submitHandler = async(event) => {
      event.preventDefault()
      event.stopPropagation()
      try {
        await Promise.all([
          updateProfile(token, profile.firstName, profile.lastName),
          updateProfileImage(token, profile.image)
        ]);
        ;
        alert('Profile and image updated successfully!');
        navigate(0)

      } catch (error) {
        console.error('Error during update:', error);
        alert('Update failed!');
      }
    }

    const logoutHandler = () => {
      logoutUser()
    }
  
  return (
    <div className='max-w-2xl mx-auto'>
        <form onSubmit={submitHandler} className=' flex flex-col gap-y-3'>
            <div className='w-max mx-auto'>
              <ProfilePicture onChange={setProfilePicture} src={profile.image} disabled={isDisabled}/>
            </div>
            <InputText 
              disabled={true} 
              value={profile.email} 
              icon={atIcon} 
              onChange={setEmail}
              placeholder='masukkan email anda' 
              name='email' 
            />
            <InputText 
              disabled={isDisabled} 
              value={profile.firstName} 
              icon={userIcon} 
              onChange={setFirstName}
              placeholder='masukkan nama depan' 
              name='firstName' 
            />      
            <InputText 
              disabled={isDisabled} 
              value={profile.lastName} 
              onChange={setLastName}
              icon={userIcon} 
              placeholder='masukkan nama belakang' 
              name='lastName' 
            />    
            {
              isDisabled 
              ? <div className='flex flex-col gap-y-3'>
                <button 
                  className='w-full py-2 rounded border-red-600 border text-red-600 cursor-pointer' 
                  onClick={() => setIsDisabled(false)} 
                  type='button'
                >
                  Edit Profile
                </button>
                <button 
                  className='w-full py-2 rounded bg-red-600 text-white font-bold cursor-pointer' 
                  onClick={logoutHandler}
                  type='button'
                >
                  Logout
                </button>
              </div>
              : <div  className='flex flex-col gap-y-3'>
              <button 
                className='w-full py-2 rounded border-red-600 border text-red-600 cursor-pointer' 
                onClick={cancelEdit}  
                type='button'
                >
                  Cancel
              </button>
              <button 
                type='submit'
                disabled={ !isFormChanged()}
                className='w-full py-2 rounded bg-red-600 disabled:bg-gray-200 text-white font-bold cursor-pointer' 
              >
                Simpan
              </button>
            </div>
            }

        </form>
    </div>
  )
}
