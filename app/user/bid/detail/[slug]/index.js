import Footer from '@/components/users/Footer'
import Navbar from '@/components/users/Navbar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import style from '@/styles/Detailbid.module.css'
import Image from 'next/image'
import CarouselOnGoing from '@/components/users/carausel/CarouselOnGoing'
import CarouselUpcoming from '@/components/users/carausel/CarouselUpcoming'
import { format } from 'date-fns'
import PlaceBid from "@/components/users/PlaceBid"
import {getSession} from "next-auth/react";

export default function BidDetail() {
    const router = useRouter()
    const [data, setData] = useState(null)
    const [dataBid, setDataBid] = useState(null)
    const {slug} = router.query
    const [session, setSession] = useState(null)
    const [uuidArt, setUuidArt] = useState(null)
    const [timeString, setTimeString] = useState('')
    const [date, setDate] = useState(null)
    const [clock, setClock] = useState(null)
    const [isAuctionEnd, setIsAuctionEnd] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/api/data/product/slug?slug=${slug}`)
                const data = await response.json()
                setData(data[0])
                setUuidArt(data[0].uuid_art)
                setDate(data[0].date_end_bid)
                setClock(data[0].clock_end_bid)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [slug, data])

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            setSession(session);
        };
        fetchSession();
    }, [session]);

    const uuidUser = session?.user?.user.uuid_user;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/api/data/bid/all?uuidArt=${uuidArt}&uuidUser=${uuidUser}`);
                const dataBid = await response.json()
                setDataBid(dataBid)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [uuidArt, dataBid, uuidUser]);

    useEffect(() => {
        if (data) {
            const now = new Date();
            const dateStr = date;
            const timeStr = clock;

            const dateObj = new Date(dateStr);
            const year = dateObj.getFullYear();
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const day = dateObj.getDate().toString().padStart(2, '0');

            const [hour, minute, second] = timeStr.split(':');
            const endDate = new Date(year, month - 1, day, hour, minute, second);
            const timeDiff = endDate - now;
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
            const seconds = Math.floor((timeDiff / 1000) % 60);

            let newTimeString = '';
            if (days > 0) {
                newTimeString += days + 'd : ';
            }
            if (hours > 0 || days > 0) {
                newTimeString += hours + 'h : ';
            }
            if (minutes > 0 || hours > 0 || days > 0) {
                newTimeString += minutes + 'm : ';
            }
            newTimeString += seconds + 's';

            if (timeDiff <= 0) {
                newTimeString = 'End';
                setIsAuctionEnd(true);
            } else {
                setIsAuctionEnd(false)
            }

            setTimeString(newTimeString);
        }
    }, [data]);

    const handleCheckout = async () => {
        try {
            const itemIds = 1;
            const totalPrice = data.price;
            const productNames = data.artname;

            const payload = {
            itemIds,
            totalPrice,
            productNames,
            };

            const uuidArts = [data.uuid_art]; // Menggunakan array untuk satu data

            await callMidtransAPI(payload, uuidArts);
        } catch (error) {
            console.error(error);
        }
        };

        async function callMidtransAPI(payload, uuidArts) {
        try {
            const response = await fetch("/api/payment/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            });

            if (!response.ok) {
            throw new Error("Failed to call Midtrans API");
            }

            const uuidUser = session?.user?.user.uuid_user;
            const uuidArt = uuidArts.join(",");
            const order_id = payload.itemIds.toString(); // Mengubah menjadi string
            const payment_status = "pending";
            const gross_amount = payload.totalPrice;

            const responseData = await fetch("http://localhost:3000/api/data/payment", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                uuidUser,
                uuidArt,
                order_id,
                payment_status,
                gross_amount,
            }),
            });

            const { redirectUrl } = await response.json();

            window.open(redirectUrl);
        } catch (error) {
            console.error(error);
        }
        }


    useEffect(() => {
        document.title='Detail'
    })

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <div className="container p-5">
                    <section className={style.section_one}>
                        <div className="row">
                            <div className="col-lg-7 col-md-12">
                                <div className={style.section_img}>
                                    <div style={{height: '450px', width: '100%', overflow: "hidden"}}>
                                        {data && (
                                            <Image src={"/images/png/" + data.image} alt="Image Slider" height="520" width="520" className="rounded" style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} />
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
                                                <p className={style.by}>By<span className={style.name}> {data.username}</span></p>
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
                                                            {dataBid[0].max_bid_price !== null ? (
                                                                <h5>&#128081; {dataBid[0].name} &#128081;</h5>
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
                                                            {data && <h5>{format(new Date(data.date_start_bid), "dd/MM/yyyy 'at' hh:mm a")}</h5>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6 col-12 mb-3">
                                                        <div className={style.box}>
                                                            <p>Best Bid</p>
                                                            {dataBid !== null ? (
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
                                                {session !== null ? (
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
                </div>
            </main>
            <footer>
                <Footer />
            </footer>

            <PlaceBid />
        </>
    )
}
