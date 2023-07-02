'use client'
import LayoutsAdmin from '@/components/Layouts/Admin/Layouts'
import headers from '@/config/headers'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import numeral from 'numeral'
import { useEffect, useState } from 'react'

export default function Product() {
    const [dataProduct, setDataProduct] = useState([])

    const router = useRouter()

    useEffect(() => {

        const getData = async () => {
            const url = process.env.NEXT_PUBLIC_API_URL

            try {
                const response = await axios.get(`${url}/product/sell/get`, {headers: headers})
                setDataProduct(response.data.data)
            } catch (error) {
                console.error(error)
            }
        }

        getData()
    }, [])

    console.log(dataProduct)

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
