import PromotionBanner from '@/components/PromotionBanner'
import ServiceList from '@/components/ServiceList'
import React from 'react'

export default function Home() {
  return (
    <div className='mt-10'>
        <ServiceList />
        <div className='mt-10'>
          <PromotionBanner />
        </div>
    </div>
  )
}
