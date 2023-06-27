'use client'
import LayoutsSellerAuth from '@/components/Layouts/Seller/LayoutsAuth'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import headers from '@/config/headers'
import Swal from 'sweetalert2'

export default function Register() {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setConfirmPassword] = useState('')
    const [isErrorName, setIsErrorName] = useState('')
    const [isErrorUsername, setIsErrorUsername] = useState('')
    const [isErrorEmail, setIsErrorEmail] = useState('')
    const [isErrorPhone, setIsErrorPhone] = useState('')
    const [isErrorPassword, setIsErrorPassword] = useState('')
    const [isErrorCPassword, setIsErrorCPassword] = useState('')
    const [isError, setIsError] = useState('')
    
    const status = 2

    const router = useRouter()
    
    const handleClick = () => {
        router.push('/seller/auth/login')
    }

    const handleSignUp = async (event) => {
        event.preventDefault()
        const url = process.env.NEXT_PUBLIC_API_URL
        
        try {
            const response = await axios.post(`${url}/user/create`,{
                name,
                username,
                email,
                phone,
                password,
                password_confirmation,
                status
            }, {
                headers: headers,
            })

            const responseData = response.data

            if (responseData.status == 201) {
                Swal.fire({
                    title: 'Success Register',
                    text: responseData.message,
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    willClose: () => {
                        router.push('/seller/auth/login')
                    }
                })
            }
            
        } catch (error) {
            setIsErrorName(error.response?.data?.errors?.name || null);
            setIsErrorUsername(error.response?.data?.errors?.username || null)
            setIsErrorEmail(error.response?.data?.errors?.email || null)
            setIsErrorPhone(error.response?.data?.errors?.phone || null)
            setIsErrorPassword(error.response?.data?.errors?.password || null)
            setIsErrorCPassword(error.response?.data?.errors?.password_confirmation || null)
            setIsError(error.response?.data?.message || null)

            console.error(error)
        }
    }

    return (
        <LayoutsSellerAuth>
            <div className="col-lg-8 bg-white">
                <div className="container h-100">
                    <div className="row no-gutters h-100 align-items-center">
                        <div className="col-md-8 col-lg-7 col-xl-6 mx-auto">
                            <div className="flex justify-between">
                                <h2 className='text-xl font-bold'>Sign Up</h2>
                                <button className="w-8 h-8 btn-circle flex items-center justify-center hover:bg-slate-200 duration-500" onClick={handleClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <p className="m-b-30">Create your account to get access</p>
                            {isError && (
                                <div class="alert alert-danger bg-red-100 border-2 border-red-200">
                                    {isError}
                                </div>
                            )}
                            <form onSubmit={handleSignUp} >
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" className={`form-control ${isErrorName === '' ? '' : isErrorName !== null ? 'is-invalid' : 'is-valid'}`} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
                                    {isErrorName !== null && (
                                        <div className="invalid-feedback">
                                            {isErrorName}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-semibold" htmlFor="userName">Username:</label>
                                    <input type="text" className={`form-control ${isErrorUsername === '' ? '' : isErrorUsername !== null ? 'is-invalid' : 'is-valid'}`} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                                    {isErrorUsername !== null && (
                                        <div className="invalid-feedback">
                                            {isErrorUsername}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-semibold" htmlFor="email">Email:</label>
                                    <input type="email" className={`form-control ${isErrorEmail === '' ? '' : isErrorEmail !== null ? 'is-invalid' : 'is-valid'}`} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                    {isErrorEmail !== null && (
                                        <div className="invalid-feedback">
                                            {isErrorEmail}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-semibold" htmlFor="phone">Phone:</label>
                                    <input type="tel" className={`form-control ${isErrorPhone === '' ? '' : isErrorPhone !== null ? 'is-invalid' : 'is-valid'}`} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
                                    {isErrorPhone !== null && (
                                        <div className="invalid-feedback">
                                            {isErrorPhone}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-semibold" htmlFor="password">Password:</label>
                                    <input type="password" className={`form-control ${isErrorPassword === '' ? '' : isErrorPassword !== null ? 'is-invalid' : 'is-valid'}`} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                    {isErrorPassword !== null && (
                                        <div className="invalid-feedback">
                                            {isErrorPassword}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-semibold" htmlFor="confirmPassword">Confirm Password:</label>
                                    <input type="password" className={`form-control ${isErrorCPassword === '' ? '' : isErrorCPassword !== null ? 'is-invalid' : 'is-valid'}`} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                                    {isErrorCPassword !== null && (
                                        <div className="invalid-feedback">
                                            {isErrorCPassword}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <div className="d-flex align-items-center justify-content-between p-t-15">
                                        <button type='submit' className="btn btn-primary w-100">Sign Up</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>  
                </div>
            </div>
        </LayoutsSellerAuth>
    )
}
