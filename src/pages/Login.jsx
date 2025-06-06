import React, { useState } from 'react'
import logo from '@/assets/logo.png'
import InputText from '@/components/InputText'
import InputPassword from '@/components/InputPassword'
import atIcon from '@/assets/at.svg'
import lockIcon from "@/assets/lock.svg"
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI } from '@/services/auth'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/stores/authSlice'

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await loginAPI(email, password);

    if (!response.success) {
      setError(response?.data?.message ?? 'server error');
      return;
    }

    dispatch(setCredentials({ email: email, token: response.data.data.token }));
    navigate("/");
  };

  return (
    <div className="w-96 mx-auto flex items-center min-h-screen">
      <div>
        <div className="flex gap-x-2 items-center mx-auto w-max mb-4">
          <img className="size-4" alt="Logo PPOP" src={logo} />
          <h1 className="text-xl font-bold">SIMS PPOB</h1>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">
          Masuk atau buat akun untuk memulai
        </h2>

        {error.length > 0 && (
          <p className="text-red-500 font-bold mb-2">
            {error}
          </p>
        )}

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-y-4">
          <InputText 
            icon={atIcon} 
            placeholder="Masukkan email anda" 
            name="email"
            value={email}                 
            onChange={setEmail}
          />
          <InputPassword 
            icon={lockIcon} 
            placeholder="Masukkan password anda" 
            name="password"
            value={password}                 
            onChange={setPassword}
          />
          <button 
            type="submit" 
            className="w-full bg-red-500 text-white rounded text-sm py-2"
          >
            Masuk
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Belum punya akun? registrasi
          <Link className="text-red-500 font-bold ml-1" to="/register">
            di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
