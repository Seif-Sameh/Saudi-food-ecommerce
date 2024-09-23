import React from 'react'
import { FaShippingFast } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const Footer = () => {
    return (
        
        <div className='w-full  px-[50px] py-[40px] bg-black text-white text-lg flex flex-col'>
            <div className=''>

            </div>
            <div className='w-full flex sm:justify-between max-sm:flex-col gap-8'>
            <div className='flex flex-col justify-between'>
                <div className='flex flex-col gap-3'>
                    <FaShippingFast size={35} />
                    <p>توصيل سريع الي عتبة داركم</p>
                </div>
                <div className='flex gap-2'>
                    <FaFacebookSquare size={30} />
                    <FaSquareInstagram size={30} />
                    <FaTwitterSquare size={30} />
                </div>
            </div>
            <div className='flex flex-col justify-between gap-4'>
                <div className='flex flex-col gap-3'>
                    <p>تحتاج مساعدة؟</p>
                    <p>تواصل مع دعم العملاء علي مدار ٢٤ ساعة</p>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-2'>
                        <FaPhone size={30}/>
                        <p>+٠١٢٣٤٥٦٧٨٩</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <IoMail size={30}/>
                        <p>example@gmail.com</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Footer