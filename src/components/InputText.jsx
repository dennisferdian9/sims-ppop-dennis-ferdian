import React from 'react';

export default function InputText({ 
  value = '', 
  onChange, 
  icon, 
  placeholder = '', 
  name, 
  disabled = false 
}) {
  const onChangeHandler = (e) => {
    onChange(e.target.value)
  }
  return (
    <div className='flex flex-row-reverse p-2 border border-gray-300 gap-x-2 group focus-within:border-2'>
      <input 
        placeholder={placeholder} 
        className='w-full h-full outline-none peer text-xs' 
        type="text" 
        name={name}
        disabled={disabled}
        id={name}
        value={value}           
        onChange={onChangeHandler}        
      />
      {icon && <img className='w-3 opacity-30' src={icon} alt='icon input' />}
    </div>
  );
}
