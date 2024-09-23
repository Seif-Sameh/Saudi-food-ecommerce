import React, { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import { PiBowlFoodFill } from "react-icons/pi";
import { GiCupcake } from "react-icons/gi";
import { RiDrinksFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import image6 from '../assets/image-6.jpg'

const ProductsPage = () => {
    const location = useLocation()
    const {state} = location

    const [category, setCategory] = useState('all')
    const [found, setFound] = useState(false)
    const [products, setProducts] = useState([])

    const [cart, setCart] = useState([])

    const retriveProducts = () => {
        axios.post('http://localhost/e-commerce/retrieve_products.php', {name: state.name, id: state.id})
        .then((res) => (res.data))
        .then((data) => {
            if(data.status == 'OK'){
                setProducts(data.products)
                setFound(data.found)
            }
        })
    }

    useEffect(() => {
        retriveProducts() 
    }, [])

    return (
        <div className='w-full flex flex-col  gap-14 pt-[50px]'>
            <div className='w-full px-10 flex justify-between items-center'>
                <div className='w-1/4'>
                <Link to={'/cart'} state={{cart_items : cart}}>
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
                    <span className='text-lg'>{state && state.name}</span>
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
                        
                        {
                            products.map((item) => (
                                <div key={item.id} className='p-2 h-[300px] flex flex-col'>  
                                    <div className='w-full h-3/5'>
                                        <img src={image6} alt="" className='w-full h-full rounded-lg'/>
                                    </div>
                                    <div className='w-full h-2/5 flex flex-col justify-between '>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-lg font-semibold'>{item.name}</p>
                                        <p className='text-sm '>{item.description}</p>
                                    </div>
                                        <button className='bg-black text-white py-1 px-3 rounded-md w-fit cursor-pointer' onClick={()=> setCart((prev) => [...prev, item])}>اضف الي سلتك</button>
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

export default ProductsPage