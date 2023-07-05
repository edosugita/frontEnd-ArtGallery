'use client'
import { useEffect, useState } from 'react'
import style from '@/styles/Detailbid.module.css'
import Image from 'next/image'
import CarouselOnGoing from '@/components/users/carausel/CarouselOnGoing'
import CarouselUpcoming from '@/components/users/carausel/CarouselUpcoming'
import { format } from 'date-fns'
import axios from 'axios'
import headers from '@/config/headers'
import Cookies from 'js-cookie'
import LayoutsUser from '@/components/Layouts/User/Layouts'

export default function BidDetail({params}) {
    const [data, setData] = useState(null)
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [dataBid, setDataBid] = useState(true)
    const [timeString, setTimeString] = useState('')
    const [date, setDate] = useState(null)
    const [clock, setClock] = useState(null)
    const [isAuctionEnd, setIsAuctionEnd] = useState(false)

    const userToken = Cookies.get('token')

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/auction/get/${params.slug}`, {
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
    }, [params, userToken, data])

    useEffect(() => {
        if (data) {
            const now = new Date()

            const endBidStr = data.end_bid

            const endBidObj = new Date(endBidStr)
            const timeDiff = endBidObj - now
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
            const hours = Math.floor(timeDiff / (1000 * 60 * 60) % 24)
            const minutes = Math.floor((timeDiff / (1000 * 60)) % 60)
            const seconds = Math.floor((timeDiff / 1000) % 60)

            let timeString = ""
            if (days > 0) {
                setTimeString(timeString += days + "d : ")
            }
            if (hours > 0 || days > 0) {
                setTimeString(timeString += hours + "h : ")
            }
            if (minutes > 0 || hours > 0 || days > 0) {
                setTimeString(timeString += minutes + "m : ")
            }
            setTimeString(timeString += seconds + "s")

            if (timeDiff <= 0) {
                setTimeStringtimeString = "End"
            }
        }
    }, [data])

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen bg-background">
                    <span className="loading loading-dots loading-lg text-red-primary"></span>
                </div>
            ) : (
                <LayoutsUser>
                    <div className="container p-5">
                        <section className={style.section_one}>
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
                                            {data &&
                                                <>
                                                    <h5 className={style.h5}>{data.artname}</h5>
                                                    <p className={style.by}>By<span className={style.name}> {data.artist}</span></p>
                                                    <p className={style.desc}>{data.description}</p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className={style.buy_information}>
                                            <div className="row">
                                                {isAuctionEnd ? (
                                                    <>
                                                        <div className="col-12">
                                                            <div className={style.box}>
                                                                <p>Winner &#128081</p>
                                                                {dataBid[0].max_bid_price !== null ? (
                                                                    <h5>&#128081 {dataBid[0].name} &#128081</h5>
                                                                ) : (
                                                                    <h5>No Buyer</h5>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="col-md-6 col-sm-6 col-12 mb-3">
                                                            <div className={style.box}>
                                                                <p>Open Bid</p>
                                                                {data && <h5>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.bid_price)}</h5>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-sm-6 col-12 mb-3">
                                                            <div className={style.box}>
                                                                <p>Start Auction</p>
                                                                {data && <h5>{format(new Date(data.end_bid), "dd/MM/yyyy 'at' hh:mm a")}</h5>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-sm-6 col-12 mb-3">
                                                            <div className={style.box}>
                                                                <p>Best Bid</p>
                                                                {!dataBid ? (
                                                                    <h5>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(dataBid[0].max_bid_price)}</h5>
                                                                ) : (
                                                                    <h5>Rp 0,00</h5>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-sm-6 col-12 mb-3">
                                                            <div className={style.box}>
                                                                <p>End Auction</p>

                                                                {data && <h5>{timeString}</h5>}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            {isAuctionEnd ? (
                                                <>
                                                    <div className="row mt-3">
                                                        <div className="col-12">
                                                            <input className={`btn btn-danger w-100 ${style.btnbuy}`} type="button" onClick={handleCheckout} value={'Buy'} />
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    {user !== null ? (
                                                    <div className={style.buy_button}>
                                                        <div className="row mt-3">
                                                            <div className="col-12">
                                                                <input className={`btn btn-danger w-100 ${style.btnbuy}`} type="button" value={'Buy Now'} data-bs-toggle="modal" data-bs-target="#placeBid" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    ) : <></>}
                                                </>
                                            )}
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
                                            <h4 className={style.h4_title}>On Going Auction</h4>
                                        </div>
                                        <div className='col-6 mb-3'>
                                            <div className='d-flex justify-content-end'>
                                                <input className={`btn rounded-top-3 ${style.section_btn}`} type='button' value='See All' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <CarouselOnGoing />
                                </div>
                            </div>
                        </section>
                        <section className={style.section}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex align-items-center">
                                        <div className='col-6 mb-3'>
                                            <h4 className={style.h4_title}>Upcoming Auction</h4>
                                        </div>
                                        <div className='col-6 mb-3'>
                                            <div className='d-flex justify-content-end'>
                                                <input className={`btn rounded-top-3 ${style.section_btn}`} type='button' value='See All' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <CarouselUpcoming />
                                </div>
                            </div>
                        </section>
                        {/* <PlaceBid /> */}
                    </div>
                </LayoutsUser>
            )}

        </>
    )
}
