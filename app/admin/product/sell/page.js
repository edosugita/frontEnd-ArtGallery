'use client'
import LayoutsAdmin from '@/components/Layouts/Admin/Layouts'
import headers from '@/config/headers'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import numeral from 'numeral'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function Product() {
    const [dataProduct, setDataProduct] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    useEffect(() => {

        const getData = async () => {
            const url = process.env.NEXT_PUBLIC_API_URL

            try {
                const response = await axios.get(`${url}/product/sell/get`, {headers: headers})
                const dataArray = Object.values(response.data.data);
                setDataProduct(dataArray)
            } catch (error) {
                console.error(error)
            }
        }

        getData()
    }, [])

    const handleDelete = (data) => {
        const url = process.env.NEXT_PUBLIC_API_URL
        console.log(data)

        Swal.fire({
            title: 'Are you sure?',
            html: `Are you sure you want to delete this data <b>${data.artname}</b>?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
            }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setIsLoading(true)

                    const uuid = data.uuid_art
                    const response = await axios.post(`${url}/product/sell/delete/${uuid}`,{
                        
                    }, {
                        headers: headers,
                        withCredentials: true
                    })

                    const updatedDataProduct = dataProduct.filter(item => item.uuid_art !== uuid)
                    setDataProduct(updatedDataProduct)
                    
                    Swal.fire('Deleted!', 'Your data has been deleted.', 'success')
                } catch (error) {
                     Swal.fire('Error!', 'An error occurred while deleting the data.', 'error')
                } finally {
                    setIsLoading(false);
                }
            }
        })
    }

    return (
        <LayoutsAdmin>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Product For Sell</h5>
                        <button className="btn btn-primary m-r-5" onClick={() => router.push('/admin/product/sell/add')}>Add Product</button>
                    </div>
                    <hr />
                    <div className="mt-10">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Art Name</th>
                                        <th>Artist</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Activate Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataProduct && dataProduct.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.artname}</td>
                                            <td>{item.artist}</td>
                                            <td>
                                                <div className="h-16 w-16">
                                                    <div className="w-full h-full">
                                                        <Image 
                                                            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.image}`}
                                                            alt='Arts Gallery'
                                                            height={512}
                                                            width={512}
                                                            className='h-full w-full rounded'
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Rp. {numeral(item.price).format('0,0')}</td>
                                            <td>{item.status === "1" ? 'Tersedia' : 'Terjual'}</td>
                                            <td>
                                                <Link className="btn btn-primary" href={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.image}`} target='_blank'>
                                                    Active
                                                    <i class="anticon anticon-compass"></i>
                                                </Link>
                                            </td>
                                            <td>
                                                <button className="btn btn-error" onClick={() => handleDelete(item)} >
                                                    <i className="anticon anticon-delete"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutsAdmin>
    )
}
