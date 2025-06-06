import React from 'react'

import { nominalToCurrency } from '@/utils/nominalToCurrency'
export default function TransactionCard({nominal, transactionDate, actionName, description}) {
  const formatDate = (dateValue) => {
    const dateNow = new Date(dateValue)
    const monthList = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const date = dateNow.getDate()
    const month = monthList[dateNow.getMonth()]
    const fullYear = dateNow.getFullYear()
    const options = { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false };
    const timePart = dateNow.toLocaleTimeString('id-ID', options);

    return `${date} ${month} ${fullYear}, ${timePart} WIB`;
  }
  const getDate = formatDate(transactionDate)
  
  return (
    <div className='w-full flex justify-between border rounded border-gray-200 px-4 py-3'>
        <div>
          <div 
            className={`${actionName==='topup' ? 'text-green-500' : ' text-red-600'} font-bold mb-1 text-2xl` 
          }>
            {nominalToCurrency(nominal)}  
          </div>
          <p className='text-xs text-gray-400'>{getDate}</p>
        </div>
        
        <div className='text-xs text-gray-600'>{description}</div>

    </div>
  )
}
