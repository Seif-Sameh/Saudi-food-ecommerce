import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const MainPage = () => {
  return (
    <div className='w-screen h-full min-h-screen flex flex-col justify-between bg-gray-300 '>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default MainPage