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
import Token from '@/config/userToken'
import PlaceBid from '@/components/users/PlaceBid'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function BidDetail({params}) {
    const [data, setData] = useState(null)
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [dataBid, setDataBid] = useState([])
    const [timeString, setTimeString] = useState('')
    const [isAuctionEnd, setIsAuctionEnd] = useState(false)

    const router = useRouter()

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
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/bid/get/${data.uuid_art}`, {
                    headers: headers,
                    withCredentials: true
                })
                const responseData = response.data.highest_price
                setDataBid(responseData)
            } catch (error) {
                console.log(error)
            }
        }
        
        fetchData()
    }, [dataBid, data])

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
                setTimeString(timeString = "End")
                setIsAuctionEnd(true)
            }
        }
    }, [data])

    const handlePay = async(data) => {
        const url = process.env.NEXT_PUBLIC_API_URL
        const uuid = user.uuid
        const uuid_art = [data]
        const response = await axios.post(`${url}/payment/create`, {
            uuid,
            uuid_art
        }, {
            headers: headers,
            withCredentials: true
        })

        console.log(response.data.data)

        snap.pay(response.data.data.tokenPayment, {
            onSuccess: function (result) {
                alert('Payment success!')
                postData(result, uuid_art)
            },
            onPending: function (result) {
                alert('Waiting for payment!')
                postData(result, uuid_art)
            },
            onError: function (result) {
                alert('Payment failed!')
                postData(result, uuid_art)
            },
            onClose: function () {
                alert('You closed the popup without finishing the payment')
            }
        })
    }

    const postData = async(payment, dataUuid) => {
        if (payment) {
            const url = process.env.NEXT_PUBLIC_API_URL
            const uuid = user.uuid
            const uuid_art = [dataUuid]

            const order_id = payment.order_id
            const gross_amount = payment.gross_amount
            const payment_type = payment.payment_type
            const bank = payment.va_numbers[0].bank
            const va_number = payment.va_numbers[0].va_number
            const status_code = payment.status_code

            const response = await axios.post(`${url}/payment/add`, {
                uuid,
                uuid_art,
                order_id,
                gross_amount,
                payment_type,
                bank,
                va_number,
                status_code,
            }, {
                headers: headers,
                withCredentials: true
            })

            console.log(response)

            if (response.status === 200) {
                Swal.fire({
                    title: 'Success',
                    text: 'Success payment',
                    icon: 'success',
                    timer: 1000,
                    background: '#141414',
                    color: '#FFFFFF',
                    timerProgressBar: true,
                    showConfirmButton: false,
                    progressStepsColor: '#E30813',
                    willClose(popup) {
                        router.push('/user/collections')
                    }
                })
            }
        }
    }

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
                    {data.status === '0' ? (
                        <>
                            {router.push('/')}
                        </>
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
                                                                        <p>Winner &#128081;</p>
                                                                        {dataBid.price_bid ? (
                                                                            <h5 className='text-uppercase'>&#128081; {dataBid.user.name} &#128081;</h5>
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
                                                                        {dataBid ? (
                                                                            <h5>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(dataBid.price_bid)}</h5>
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
                                                            {user?.uuid === dataBid.uuid ? (
                                                                <div className={style.buy_button}>
                                                                    <div className="row mt-3">
                                                                        <div className="col-12">
                                                                            <input className={`btn btn-danger w-100 ${style.btnbuy}`} type="button" onClick={() => handlePay(data.uuid_art)} value={'Pay Now'} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {user && user?.status === 1 ? (
                                                                <div className={style.buy_button}>
                                                                    <div className="row mt-3">
                                                                        <div className="col-12">
                                                                            <input className={`btn btn-danger w-100 ${style.btnbuy}`} type="button" value={'Buy Now'} data-bs-toggle="modal" data-bs-target="#placeBid" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : null}
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
                                <PlaceBid dataArt={data} uuidUser={user?.uuid} />
                            </div>
                        </LayoutsUser>
                    )}
                </>
            )}

        </>
    )
}
