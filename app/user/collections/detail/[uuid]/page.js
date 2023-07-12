'use client'

import { useEffect, useState } from 'react'
import style from '@/styles/Detail.module.css'
import Image from 'next/image'
import ArtTest from '@/public/images/png/Image.png'
import LayoutsUser from '@/components/Layouts/User/Layouts'
import { useParams } from 'next/navigation'
import Cookies from 'js-cookie'
import axios from 'axios'
import headers from '@/config/headers'
import Token from '@/config/userToken'

export default function CollectionsDetail() {
    const [user, setUser] = useState([])
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const userToken = Cookies.get('token')
    const params = useParams()

    useEffect(() => {
        setUser(userToken !== undefined ? Token() : null)
    }, [userToken])

    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/collection/detail/${params.uuid}`, {
                    headers: headers,
                    withCredentials: true
                })

                const responsData = response.data.data
                setData(responsData)
                setIsLoading(false)
            } catch (e) {
                console.error(e)
            }
        }

        getData()
    }, [params])

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
                <>
                    {user && (
                        <LayoutsUser>
                            <div className="container p-5">
                                <section className={style.section_one}>
                                    <div className="row">
                                        <div className="col-lg-7 col-md-12">
                                            <div className={style.section_img} style={{height: '450px'}}>
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.art.image}`}
                                                    alt="Image Slider"
                                                    height="520"
                                                    width="520"
                                                    className="rounded"
                                                    style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-12 d-flex flex-column justify-content-between">
                                            <div className="col-12 mb-5">
                                                <div className={style.information}>
                                                    <h5 className={style.h5}>{data.art.artname}</h5>
                                                    <p className={style.by}>By<span className={style.name}> {data.art.artname}</span></p>
                                                    <p className={style.desc}>{data.art.description}</p>
                                                </div>
                                                <div className="mb-3 mt-2">
                                                    <h6 style={{fontSize: '15px', marginBottom: '15px'}}>Category</h6>
                                                    {data.art.kategori.split(",").map((kategori) => (
                                                        <span key={kategori} className="badge me-2 mb-1 text-uppercase" style={{background: '#2E2E2E', color: '#EBEBEB'}}>{kategori}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className={style.buy_information}>
                                                    <div className={style.box}>
                                                        <p>Collection By</p>
                                                        <h5>{data.user.name}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </LayoutsUser>
                    )}
                </>
            )}
        </>
    )
}