'use client'

import { useEffect, useState } from 'react'
import CarouselNewsArt from '@/components/users/carausel/CarouselNewsArt'
import CarouselSale from '@/components/users/carausel/CarouselSale'
import style from '@/styles/Detail.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import LayoutsUser from '@/components/Layouts/User/Layouts'
import Token from '@/config/userToken'
import Cookies from 'js-cookie'
import axios from 'axios'
import headers from '@/config/headers'

export default function Detail({ params }) {
    const [data, setData] = useState(null)
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const userToken = Cookies.get('token')

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/sell/get/${params.slug}`, {
                    headers: headers,
                    withCredentials: true
                })
                const data = response.data.data
                setData(data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        setUser(userToken !== undefined ? Token() : null)
        fetchData()
    }, [userToken, params, data])

    console.log(data)


    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen bg-background">
                    <span className="loading loading-dots loading-lg text-red-primary"></span>
                </div>
            ) : (
                <LayoutsUser>
                    <div className="container p-5">
                        <section className={style.section_one} key={1}>
                            <div className="row">
                                <div className="col-lg-7 col-md-12">
                                    <div className={style.section_img}>
                                        <div style={{height: '450px', width: '100%', overflow: "hidden"}}>
                                            {data && (
                                                <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.image}`} alt="Image Slider" height="520" width="520" className="rounded" style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-12 d-flex flex-column justify-content-between">
                                    <div className="col-12 mb-5">
                                        <div className={style.information}>
                                            {data && <h5 className={style.h5}>{data.artname}</h5>}
                                            {data && <p className={style.by}>By<span className={style.name}> {data.artist}</span></p>}
                                            {data && <p className={style.desc}>{data.description}</p>}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className={style.buy_information}>
                                            <div className={style.box}>
                                                <p>price</p>
                                                {data && <h5>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.price)}</h5>}
                                            </div>
                                            {user ? (
                                                <div className={style.buy_button}>
                                                    <div className="row mt-3">
                                                        <div className="col-7">
                                                            <input className={`btn btn-danger w-100 ${style.btnbuy}`} type="button" value={'Buy Now'} />
                                                        </div>
                                                        <div className="col-5">
                                                            <button className={`btn text-light w-100 ${style.btnshop}`} >
                                                                <FontAwesomeIcon className='me-3' icon={faCartShopping} />
                                                                Add to Cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (<></>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                
                        <section className={style.section}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex align-items-center">
                                        <div className='col-6 mb-3'>
                                            <h4 className={style.h4_title}>Art On Sale</h4>
                                        </div>
                                        <div className='col-6 mb-3'>
                                            <div className='d-flex justify-content-end'>
                                                <input className={`btn rounded-top-3 ${style.section_btn}`} type='button' value='See All' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <CarouselSale />
                                </div>
                            </div>
                        </section>
                        <section className={style.section}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex align-items-center">
                                        <div className='col-6 mb-3'>
                                            <h4 className={style.h4_title}>Newest Art</h4>
                                        </div>
                                        <div className='col-6 mb-3'>
                                            <div className='d-flex justify-content-end'>
                                                <input className={`btn rounded-top-3 ${style.section_btn}`} type='button' value='See All' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <CarouselNewsArt />
                                </div>
                            </div>
                        </section>
                    </div>
                </LayoutsUser>
            )}
        </>
    )
}