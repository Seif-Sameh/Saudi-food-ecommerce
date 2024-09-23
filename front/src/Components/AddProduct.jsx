import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const AddProduct = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [img, setImg] = useState(null)

    const navigate = useNavigate()

    const addProduct = () => {
        const file = new FormData()
        file.append('product_name', name)
        file.append('product_description', description)
        file.append('category', category)
        file.append('file', img)
        axios.post('http://localhost/e-commerce/add_product.php', file, {withCredentials: true})
        .then((res) => (res.data))
        .then((data) => {
            if(data.status == 'OK'){
                navigate('/seller')
            }
        })
    }

  return (
    <div className='w-screen min-h-screen bg-gray-300 flex justify-center items-center p-5'>
            <div className='md:w-1/2 sm:w-3/4 max-sm:w-full bg-white p-5 flex flex-col gap-10 rounded-lg border-t-8 border-black'>
                <h1 className='text-3xl font-bold '>إضافة منتج</h1>
                <form action="" className='flex flex-col gap-8'
                    onSubmit={(e) => {
                        e.preventDefault()
                        addProduct()
                    }}
                >
                    <input type="text" name="name" id="name" required className='h-[50px] bg-gray-300 p-4 rounded-lg text-black placeholder:text-gray-600' placeholder='اسم المنتج' onChange={(e) => setName(e.target.value)}/>
                    <label>الفئة</label>
                    <select name="category" id="category" onChange={(e) => setCategory(e.target.value)} defaultValue={'default'}>
                        <option value="default" disabled>اختر فئة المنتج</option>
                        <option value="meal">وجبة</option>
                        <option value="drink">مشروب</option>
                        <option value="dessert">حلويات</option>
                    </select>
                    <input type="text" name="description" id="description" required className='h-[50px] bg-gray-300 p-4 rounded-lg text-black placeholder:text-gray-600' placeholder='وصف المنتج' onChange={(e) => setDescription(e.target.value)}/>
                    <input type="file" name="img" id="img" onChange={(e) => {setImg(e.target.files[0])}}/>
                    <input type="submit" name="submit" id="submit" className='h-[50px] bg-black text-white p-4 rounded-lg cursor-pointer' value={'إضافة'} />
                </form>
                
            </div>
        </div>
  )
}

export default AddProduct