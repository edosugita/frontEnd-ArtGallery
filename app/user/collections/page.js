'use client'

import { useEffect, useState } from 'react'
import style from '@/styles/SectionHome/SectionTwo.module.css'
import Image from 'next/image'
import LayoutsUser from '@/components/Layouts/User/Layouts'
import Cookies from 'js-cookie'
import Token from '@/config/userToken'
import axios from 'axios'
import headers from '@/config/headers'
import Link from 'next/link'

export default function CollectionsDetail() {
    const [user, setUser] = useState([])
    const [data, setData] = useState([])    
    const [isLoading, setIsLoading] = useState(true)    
    const userToken = Cookies.get('token')

    useEffect(() => {
        setUser(userToken !== undefined ? Token() : null)
    }, [userToken])

    const uuid = user.uuid

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/collection/get/${uuid}`, {
                    headers: headers,
                    withCredentials: true
                })
                const responseData = Object.values(response.data.data)
                setData(responseData)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        
        fetchData()
    }, [uuid, data])

    console.log(data)

    return (
        <>
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center vh-100" style={{backgroundColor: '#141414'}}>
                    <div class="spinner-grow text-danger" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <LayoutsUser>
                    <div className="container p-5">
                        <section className={style.section_one}>
                            <div className="row">
                                <div className="col-md-12 mb-5">
                                    <div className={style.section_img}>
                                        <h5 className={style.h5}>My Collection</h5>
                                    </div>
                                </div>
                                
                                {data ? data.map((item) => (
                                    <div className='col-md-4 col-sm-6 col-12 mb-3 h-100' key={item.uuid_art}>
                                        <Link className="text-decoration-none text-light" href={`/user/collections/detail/${item.uuid_art}`}>
                                            <div className={style.card}>
                                                <div style={{height: '300px', width: '100%', overflow: "hidden"}}>
                                                    <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.art.image}`} alt="Image Slider" height="520" width="520" className="rounded" style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} />
                                                </div>
                                                <div className={style.card_body}>
                                                    <h5 style={{height:'4rem'}}>{item.art.artname}</h5>
                                                    <div className="mb-3 mt-2">
                                                        {item.art.kategori.split(",").map((kategori) => (
                                                            <span key={kategori} className="badge me-2 mb-1 text-uppercase" style={{background: '#2E2E2E', color: '#EBEBEB'}}>{kategori}</span>
                                                        ))}
                                                    </div>
                                                    <p><span>By</span> {item.art.artist}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )) : (
                                    <>
                                        <div className="d-flex justify-content-center align-items-ceter text-ceter">
                                            <h5>No Collections</h5>
                                        </div>
                                    </>
                                )}
                            </div>
                        </section>
                    </div>
                </LayoutsUser>
            )}
        </>
    )
}
