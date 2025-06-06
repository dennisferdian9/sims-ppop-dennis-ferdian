import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerAPI } from '@/services/auth'
import logo from '@/assets/logo.png'
import InputText from '@/components/InputText'
import InputPassword from '@/components/InputPassword'
import atIcon from '@/assets/at.svg'
import userIcon from '@/assets/user.svg'
import lockIcon from "@/assets/lock.svg"

export default function Register() { 
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setError('Password tidak sama');
      return;
    }

    const response = await registerAPI(
      email,
      password,
      firstName,
      lastName
    );

    if (!response.success) {
      setError(response?.data?.message ?? 'Server error');
      return;
    }

    alert('Register Berhasil');
    navigate("/login");
  };

  return (
    <div className='w-96 mx-auto flex items-center min-h-screen'>
      <div>
        <div className='flex gap-x-2 items-center mx-auto w-max mb-4'>
          <img className='size-4' alt='Logo PPOP' src={logo} />
          <h1 className='text-xl font-bold'>SIMS PPOB</h1>
        </div>
        <h2 className='text-2xl font-bold text-center mb-4'>Lengkapi data untuk membuat akun</h2>

        {error.length > 0 && (
          <p className='text-red-500 font-bold mb-2'>
            {error}
          </p>
        )}

        <form onSubmit={onSubmitHandler} className='flex flex-col gap-y-4'>
          <InputText 
            icon={atIcon} 
            placeholder='Masukkan email anda' 
            name='email' 
            type='text'
            value={email}
            onChange={setEmail}
          />
          <InputText 
            icon={userIcon} 
            placeholder='Nama depan' 
            name='firstName' 
            type='text'
            value={firstName}
            onChange={setFirstName}
          />
          <InputText 
            icon={userIcon} 
            placeholder='Nama belakang' 
            name='lastName' 
            type='text'
            value={lastName}
            onChange={setLastName}
          />
          <InputPassword 
            icon={lockIcon} 
            placeholder='Masukkan password anda' 
            name='password'
            value={password}
            onChange={setPassword}
          />
          <InputPassword 
            icon={lockIcon} 
            placeholder='Ulangi password' 
            name='passwordConfirm'
            value={passwordConfirm}
            onChange={setPasswordConfirm}
          />
          <button 
            type='submit' 
            className='w-full bg-red-500 text-white rounded text-sm py-2'
          >
            Daftar
          </button>
        </form>

        <p className='text-sm text-center mt-4'>
          Sudah punya akun? login 
          <Link className='text-red-500 font-bold ml-1' to='/login'>
            di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
