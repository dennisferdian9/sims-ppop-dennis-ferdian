import TransactionCard from '@/components/TransactionCard'
import { useLogoutUser } from '@/services/logout'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Transactions() {
  const logoutUser = useLogoutUser();
  const token = useSelector((state) => state.auth.token);
  
  const [transactionList, setTransactionList] = useState([]);
  const [hasMore, setHasMore] = useState(true)
  const pageRef = useRef(1);
  const loading = useRef(false)

  const fetchTransaction = async (page) => {
    try {
      if (loading.current) return
      loading.current = true
      const endpoint = import.meta.env.VITE_API_ENDPOINT;
      const response = await axios.get(endpoint + '/transaction/history', {
        params: { 
          offset: (page - 1) * 5,
          limit: 6
        },
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.status !== 200) return;

      const data = response.data.data;

      if (data.records.length <= 5) {
        setHasMore(false)
      } else setHasMore(true)
      
      const record = data.records.slice(0,5).map(record => ({
        createDate: record.created_on,
        description: record.description,
        id: record.invoice_number,
        amount: record.total_amount,
        type: record.transaction_type.toLowerCase()
      }));

      setTransactionList((prev) => [...prev, ...record]);
    
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        await logoutUser();
      }
    } finally {
      loading.current = false
    }
  };

  useEffect(() => {
    fetchTransaction(pageRef.current); 
  }, []);

  const loadMoreHandler = () => {
    pageRef.current += 1; 
    fetchTransaction(pageRef.current); 
  };

  return (
    <div className="my-10">
      <h3 className='font-bold mb-4 text-lg'>Semua transaksi </h3>
      <div className='flex flex-col gap-y-4'>
        {transactionList.map(transaction => (
          <TransactionCard 
            key={transaction.id}
            actionName={transaction.type} 
            nominal={transaction.amount} 
            transactionDate={transaction.createDate}
            description={transaction.description}
          />
        ))}
      </div>
      {
        hasMore &&
        <button 
          className="w-full py-3 border text-red-600 font-bold my-4 cursor-pointer" 
          onClick={loadMoreHandler}
        >
          Show More
        </button>
      }
    </div>
  );
}
