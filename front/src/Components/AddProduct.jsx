import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddProduct = ({name, id}) => {

    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [img, setImg] = useState(null)
    const [price, setPrice] = useState(0)

    const navigate = useNavigate()

    const addProduct = () => {
        const file = new FormData()
        file.append('name', name)
        file.append('id', id)
        file.append('product_name', productName)
        file.append('product_description', description)
        file.append('category', category)
        file.append('price', price)
        file.append('image', img)
        axios.post('http://localhost/e-commerce/add_product.php', file, {
            headers: {
              "Content-Type": 'multipart/form-data'
            }, 
        })
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
                    <input type="text" name="name" id="name" required className='h-[50px] bg-gray-300 p-4 rounded-lg text-black placeholder:text-gray-600' placeholder='اسم المنتج' onChange={(e) => setProductName(e.target.value)}/>
                    <div className='flex flex-col gap-3'>
                    <label>الفئة</label>
                    <select name="category" id="category" className='bg-gray-300 p-2 rounded-md' onChange={(e) => setCategory(e.target.value)} defaultValue={'default'}>
                        <option value="default" disabled>اختر فئة المنتج</option>
                        <option value="meal">وجبة</option>
                        <option value="drink">مشروب</option>
                        <option value="dessert">حلويات</option>
                    </select>
                    </div>
                    <input type="text" name="description" id="description" required className='h-[50px] bg-gray-300 p-4 rounded-lg text-black placeholder:text-gray-600' placeholder='وصف المنتج' onChange={(e) => setDescription(e.target.value)}/>
                    <input type="file" name="img" id="img" required onChange={(e) => {setImg(e.target.files[0])}}/>
                    <input type="text" name="price" id="price" required className='h-[50px] bg-gray-300 p-4 rounded-lg text-black placeholder:text-gray-600' placeholder='السعر' onChange={(e) => {setPrice(e.target.value)}}/>
                    <input type="submit" name="submit" id="submit" className='h-[50px] bg-black text-white p-4 rounded-lg cursor-pointer' value={'إضافة'} />
                </form>
                
            </div>
        </div>
  )
}

export default AddProduct