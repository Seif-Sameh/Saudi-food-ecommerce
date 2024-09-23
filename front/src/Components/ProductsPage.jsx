import React, { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProductsPage = ({ name, id }) => {

    const [category, setCategory] = useState('all')
    const [found, setFound] = useState(false)
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const [cart, setCart] = useState([])

    const location = useLocation()
    const {state} = location 

    const retriveProducts = () => {
        axios.post('http://localhost/e-commerce/retrieve_products.php', { name, id })
            .then((res) => (res.data))
            .then((data) => {
                if (data.status == 'OK') {
                    setProducts(data.products)
                    setFilteredProducts(data.products)
                    setFound(data.found)
                }
            })
    }

    useEffect(() => {
        retriveProducts()
        setCart(state.cart_items)
    }, [])

    return (
        <div className='w-full flex flex-col  gap-14 pt-[50px]'>
            <div className='w-full px-10 flex justify-between items-center'>
                <div className='w-1/4'>
                    <Link to={'/cart'} state={{ cart_items: cart }}>
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
                    <span className='text-lg'>{name}</span>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                {/* <div className='w-full flex flex-wrap justify-around px-5 text-lg'>
                    <button className={`${category == 'all' && 'bg-black text-white'} px-6 rounded-md`} onClick={() => {
                        setCategory('all')
                        setFilteredProducts(products)
                    }}>
                        الكل
                    </button>
                    <button className={`${category == 'meal' && 'bg-black text-white'} flex items-center gap-1 px-6 rounded-md`} onClick={() => {
                        setCategory('meal')
                        setFilteredProducts(products.filter((item) => (item.category == 'meal')))
                    }}>
                    <PiBowlFoodFill size={20}/>
                    وجبات
                    </button>
                    <button className={`${category == 'dessert' && 'bg-black text-white'} flex items-center gap-1 px-6 rounded-md`} onClick={() => {
                        setCategory('dessert')
                        setFilteredProducts(products.filter((item) => (item.category == 'dessert')))

                    }}>
                    <GiCupcake size={20}/>
                    حلويات
                    </button>
                    <button className={`${category == 'drink' && 'bg-black text-white'} flex items-center gap-1 px-6 rounded-md`} onClick={() => {
                        setCategory('drink')
                        setFilteredProducts(products.filter((item) => (item.category == 'drink')))
                    }}>
                    <RiDrinksFill size={20}/>
                    مشروبات
                    </button>

                </div> */}
                <div className='w-full bg-white rounded-t-lg p-8 min-h-[60vh]'>
                    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 gap-4'>

                        {
                            found && filteredProducts.map((item) => (
                                <div key={item.id} className='p-2 flex flex-col gap-4'>
                                    <div className='w-full h-1/2'>
                                        <img src={`${item.image_path}`} alt="" className='w-full h-full rounded-lg' />
                                    </div>
                                    <div className='w-full h-2/5 flex flex-col justify-between px-2 gap-4'>
                                        <div className='flex flex-col gap-4'>
                                            <p className='text-xl font-semibold'>{item.name}</p>
                                            <p className='text-sm line-clamp-2'>{item.description.slice(7, )}</p>
                                        </div>
                                        <div className='flex justify-between'>
                                        <button className='bg-black text-white py-1 px-3 rounded-md w-fit cursor-pointer' onClick={() => setCart((prev) => [...prev, item])}>اضف الي سلتك</button>
                                        <p className='text-xl font-bold'>{item.description.slice(0, 7)}</p>
                                        </div>
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