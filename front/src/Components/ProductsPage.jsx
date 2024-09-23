import React, { useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import { PiBowlFoodFill } from "react-icons/pi";
import { GiCupcake } from "react-icons/gi";
import { RiDrinksFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const ProductsPage = () => {
    const [category, setCategory] = useState('all')

    return (
        <div className='w-full flex flex-col  gap-14 pt-[50px]'>
            <div className='w-full px-10 flex justify-between items-center'>
                <div className='w-1/4'>
                <Link to={'/cart'}>
                <div className='flex w-fit items-center gap-2 bg-black text-white px-5 py-1 rounded-md'>
                    <FaCartShopping />
                    <button >السلة</button>
                </div>
                </Link>
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

            <div className='flex flex-col gap-2'>
                <div className='w-full flex flex-wrap justify-around px-5 text-lg'>
                    <button className={`${category == 'all' && 'bg-black text-white'} px-6 rounded-md`} onClick={() => setCategory('all')}>
                        الكل
                    </button>
                    <button className={`${category == 'meal' && 'bg-black text-white'} flex items-center gap-1 px-6 rounded-md`} onClick={() => setCategory('meal')}>
                    <PiBowlFoodFill size={20}/>
                    وجبات
                    </button>
                    <button className={`${category == 'dessert' && 'bg-black text-white'} flex items-center gap-1 px-6 rounded-md`} onClick={() => setCategory('dessert')}>
                    <GiCupcake size={20}/>
                    حلويات
                    </button>
                    <button className={`${category == 'drink' && 'bg-black text-white'} flex items-center gap-1 px-6 rounded-md`} onClick={() => setCategory('drink')}>
                    <RiDrinksFill size={20}/>
                    مشروبات
                    </button>

                </div>
                <div className='w-full bg-white rounded-t-lg p-8'>
                    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 gap-4'>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductsPage