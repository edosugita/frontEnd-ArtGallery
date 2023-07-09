import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import style from "@/styles/SectionHome/SectionOne.module.css";
import axios from "axios";
import headers from "@/config/headers";
import Token from "@/config/userToken";
import Cookies from "js-cookie";

export default function SectionOne() {
    const [data, setData] = useState([])
    const [dataUuid, setDataUuid] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState([])
    const userToken = Cookies.get('token')

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/sell/get`, {
                    headers: headers,
                    withCredentials: true
                })
                const data = Object.values(response.data.data);
                const middleIndex = Math.floor(data.length / 2);
                const slicedData = data.slice(middleIndex - 1, middleIndex + 2); 
                setData(slicedData)
                setIsLoading(false)
            } catch (e) {
                console.log({message: e})
            }
        }
        
        setUser(userToken !== undefined ? Token() : null)
        fetchData()
    }, [userToken])

    const handleClick = async(data) => {
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
        
        setDataUuid(uuid_art)

        snap.pay(response.data.data.tokenPayment, {
            onSuccess: function (result) {
                alert('Payment success!')
                postData(result)
            },
            onPending: function (result) {
                alert('Waiting for payment!')
                postData(result)
            },
            onError: function (result) {
                alert('Payment failed!')
                postData(result)
            },
            onClose: function () {
                alert('You closed the popup without finishing the payment')
            }
        })
    }

    const postData = async(payment) => {
        console.log(payment)
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
        }
    }

    return (
        <>
            {isLoading ? (
                <section className={`${style.section_one} d-flex justify-content-center align-items-center`}>
                    <div className="spinner-grow text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </section>
            ) : (
                <section className={style.section_one}>
                    <div
                        id="carouselExampleCaptions"
                        className="carousel slide row flex-column-reverse"
                        data-bs-ride="carousel"
                    >
                        <div className="col-12">
                            <div className="carousel-indicators" style={{marginTop: '2.5rem'}}>
                                {data.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        data-bs-slide-to={index}
                                        className={index === 0 ? "active" : ""}
                                        aria-current={index === 0 ? "true" : ""}
                                        aria-label={`Slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="carousel-inner">
                                {data.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                                    >
                                        <div className={`row ${style.row}`}>
                                            <div className="col-md-5 col-sm-12">
                                                <h1 className={`mb-3 ${style.h1}`}>{item.artname}</h1>
                                                <span className={style.span}>{item.description}</span>
                                                <h2 className={`mt-3 ${style.h2}`}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</h2>
                                                <div className={`d-flex justify-content-start gap-4 mt-3 ${style.button_group}`}>
                                                    {user ? (
                                                        <input
                                                            className={`btn btn-danger rounded-top-3 ${style.btn}`}
                                                            type="button"
                                                            onClick={() => handleClick(item.uuid_art)}
                                                            value="Buy Now"
                                                        />
                                                    ) : (
                                                        <></>
                                                    )}
                                                    <Link
                                                        className={style.link_detail}
                                                        href={`/detail/${item.slug}`}
                                                    >
                                                        See Detail
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-md-7 col-sm-12">
                                                <div className={`d-flex justify-content-md-end justify-content-sm-center ${style.section_one_img}`} >
                                                    <div style={{height: '300px', width: '100%'}}>
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.image}`}
                                                            alt="Image Slider"
                                                            height="520"
                                                            width="520"
                                                            className="rounded"
                                                            style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}