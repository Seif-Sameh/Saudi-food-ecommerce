import React, { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';
import { GoTrash } from "react-icons/go";

const Cart = ({name, id}) => {

    const location = useLocation()
    const { state } = location
    const [cartItems, setCartItems] = useState([])
    const [checkoutItems, setCheckoutItems] = useState([])

    useEffect(() => {
        setCartItems(state.cart_items)
        setCheckoutItems(state.cart_items.map((item) => ({...item, quantity: 1})))
    }, [])

    console.log(cartItems)
    console.log(checkoutItems)

    return (
        <div className='w-full flex flex-col  gap-14 pt-[50px]'>
            <div className='w-full px-10 flex justify-between items-center'>
                <div className='w-1/4'>

                </div>
                <div className='w-1/2 flex justify-center gap-3'>
                    <input type='text' className='w-[250px] h-[40px] rounded-md bg-gray-200 placeholder:text-gray-500 px-3' placeholder='بحث' />
                    <button className='bg-black w-[40px] flex justify-center items-center text-white rounded-md'>
                        <FiSearch size={20} />
                    </button>
                </div>
                <div className='w-1/4 flex flex-row-reverse items-center gap-3'>
                    <FaUser size={20} />
                    <span className='text-lg'>{name}</span>
                </div>
            </div>

            <div className='w-full min-h-[60vh] flex max-md:flex-col-reverse rounded-t-lg '>
                <div className='w-2/5 max-md:w-full p-8 h-full md:min-h-[60vh] bg-gray-300 flex flex-col justify-between'>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-[50px]'>طلبك</h1>

                    </div>
                    <button className='bg-black py-2 rounded-md text-white text-lg'>الدفع </button>
                </div>
                <div className='w-3/5 max-md:w-full py-10 pr-16 pl-8 h-full md:min-h-[60vh] bg-white rounded-t-md flex flex-col justify-between '>
                    <div className='flex flex-col mb-4'>
                        <div className='flex justify-between items-center'>
                            <h1 className='font-semibold text-[50px]'>سلتك</h1>
                            <Link to={'/products'} state={{ cart_items: cartItems }}>
                                <div className='flex gap-2 items-end'>
                                    <p>استكمال التسوق</p>
                                    <FiArrowLeft className='mb-1' />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col divide-y-2'>
                        {
                            cartItems && cartItems.map((item) => (
                                <div key={item.id} className='w-full h-[200px] p-4 flex items-center gap-6'>
                                    <div className='w-[250px] h-full flex items-center'>
                                        <img src={item.image_path} alt="" className='rounded-md h-full w-full' />
                                    </div>
                                    <div className='h-full flex-1 flex flex-col justify-between'>
                                        <div className='flex flex-col gap-2'>
                                            <p className='text-2xl font-bold'>{item.name}</p>
                                            <p className='text-md text-gray-600'>{item.description}</p>
                                        </div>

                                        <div className='flex gap-2 items-center'>
                                            <span>العدد</span>
                                            <input type="number" name="" id="" defaultValue={1} className='w-[50px] bg-gray-300 py-1 px-2 rounded-md' 
                                                onChange={(e) => {
                                                    setCheckoutItems((prev) => prev.filter((p) => p.id != item.id))
                                                    setCheckoutItems((prev) => [...prev, {...item, quantity: e.target.value}])
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='h-full text-sm flex flex-col justify-between'>
                                        <div className='flex items-center gap-1 cursor-pointer' onClick={() => {
                                            setCartItems((prev) => prev.filter((p) => p.id != item.id))
                                            setCheckoutItems((prev) => prev.filter((p) => p.id != item.id))
                                        }}>
                                            <GoTrash />
                                            <span>حذف</span>
                                        </div>
                                        <p className='text-xl font-bold'>{item.description.slice(0, 7)}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Cart