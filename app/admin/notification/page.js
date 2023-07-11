'use client'

import LayoutsAdmin from '@/components/Layouts/Admin/Layouts'
import headers from '@/config/headers'
import Token from '@/config/userToken'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function AddProduct() {
    const [user, setUser] = useState([])
    const [title, setArtname] = useState('')
    const [content, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)

    const router = useRouter()

    const [isErrorArtname, setIsErrorArtname] = useState('')
    const [isErrorDesc, setIsErrorDesc] = useState('')
    const [isErrorImage, setIsErrorImage] = useState('')
    const [isError, setIsError] = useState('')

    useEffect(() => {
        setUser(Token())
    }, [])

    const handleImageSelect = (event) => {
        const file = event.target.files[0]
        setSelectedImage(file)
        setImage(file)
    }

    console.log(image)

    const handleAdd = async (event) => {
        event.preventDefault()
        const url = process.env.NEXT_PUBLIC_API_URL
        
        try {
            const response = await axios.post(`${url}/notification/create`,{
                title,
                content,
                image,
            }, {
                headers: {
                    'authorization': process.env.NEXT_PUBLIC_API_KEY,
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            })

            const responseData = response.data

            console.log(responseData)

            if (responseData.status == 200) {
                Swal.fire({
                    title: 'Success Add Informatiosn',
                    text: responseData.message,
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    willClose: () => {
                        router.push('/admin/notification')
                    }
                })
            }
            
        } catch (error) {
            setIsErrorArtname(error.response?.data?.errors?.title || null)
            setIsErrorDesc(error.response?.data?.errors?.content || null)
            setIsErrorImage(error.response?.data?.errors?.image || null)
            setIsError(error.response?.data?.message || null)

            console.error(error)
        }
    }

    return (
        <LayoutsAdmin>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Add Notification</h5>
                    </div>
                    <hr />
                    <div className="mt-10">
                        <form onSubmit={handleAdd}>
                            <div className="row">
                                <div className="col-12">
                                    {isError && (
                                        <div className="alert alert-danger bg-red-100 border-2 border-red-200">
                                            {isError}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <label className="font-weight-semibold">Content:</label>
                                        <textarea className={`form-control ${isErrorDesc === '' ? '' : isErrorDesc !== null ? 'is-invalid' : 'is-valid'}`} cols="10" rows="10" onChange={(e) => setDescription(e.target.value)}></textarea>
                                        {isErrorDesc !== null && (
                                        <div className="invalid-feedback">
                                            {isErrorDesc}
                                        </div>
                                    )}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <div className="d-flex align-items-center justify-content-between p-t-15">
                                            <button className="btn btn-primary w-100">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </LayoutsAdmin>
    )
}
