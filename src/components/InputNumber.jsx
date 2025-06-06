import React from 'react'

export default function InputNumber({icon, placeholder = '', name, value, setValue, min, max, step = 1, disabled=false}) {
    const inputHandler = (e) => {
        setValue && setValue(e.target.value);
    };
  return (
    <div className='flex flex-row-reverse p-2 border border-gray-300 gap-x-2 group focus-within:border-2'>
        <input 
            placeholder={placeholder} 
            className='w-full h-full outline-none peer text-xs' 
            type="number" 
            name={name}
            min={min}
            max={max}
            step={step}
            id={name}
            disabled={disabled}
            onChange={inputHandler}
            value={value}
            autoComplete='off'
        />
        {icon && <img className='w-3 opacity-30' src={icon} alt='icon input'/>}
    </div>
  )
}
