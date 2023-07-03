'use client'

import LayoutsAdmin from '@/components/Layouts/Admin/Layouts'
import headers from '@/config/headers'
import Token from '@/config/userToken'
import { DatePicker, TimePicker } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function AddProductAuction() {
    const [user, setUser] = useState([])
    const [artname, setArtname] = useState('')
    const [artist, setArtist] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [dimension, setDimension] = useState('')
    const [bid_price, setPrice] = useState('')
    const [kategori, setCategory] = useState('')
    const [start_bid, setStartDate] = useState('')
    const [end_bid, setEndDate] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)

     const handleStartDateChange = (date) => {
        const formattedDate = date.format("YYYY-MM-DD HH:mm:ss")
        setStartDate(formattedDate);
    }

    const handleEndDateChange = (date) => {
        const formattedDate = date.format("YYYY-MM-DD HH:mm:ss")
        setEndDate(formattedDate);
    }


    const router = useRouter()

    const [isErrorArtname, setIsErrorArtname] = useState('')
    const [isErrorArtist, setIsErrorArtist] = useState('')
    const [isErrorDesc, setIsErrorDesc] = useState('')
    const [isErrorImage, setIsErrorImage] = useState('')
    const [isErrorDimension, setIsErrorDimension] = useState('')
    const [isErrorPrice, setIsErrorPrice] = useState('')
    const [isErrorCategory, setIsErrorCategory] = useState('')
    const [isError, setIsError] = useState('')

    useEffect(() => {
        setUser(Token())
    }, [])

    const handleImageSelect = (event) => {
        const file = event.target.files[0]
        setSelectedImage(file)
        setImage(file)
    }

    const handleAdd = async (event) => {
        event.preventDefault()
        const url = process.env.NEXT_PUBLIC_API_URL
        const uuid = user.uuid
        
        try {
            const response = await axios.post(`${url}/product/auction/create`,{
                uuid,
                artname,
                artist,
                description,
                image,
                dimension,
                start_bid,
                end_bid,
                bid_price,
                kategori
            }, {
                headers: {
                    'authorization': process.env.NEXT_PUBLIC_API_KEY,
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            })

            const responseData = response.data

            console.log(responseData)

            if (responseData.status == 201) {
                Swal.fire({
                    title: 'Success Add Product',
                    text: responseData.message,
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    willClose: () => {
                        router.push('/admin/product/auction')
                    }
                })
            }
            
        } catch (error) {
            setIsErrorArtname(error.response?.data?.errors?.artname || null);
            setIsErrorArtist(error.response?.data?.errors?.artist || null)
            setIsErrorDesc(error.response?.data?.errors?.description || null)
            setIsErrorImage(error.response?.data?.errors?.image || null)
            setIsErrorDimension(error.response?.data?.errors?.dimension || null)
            setIsErrorPrice(error.response?.data?.errors?.bid_price || null)
            setIsErrorCategory(error.response?.data?.errors?.kategori || null)
            setIsError(error.response?.data?.message || null)

            console.error(error)
        }
    }

    return (
        <LayoutsAdmin>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Add Product For Sale</h5>
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
                                        <label className="font-weight-semibold">Art Name:</label>
                                        <input type="text" className={`form-control ${isErrorArtname === '' ? '' : isErrorArtname !== null ? 'is-invalid' : 'is-valid'}`} onChange={(e) => setArtname(e.target.value)} placeholder="The Starry Night" />
                                        {isErrorArtname !== null && (
                                        <div className="invalid-feedback">
                                            {isErrorArtname}
                                        </div>
                                    )}
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label className="font-weight-semibold">Artist:</label>
                                        <input type="text" className={`form-control ${isErrorArtist === '' ? '' : isErrorArtist !== null ? 'is-invalid' : 'is-valid'}`} onChange={(e) => setArtist(e.target.value)} placeholder="Vincent van Gogh" />
                                        {isErrorArtist !== null && (
                                        <div className="invalid-feedback">
                                            {isErrorArtist}
                                        </div>
                                    )}
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label className="font-weight-semibold">Dimension:</label>
                                        <input type="text" className={`form-control ${isErrorDimension === '' ? '' : isErrorDimension !== null ? 'is-invalid' : 'is-valid'}`} onChange={(e) => setDimension(e.target.value)} placeholder="74 x 92 cm" />
                                        {isErrorDimension !== null && (
                                        <div className="invalid-feedback">
                                            {isErrorDimension}
                                        </div>
                                    )}
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label className="font-weight-semibold">Price:</label>
                                        <input type="text" className={`form-control ${isErrorPrice === '' ? '' : isErrorPrice !== null ? 'is-invalid' : 'is-valid'}`} onChange={(e) => setPrice(e.target.value)} placeholder="10000000" />
                                        {isErrorPrice !== null && (
                                            <div className="invalid-feedback">
                                                {isErrorPrice}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <label className="font-weight-semibold">Category:</label>
                                    <input type="text" className={`form-control ${isErrorCategory === '' ? '' : isErrorCategory !== null ? 'is-invalid' : 'is-valid'}`} onChange={(e) => setCategory(e.target.value)} placeholder="category1, category2, categosy3 (max 3)" />
                                </div>
                                <div className="col-md-12 col-sm-12">   
                                    <div className="form-group">
                                        <label>Date Auction</label>
                                        <div className="d-flex align-items-center">
                                            <DatePicker 
                                                showTime
                                                onChange={handleStartDateChange}
                                                className={`form-control`}
                                            />

                                            <span className="p-h-10">to</span>
                                            
                                            <DatePicker 
                                                showTime
                                                onChange={handleEndDateChange}
                                                className={`form-control`}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <label className="font-weight-semibold">Image:</label>
                                        <div className="custom-file">
                                            <input type="file" className={`custom-file-input ${isErrorImage === '' ? '' : isErrorImage !== null ? 'is-invalid' : 'is-valid'}`} id="customFile" onChange={handleImageSelect} />
                                            <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                        </div>

                                        {isErrorImage !== null && (
                                            <div className="invalid-feedback">
                                                {isErrorImage}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {selectedImage && (
                                    <div className="col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <label className="font-weight-semibold">Image Preview:</label>
                                            <div className="w-full h-80 rounded">
                                                <div className='w-full h-full relative'>
                                                    <Image
                                                        src={URL.createObjectURL(selectedImage)}
                                                        alt="Preview"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        objectPosition="center"
                                                        className="rounded"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <label className="font-weight-semibold">Description:</label>
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
