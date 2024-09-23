import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Signin = () => {
    const [role, setRole] = useState('user')
    const location = useLocation()
    const {state} = location 
    console.log(role)
    useEffect(() => {
        state && setRole(state.role)
    }, [])
    return (
        <div className='w-screen min-h-screen bg-gray-300 flex justify-center items-center p-5'>
            <div className='md:w-1/2 sm:w-3/4 max-sm:w-full bg-white p-5 flex flex-col gap-10 rounded-lg border-t-8 border-black'>
                <h1 className='text-3xl font-bold '> انشئ حسابك ك{role == 'user' && 'عميل'} {role == 'seller' && 'اسرة منتجة'} </h1>
                <form action="" className='flex flex-col gap-8'>
                    <input type="text" name="name" id="name" required className='h-[50px] bg-gray-300 p-4 rounded-lg text-black placeholder:text-gray-600' placeholder='الاسم' />
                    <input type="email" name="email" id="email" required className='h-[50px] bg-gray-300 p-4 rounded-lg text-black placeholder:text-gray-600' placeholder='البريد الالكتروني' />
                    <input type="password" name="password" id="password" required className='h-[50px] bg-gray-300 p-4 rounded-lg text-black placeholder:text-gray-600' placeholder='كلمة السر' />
                    <input type="text" name="phone" id="phone" required className='h-[50px] bg-gray-300 p-4 rounded-lg text-black placeholder:text-gray-600' placeholder='رقم الهاتف' />
                    {role == 'seller' && <input type="text" required name="docNo" id="docNo" className='h-[50px] bg-gray-300 p-4 rounded-lg text-black placeholder:text-gray-600' placeholder='رقم الوثيقة' />}
                    <input type="submit" name="submit" id="submit" className='h-[50px] bg-black text-white p-4 rounded-lg cursor-pointer' value={'تسجيل'} />
                </form>
                <div className='flex flex-col gap-4'>
                    <hr />
                    <p className='text-lg text-center'>تسجيل دخول :</p>
                    <div className='flex justify-center gap-4'>
                        {(role == 'seller') && <button className='w-1/2 bg-gray-300 border-2 border-black py-2 rounded-lg text-black cursor-pointer' onClick={() => setRole('user')}>عميل</button>}
                        {(role == 'user') && <button className='w-1/2 bg-gray-300 border-2 border-black py-2 rounded-lg text-black cursor-pointer' onClick={() => setRole('seller')}>اسرة منتجة</button>}
                    </div>
                </div>
                <div >
                    <hr />
                    <p className='text-lg text-center mt-4'>
                        <span className='ml-2'> لديك حساب؟</span>
                        <Link to={'/login'} className='underline underline-offset-2 cursor-pointer'>
                        تسجيل دخول
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signin