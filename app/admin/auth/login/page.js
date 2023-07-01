'use client'
import LayoutsAdminAuth from '@/components/Layouts/Admin/LayoutsAuth'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import headers from '@/config/headers'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isErrorEmail, setIsErrorEmail] = useState('')
    const [isErrorPassword, setIsErrorPassword] = useState('')
    const [isError, setIsError] = useState('')

    const router = useRouter()
    

    const handleSignIn = async (event) => {
        event.preventDefault()
        const url = process.env.NEXT_PUBLIC_API_URL
        
        try {
            const response = await axios.post(`${url}/user/login`,{
                email,
                password,
            }, {
                headers: headers,
                withCredentials: true
            })

            const responseData = response.data
            
            if (responseData.status == 200) {
                Swal.fire({
                    title: 'Login Success',
                    text: responseData.message,
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    willClose: () => {
                        Cookies.set('token', responseData.data.token, { expires: 60 })
                        router.push('/admin/dashboard')
                    }
                })
            }
            
        } catch (error) {
            setIsErrorEmail(error.response?.data?.errors?.email || null)
            setIsErrorPassword(error.response?.data?.errors?.password || null)
            setIsError(error.response?.data?.message || null)

            console.error(error)
        }
    }

    return (
        <LayoutsAdminAuth>
            <div className="col-lg-8 bg-white">
                <div className="container h-100">
                    <div className="row no-gutters h-100 align-items-center">
                        <div className="col-md-8 col-lg-7 col-xl-6 mx-auto">
                            <div className="flex justify-between">
                                <h2 className='text-xl font-bold'>Sign In</h2>
                            </div>
                            <p className="m-b-30">Login your account to get access</p>
                            {isError && (
                                <div className="alert alert-danger bg-red-100 border-2 border-red-200">
                                    {isError}
                                </div>
                            )}
                            <form onSubmit={handleSignIn}>
                                <div className="form-group">
                                    <label className="font-weight-semibold">Email:</label>
                                    <input type="email" className={`form-control ${isErrorEmail === '' ? '' : isErrorEmail !== null ? 'is-invalid' : 'is-valid'}`} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                    {isErrorEmail !== null && (
                                        <div className="invalid-feedback">
                                            {isErrorEmail}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-semibold">Password:</label>
                                    <input type="password" className={`form-control ${isErrorPassword === '' ? '' : isErrorPassword !== null ? 'is-invalid' : 'is-valid'}`} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                    {isErrorPassword !== null && (
                                        <div className="invalid-feedback">
                                            {isErrorPassword}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <div className="text-end">
                                        <Link href={'/admin/auth/register'}>Dont have an account?</Link>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="d-flex align-items-center justify-content-between p-t-15">
                                        <button type='submit' className="btn btn-primary w-100">Sign In</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>  
                </div>
            </div>
        </LayoutsAdminAuth>
    )
}
