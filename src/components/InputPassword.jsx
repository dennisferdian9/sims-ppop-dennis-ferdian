import React, { useState } from 'react'
import eye from "@/assets/eye.svg"
import eyeSlash from "@/assets/eye-slash.svg"

export default function InputPassword({ 
  value = '', 
  onChange, 
  icon, 
  placeholder = '', 
  name, 
  disabled = false 
}) {
  const [inputIsVisible, setInputIsVisible] = useState(false);

  const toggleVisibility = () => {
    setInputIsVisible((prev) => !prev);
  };

  const onChangeHandler = (e) => {
    onChange(e.target.value); 
  };

  return (
    <div className='flex flex-row-reverse p-2 border border-gray-300 gap-x-2 group focus-within:border-2 relative'>
      <input 
        type={inputIsVisible ? 'text' : 'password'}
        placeholder={placeholder} 
        className='w-full h-full outline-none peer text-xs' 
        name={name}
        id={name}
        disabled={disabled}
        value={value}           
        onChange={onChangeHandler} 
      />
      {icon && <img className='w-3 opacity-30' src={icon} alt='icon input' />}
      <button 
        type='button' 
        className='bg-white absolute right-0 inset-y-0 px-2' 
        onClick={toggleVisibility}
      >
        <img 
          className='w-3'
          alt={inputIsVisible ? 'Hide password' : 'See password'} 
          src={inputIsVisible ? eyeSlash : eye}  
        />
      </button>
    </div>
  )
}
