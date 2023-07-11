'use client'

import {useEffect, useState} from 'react'
import style from '@/styles/Information/Information.module.css'
import ArtTest from '@/public/images/png/Image.png'
import Image from 'next/image'
import Link from 'next/link'
import LayoutsUser from '@/components/Layouts/User/Layouts'
import { useParams, usePathname } from 'next/navigation'
import axios from 'axios'
import headers from '@/config/headers'

export default function DetailInformation() {
    const params = useParams()
    const [data, setData] = useState(null)
    const [dataAll, setDataAll] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchDataAll() {
            try {
               const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/information/get/${params.slug}`, {
                    headers: headers,
                    withCredentials: true
                })
                const data = response.data.data
                setData(data)
                setIsLoading(false)
            } catch (e) {
                console.error(e)
            }
        }

        fetchDataAll()
    }, [params])

    useEffect(() => {
        async function fetchDataAll() {
            try {
               const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/information/get`, {
                    headers: headers,
                    withCredentials: true
                })
                const dataAll = Object.values(response.data.data)
                const slicedData = dataAll.slice(0, 5)
                setDataAll(slicedData)
                setIsLoading(false)
            } catch (e) {
                console.error(e)
            }
        }

        fetchDataAll()
    }, [])

    const formatDate = (date) => {
        const formattedDate = new Date(date)
        const day = formattedDate.getDate().toString().padStart(2, '0')
        const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0')
        const year = formattedDate.getFullYear()
        return `${day}/${month}/${year}`
    }

    return (
        <>
            <LayoutsUser>
                <div className="container p-5">
                    <div className="row">
                        <div className='col-md-7'>
                            <div className="information">
                                <div className={style.section_three_img}>
                                    <div style={{height: '400px', width: '100%', overflow: "hidden"}}>
                                        {data && (
                                            <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.image}`} alt="Image Slider" height="520" width="520" className="rounded" style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} />
                                        )}
                                    </div>
                                </div>
                                <div className={style.section_three_title}>
                                    {data && <h6>{data.title}</h6>}
                                </div>
                                <div className={style.section_three_desc}>
                                    {data && <p>{data.content}</p>}
                                </div>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <div className={`${style.list_information}`}>
                                {dataAll.map((item, index) => (
                                    <Link className="text-decoration-none text-light" href={'/news/detail/' + item.slug} key={index}>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className={style.list_img}>
                                                    <div style={{height: '75px', width: '100%', overflow: "hidden"}}>
                                                        <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.image}`} alt="Image Slider" height="520" width="520" className="rounded" style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-8 d-grid align-content-between">
                                                <div className={`col-12 ${style.list_title}`}>
                                                    <h6>{item.title}</h6>
                                                </div>
                                                <div className={`col-12 ${style.list_date}`}>
                                                    <p>{formatDate(item.created_at)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutsUser>
        </>
    )
}