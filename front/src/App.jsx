import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Signin from './Components/Signin'
import MainPage from './Components/MainPage'
import ProductsPage from './Components/ProductsPage'
import Landing from './Components/Landing'
import Cart from './Components/Cart'
import SellerDashboard from './Components/SellerDashboard'
import AddProduct from './Components/AddProduct'

function App() {

  return (
    <> 
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='' element={<MainPage/>}>
        <Route index element={<Landing/>}/>
        <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/seller' element={<SellerDashboard/>}/>
        <Route path='/add_product' element={<AddProduct/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
