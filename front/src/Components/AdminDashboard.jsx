import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AdminDashboard = () => {

    const [users, setUsers] = useState([])
    const [found, setFound] = useState(false)

    const retriveUsers = () => {
        axios.post('http://localhost/e-commerce/retrieve_users.php', { }, {withCredentials: true} )
        .then((res) => (res.data))
        .then((data) => {
            if(data.status == 'OK'){
                setFound(data.found)
                setUsers(data.users)
            }
        })
    }
    const deleteUser = (id) => {
        axios.post('http://localhost/e-commerce/remove_user.php', {user_id: id }, {withCredentials: true} )
        .then((res) => (res.data))
        .then((data) => {
            if(data.status == 'OK'){
                retriveUsers()
            }
        })
    }
    const deactivateUser = (id) => {
        axios.post('http://localhost/e-commerce/deactivate_user.php', {user_id: id }, {withCredentials: true} )
        .then((res) => (res.data))
        .then((data) => {
            if(data.status == 'OK'){
                retriveUsers()
            }
        })
    }
    const activateUser = (id) => {
        axios.post('http://localhost/e-commerce/activate_user.php', {user_id: id }, {withCredentials: true} )
        .then((res) => (res.data))
        .then((data) => {
            if(data.status == 'OK'){
                retriveUsers()
            }
        })
    }

    const [sellers, setSellers] = useState([])
    const [sellersFound, setSellersFound] = useState(false)

    const retriveSellers = () => {
        axios.post('http://localhost/e-commerce/retrieve_sellers.php', { }, {withCredentials: true} )
        .then((res) => (res.data))
        .then((data) => {
            if(data.status == 'OK'){
                setSellersFound(data.found)
                setSellers(data.sellers)
            }
        })
    }
    const deleteSeller = (id) => {
        axios.post('http://localhost/e-commerce/remove_seller.php', {seller_id: id }, {withCredentials: true} )
        .then((res) => (res.data))
        .then((data) => {
            if(data.status == 'OK'){
                retriveSellers()
            }
        })
    }
    const deactivateSeller = (id) => {
        axios.post('http://localhost/e-commerce/deactivate_seller.php', {seller_id: id }, {withCredentials: true} )
        .then((res) => (res.data))
        .then((data) => {
            if(data.status == 'OK'){
                retriveSellers()
            }
        })
    }
    const activateSeller = (id) => {
        axios.post('http://localhost/e-commerce/activate_seller.php', {seller_id: id }, {withCredentials: true} )
        .then((res) => (res.data))
        .then((data) => {
            if(data.status == 'OK'){
                retriveSellers()
            }
        })
    }

    const [complaints, setComplaints] = useState([])
    const [complaintsFound, setComplaintsFound] = useState(false)

    const retriveComplaints = () => {
        axios.post('http://localhost/e-commerce/retrieve_complaints.php', { }, {withCredentials: true} )
        .then((res) => (res.data))
        .then((data) => {
            if(data.status == 'OK'){
                setComplaintsFound(data.found)
                setComplaints(data.complaints)
            }
        })
    }

    useEffect(() => {
        retriveUsers()
        retriveSellers()
        retriveComplaints()
    }, [])


  return (
    <div className='w-full min-h-screen bg-gray-300 py-[50px] px-10 flex flex-col gap-8'>
        <h1 className='text-3xl font-bold text-center '>الادمن</h1>
        <div className='flex flex-col'>
            <p className='text-lg mb-4'>المستخدمين</p>
            <table className='table-auto w-full'>
                <thead className='bg-black text-white'>
                    <th className='p-2 text-center'>اسم المستخدم</th>
                    <th className='p-2 text-center'>ايميل </th>
                    <th className='p-2 text-center'>اجراءات</th>
                </thead>
                <tbody>
                    {found && users.map((item) => (
                        <tr key={item.id} className='bg-white'> 
                            <td className='pr-2 py-2 text-center'>{item.name}</td>
                            <td className='py-2 text-center'>{item.email}</td>
                            <td className='py-2 text-center'>
                                {
                                    item.status == 'active' ? (
                                        <button className='bg-red-500 px-2 rounded-md text-white ml-2' onClick={() => deactivateUser(item.id)}>حظر</button>
                                    ) : (
                                        <button className='bg-green-500 px-2 rounded-md text-white ml-2' onClick={() => activateUser(item.id)}>تفعيل</button>
                                    )
                                }
                                <button className='bg-red-500 px-2 rounded-md text-white' onClick={() => deleteUser(item.id)}>حذف</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className='flex flex-col'>
            <p className='text-lg mb-4'>الاسر المنتجة</p>
            <table className='table-auto w-full'>
                <thead className='bg-black text-white'>
                    <th className='p-2 text-center'>اسم الاسرة</th>
                    <th className='p-2 text-center'>ايميل </th>
                    <th className='p-2 text-center'>اجراءات</th>
                </thead>
                <tbody>
                    {sellersFound && sellers.map((item) => (
                        <tr key={item.id} className='bg-white'> 
                            <td className='pr-2 py-2 text-center'>{item.name}</td>
                            <td className='py-2 text-center'>{item.email}</td>
                            <td className='py-2 text-center'>
                                {
                                    item.status == 'active' ? (
                                        <button className='bg-red-500 px-2 rounded-md text-white ml-2' onClick={() => deactivateSeller(item.id)}>حظر</button>
                                    ) : (
                                        <button className='bg-green-500 px-2 rounded-md text-white ml-2' onClick={() => activateSeller(item.id)}>تفعيل</button>
                                    )
                                }
                                <button className='bg-red-500 px-2 rounded-md text-white' onClick={() => deleteSeller(item.id)}>حذف</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className='flex flex-col'>
            <p className='text-lg mb-4'>الشكاوي</p>
            <table className='table-auto w-full'>
                <thead className='bg-black text-white'>
                    <th className='p-2 text-center'>اسم المستخدم</th>
                    <th className='p-2 text-center'>الشكوي </th>
                </thead>
                <tbody>
                    {complaintsFound && complaints.map((item) => (
                        <tr key={item.id} className='bg-white'> 
                            <td className='pr-2 py-2 text-center'>{item.name}</td>
                            <td className='py-2 text-center'>
                                <p>{item.complaint}</p>
                                <p className='text-sm text-gray-600'>{item.submitted_at}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AdminDashboard