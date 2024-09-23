import React from 'react'
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from 'react-router-dom';

const Cart = () => {
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
                    <span className='text-lg'>name</span>
                </div>
            </div>

            <div className='w-full flex rounded-t-lg '>
                <div className='w-2/5 p-8 h-full bg-gray-300 flex flex-col justify-between'>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-[50px]'>طلبك</h1>

                    </div>
                    <button className='bg-black py-2 rounded-md text-white text-lg'>الدفع </button>
                </div>
                <div className='w-3/5 p-8 h-full bg-white flex flex-col justify-between'>
                    <div className='flex flex-col'>
                        <div className='flex justify-between items-center'>
                        <h1 className='font-semibold text-[50px]'>سلتك</h1>
                        <Link to={'/products'}>
                        <div className='flex gap-2 items-end'>
                            <p>استكمال التسوق</p>
                            <FiArrowLeft className='mb-1'/>
                        </div>
                        </Link>
                        </div>

                    </div>
                
                </div>
            </div>

        </div>
  )
}

export default Cart