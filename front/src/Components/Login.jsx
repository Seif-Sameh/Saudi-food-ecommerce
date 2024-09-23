import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()

    const [role, setRole] = useState('user')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {
        axios.post('http://localhost/e-commerce/login.php', { email, password, role })
        .then((res) => (res.data))
        .then((data) => {
            if(data.status == 'OK'){
                if(role == 'user'){
                    navigate('/products')
                }
                else if(role == 'seller'){
                    navigate('/seller')
                }
                else if(role == 'admin'){
                    navigate('/admin')
                }
            }
        })
    }

    return (
        <div className='w-screen min-h-screen bg-gray-300 flex justify-center items-center p-5'>
            <div className='md:w-1/2 sm:w-3/4 max-sm:w-full bg-white p-5 flex flex-col gap-10 rounded-lg border-t-8 border-black'>
                <h1 className='text-3xl font-bold '>تسجيل دخول {role == 'user' && 'عميل'} {role == 'seller' && 'اسرة منتجة'} {role == 'admin' && 'ادمن'}</h1>
                <form action="" className='flex flex-col gap-8'
                    onSubmit={(e) => {
                        e.preventDefault()
                        login()
                    }}
                >
                    <input type="email" name="email" id="email" required className='h-[50px] bg-gray-300 p-4 rounded-lg text-black placeholder:text-gray-600' placeholder='البريد الالكتروني' onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" name="password" id="password" required className='h-[50px] bg-gray-300 p-4 rounded-lg text-black placeholder:text-gray-600' placeholder='كلمة السر' onChange={(e) => setPassword(e.target.value)}/>
                    <input type="submit" name="submit" id="submit" className='h-[50px] bg-black text-white p-4 rounded-lg cursor-pointer' value={'دخول'} />
                </form>
                <div className='flex flex-col gap-4'>
                    <hr />
                    <p className='text-lg text-center'>تسجيل دخول :</p>
                    <div className='flex justify-between gap-4'>
                        {(role == 'seller' || role == 'admin') && <button className='w-1/2 bg-gray-300 border-2 border-black py-2 rounded-lg text-black cursor-pointer' onClick={() => setRole('user')}>عميل</button>}
                        {(role == 'admin' || role == 'user') && <button className='w-1/2 bg-gray-300 border-2 border-black py-2 rounded-lg text-black cursor-pointer' onClick={() => setRole('seller')}>اسرة منتجة</button>}
                        {(role == 'seller' || role == 'user') && <button className='w-1/2 bg-gray-300 border-2 border-black rounded-lg text-black cursor-pointer' onClick={() => setRole('admin')}>ادمن</button>}
                    </div>
                </div>
                <div >
                    <hr />
                    <p className='text-lg text-center mt-4'>
                        <span className='ml-2'> ليس لديك حساب؟</span>
                        <Link to={'/signin'} className='underline underline-offset-2 cursor-pointer'>
                        انضم إلينا الان
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login