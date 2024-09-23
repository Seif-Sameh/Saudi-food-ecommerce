import React, { useState } from 'react'
import { FaShippingFast } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {
    const location = useLocation()

    const [complaint, setComplaint] = useState('')
    const [showForm, setShowForm] = useState(false)

    const addComplaint = () => {
        axios.post('http://localhost/e-commerce/add_complaint.php', { name: localStorage.getItem('name'), id: localStorage.getItem('id'), complaint: complaint })
          .then((res) => (res.data))
          .then((data) => {
            if (data.status == 'OK') {
                window.scrollTo(0, 0)
            }
          })
    }

    return (
        
        <div className='w-full  px-[50px] py-[40px] bg-black text-white text-lg flex flex-col gap-8'>
            {location.pathname == '/products' && <>
            <button className='text-black w-fit bg-white px-4 py-1 rounded-md cursor-pointer' onClick={() => setShowForm(!showForm)}>الشكاوي والمقترحات</button>
            {showForm && 
            <div className="p-4 py-6 rounded-lg bg-gray-50 md:p-8">
                <div >
                    <div className="-mx-2 md:items-center md:flex">
                        <div className="flex-1 px-2">
                            <label className="block mb-2 text-sm text-gray-600 ">الاسم الأول</label>
                            <input type="text" placeholder="John " className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg " />
                        </div>

                        <div className="flex-1 px-2 mt-4 md:mt-0">
                            <label className="block mb-2 text-sm text-gray-600 ">الاسم الأخير</label>
                            <input type="text" placeholder="Doe" className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg " />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block mb-2 text-sm text-gray-600 ">البريد الالكتروني</label>
                        <input type="email" placeholder="johndoe@example.com" className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg " />
                    </div>

                    <div className="w-full mt-4">
                        <label className="block mb-2 text-sm text-gray-600 " >الشكوي</label>
                        <textarea className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 " placeholder="Message"
                            onChange={(e) => setComplaint(e.target.value)}
                        ></textarea>
                    </div>

                    <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg hover:bg-gray-800 "
                        onClick={() => addComplaint()}
                    >
                        ارسال
                    </button>
                </div>
            </div>}
           </> }

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