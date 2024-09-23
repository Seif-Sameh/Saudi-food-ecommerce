import React, { useEffect, useState } from 'react'
import { Link, } from 'react-router-dom';
import axios from 'axios'
import { GoTrash } from "react-icons/go";

const sellerDashboard = ({ name, id }) => {

  const [found, setFound] = useState(false)
  const [products, setProducts] = useState([])

  const [ordersFound, setOrdersFound] = useState(false)
  const [orders, setOrders] = useState([])

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
  const fetchOrders = () => {
    axios.post('http://localhost/e-commerce/seller_orders.php', { name: name, id: id })
      .then((res) => (res.data))
      .then((data) => {
        if (data.status == 'OK') {
          setOrdersFound(data.found)
          setOrders(data.orders)
        }
      })
  }
  const removeProduct = (product_id) => {
    axios.post('http://localhost/e-commerce/remove_product.php', { name: name, id: id, product_id })
      .then((res) => (res.data))
      .then((data) => {
        if (data.status == 'OK') {
          retriveProducts()
        }
      })
  }

  useEffect(() => {
    retriveProducts()
    fetchOrders()
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
      <div className='w-full bg-white rounded-t-lg p-8 min-h-[60vh] pb-[50px]'>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 gap-4'>
          {
            found && products.map((item) => (
              <div key={item.id} className='p-2 flex flex-col gap-4 h-[400px]'>
                <div className='w-full h-1/2'>
                  <img src={`${item.image_path}`} alt="" className='w-full h-full rounded-lg' />
                </div>
                <div className='w-full h-2/5 flex flex-col justify-between px-2 gap-2'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xl font-semibold'>{item.name}</p>
                    <p className='text-sm line-clamp-2'>{item.description}</p>
                  </div>
                  <div className='h-full text-sm flex items-center justify-between'>
                    <p className='text-xl font-bold'>{item.product_price} SAR</p>
                    <div className='flex items-center gap-1 cursor-pointer' onClick={() => {
                      removeProduct(item.id)
                    }}>
                      <GoTrash />
                      <span>حذف</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className='flex justify-between px-10'>
        <p className='text-3xl font-bold'>الطلبات</p>
      </div>
      <div className='w-full bg-white rounded-t-lg p-8  pb-[50px]'>
      <table className='table-auto w-full'>
        <thead className='bg-black text-white'>
          <th className='p-2 text-center'>اسم صاحب الطلب</th>
          <th className='p-2 text-center'>المنتج </th>
          <th className='p-2 text-center'>الكمية </th>
          <th className='p-2 text-center'>الإجمالي </th>
        </thead>
        <tbody>
          {ordersFound && orders.map((item, index) => (
            <tr key={index} className='bg-gray-100'>
              <td className='pr-2 py-2 text-center'>{item.customer_name}</td>
              <td className='py-2 text-center'>{item.product_name}</td>
              <td className='py-2 text-center'>{item.quantity}</td>
              <td className='py-2 text-center'>{item.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default sellerDashboard