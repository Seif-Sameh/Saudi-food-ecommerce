import React from 'react'
import image1 from '../assets/image-1.png'
import {Link} from 'react-router-dom'
import image2 from '../assets/image-2.png'
import image3 from '../assets/image-3.svg'
import image4 from '../assets/image-4.svg'
import image5 from '../assets/image-5.svg'

const Landing = () => {
  return (
    <div className='bg-white w-full min-h-screen flex flex-col'>
        <div className='w-full h-screen relative'>
            <img src={image1} alt="" className='w-full h-full object-cover'/>
            <div className='bg-black w-full h-full absolute left-0 top-0 bg-opacity-60 flex flex-col items-center justify-center px-5 gap-4'>
                <h1 className='text-white text-[60px] font-bold text-center max-md:text-[40px]'>اكتشف معنا عالم الأكلات الشعبية السعودية</h1>
                <div className='flex gap-4'>
                    <Link to={'/login'}>
                    <button className='bg-black text-lg text-white px-3 py-1 rounded-md cursor-pointer'>تسجيل دخول</button>
                    </Link>
                    <Link to={'/signin'}>
                    <button className='bg-black text-lg text-white px-3 py-1 rounded-md cursor-pointer'> انشاء حساب</button>
                    </Link>
                </div>
            </div>
        </div>
        <div className='container mx-auto py-[70px] px-10'>
            <p className='text-3xl font-bold mb-3'>سلاسة عملية طلبك</p>
            <hr />
            <div className='flex gap-4 max-md:flex-col'>
                <div className='w-1/3 flex flex-col max-md:w-full'>
                    <div className='h-[300px] flex items-center'>
                    <img src={image4} alt=""  className='w-full h-[220px]'/>
                    </div>
                    <p className='text-2xl pr-10'>١. تصفح منتجاتنا</p>
                </div>
                <div className='w-1/3 flex flex-col max-md:w-full'>
                <div className='h-[300px] flex items-center justify-center'>
                    <img src={image2} alt=""  className=' h-[300px]'/>
                </div>
                    <p className='text-2xl pr-10'>٢. اضف الي سلتك</p>
                </div>
                <div className='w-1/3 flex flex-col max-md:w-full'>
                <div className='h-[300px] flex items-center'>
                    <img src={image3} alt=""  className='w-full h-[200px]'/>
                </div>
                    <p className='text-2xl pr-10'>٣. تابع واستلم</p>
                </div>
            </div>
        </div>
        <div className='container mx-auto py-[70px] px-10'>
            <p className='text-3xl font-bold mb-3'>انضم الينا</p>
            <hr />
            <div className='flex mt-8 max-md:flex-col gap-5'>
                <div className='w-1/2 max-md:w-full flex justify-center '>
                    <img src={image5} alt=""  className='w-[300px]'/>
                </div>
                <div className='w-1/2 max-md:w-full flex flex-col justify-center items-center gap-5'>
                    <p className='text-3xl font-bold mb-3'>انضم الي اسرنا المنتجة</p>
                    <Link to={'/signin'} state={{role: 'seller'}}>
                    <button className='bg-black text-3xl text-white px-5 py-2 rounded-md cursor-pointer'> انشئ اسرتك المنتجة</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landing