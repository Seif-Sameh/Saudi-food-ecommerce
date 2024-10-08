import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Signin from './Components/Signin'
import MainPage from './Components/MainPage'
import ProductsPage from './Components/ProductsPage'
import Landing from './Components/Landing'
import Cart from './Components/Cart'
import SellerDashboard from './Components/SellerDashboard'
import AddProduct from './Components/AddProduct'
import AdminDashboard from './Components/AdminDashboard'

function App() {
  
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    localStorage.getItem('name') && setName(localStorage.getItem('name'))
    localStorage.getItem('id') && setId(localStorage.getItem('id'))
    localStorage.getItem('phone') && setPhone(localStorage.getItem('phone'))
  }, [])

  return (
    <> 
    <Routes>
      <Route path='/login' element={<Login setName={setName} setId={setId} setPhone={setPhone}/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='' element={<MainPage/>}>
        <Route index element={<Landing/>}/>
        <Route path='/products' element={<ProductsPage name={name} id={id}/>}/>
        <Route path='/seller' element={<SellerDashboard name={name} id={id}/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/add_product' element={<AddProduct name={name} id={id}/>}/>
        <Route path='/cart' element={<Cart name={name} id={id} phone={phone}/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
