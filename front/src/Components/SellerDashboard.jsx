import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const sellerDashboard = () => {

  const retriveProducts = () => {
    axios.post('http://localhost/e-commerce/seller_products.php', { }, {withCredentials: true} )
    .then((res) => (res.data))
    .then((data) => {
        if(data.status == 'OK'){
        }
    })
}

  useEffect(() => {
    retriveProducts()
  }, [])

  return (
    <div className='w-full flex flex-col gap-14 py-[50px] px-10'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>منتجاتك</p>
        <Link to={'/add_product'}>
        <button className='bg-black text-white py-1 px-3 rounded-md cursor-pointer' >
            إضافة منتج
        </button>
        </Link>
      </div>
  </div>
  )
}

export default sellerDashboard