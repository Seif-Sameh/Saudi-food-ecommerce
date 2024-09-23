import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'

const MainPage = () => {
  const location = useLocation()

  return (
    <div className='w-screen h-full min-h-screen flex flex-col justify-between bg-gray-300 '>
        <Outlet/>
        {location.pathname != '/admin' && <Footer/>}
    </div>
  )
}

export default MainPage