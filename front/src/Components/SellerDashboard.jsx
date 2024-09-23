import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'

const sellerDashboard = ({ name, id }) => {

  const [found, setFound] = useState(false)
  const [products, setProducts] = useState([])

  const retriveProducts = () => {
    axios.post('http://localhost/e-commerce/seller_products.php', { name: name, id: id })
      .then((res) => (res.data))
      .then((data) => {
        if (data.status == 'OK') {
          setFound(data.found)
          setProducts(data.products)
        }
      })
  }

  useEffect(() => {
    retriveProducts()
  }, [])

  return (
    <div className='w-full flex flex-col gap-14 pt-[50px]'>
      <div className='flex justify-between px-10'>
        <p className='text-3xl font-bold'>منتجاتك</p>
        <Link to={'/add_product'}>
          <button className='bg-black text-white py-1 px-3 rounded-md cursor-pointer' >
            إضافة منتج
          </button>
        </Link>
      </div>
      <div className='w-full bg-white rounded-t-lg p-8 min-h-[60vh]'>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 gap-4'>
          {
            found && products.map((item) => (
              <div key={item.id} className='p-2 flex flex-col gap-4'>
                <div className='w-full h-1/2'>
                  <img src={`${item.image_path}`} alt="" className='w-full h-full rounded-lg' />
                </div>
                <div className='w-full h-2/5 flex flex-col justify-between px-2 gap-4'>
                  <div className='flex flex-col gap-4'>
                    <p className='text-xl font-semibold'>{item.name}</p>
                    <p className='text-sm line-clamp-2'>{item.description}</p>
                  </div>
                  <div className='flex justify-between'>
                    
                    <p className='text-xl font-bold'>SAR {item.product_price} </p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default sellerDashboard