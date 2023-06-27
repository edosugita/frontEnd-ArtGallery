'use client'
import LayoutsSellerAuth from '@/components/Layouts/Seller/LayoutsAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isErrorEmail, setIsErrorEmail] = useState('')
    const [isErrorPassword, setIsErrorPassword] = useState('')
    const [isError, setIsError] = useState('')

    const router = useRouter()
    

    const handleSignUp = async (event) => {
        event.preventDefault()
        const url = process.env.NEXT_PUBLIC_API_URL
        
        try {
            const response = await axios.post(`${url}/user/login`,{
                email,
                password,
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
            setIsErrorEmail(error.response?.data?.errors?.email || null)
            setIsErrorPassword(error.response?.data?.errors?.password || null)
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
                                <h2 className='text-xl font-bold'>Sign In</h2>
                            </div>
                            <p className="m-b-30">Login your account to get access</p>
                            <form>
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
                                    <label className="font-weight-semibold" htmlFor="password">Password:</label>
                                    <input type="password" className={`form-control ${isErrorPassword === '' ? '' : isErrorPassword !== null ? 'is-invalid' : 'is-valid'}`} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                    {isErrorPassword !== null && (
                                        <div className="invalid-feedback">
                                            {isErrorPassword}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <div className="text-end">
                                        <Link href={'/seller/auth/register'}>Dont have an account?</Link>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="d-flex align-items-center justify-content-between p-t-15">
                                        <button type='button' className="btn btn-primary w-100">Sign In</button>
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
