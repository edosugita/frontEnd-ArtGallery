import Image from "next/image";
import { Component } from "react";
import Slider from "react-slick";
import style from '@/styles/SectionHome/SectionSeven.module.css'
import ArtTest from '@/public/images/png/Image.png'
import Link from "next/link";
import axios from "axios";
import headers from "@/config/headers";

export default class CarouselOnGoing extends Component {
    state = {
        data: [],
    };

    async componentDidMount() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/auction/get`, {
                headers: headers,
                withCredentials: true
            })
            const data = Object.values(response.data.data);

            this.setState({ data });
        } catch (e) {
            console.log({message: e})
        }

        // jalankan timer setiap 1 detik untuk menghitung perhitungan mundur
        this.interval = setInterval(() => {
            this.forceUpdate();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { data } = this.state;
        const settings = {
            className: "center",
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 5,
            swipeToSlide: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                        swipeToSlide: true,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        swipeToSlide: true,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        swipeToSlide: true,
                    }
                }
            ],
            afterChange: function(index) {
                console.log(
                    `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
                );
            }
        };
        return (
            <div>
                <Slider {...settings}>
                    {data.map((item, index) => {
                        const now = new Date();

                        const endBidStr = item.end_bid;

                        const endBidObj = new Date(endBidStr);
                        const timeDiff = endBidObj - now;
                        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                        const hours = Math.floor(timeDiff / (1000 * 60 * 60) % 24);
                        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
                        const seconds = Math.floor((timeDiff / 1000) % 60);

                        let timeString = "";
                        if (days > 0) {
                            timeString += days + "d : ";
                        }
                        if (hours > 0 || days > 0) {
                            timeString += hours + "h : ";
                        }
                        if (minutes > 0 || hours > 0 || days > 0) {
                            timeString += minutes + "m : ";
                        }
                        timeString += seconds + "s";

                        if (timeDiff <= 0) {
                            timeString = "End";
                        }


                        return (
                            <div key={item.index}>
                                <div className='me-2 ms-2'>
                                    <Link className="text-decoration-none text-light" href={`/bid/detail/${item.slug}`}>
                                        <div className={style.card}>
                                            <div style={{height: '200px', width: '100%', overflow: "hidden"}}>
                                                <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.image}`} alt="Image Slider" height="520" width="520" className="rounded" style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} />
                                            </div>
                                            <div className={style.card_body}>
                                                <h5 className="h-20">{item.artname}</h5>
                                                <div className="mb-3 mt-2">
                                                    {item.kategori.split(",").map((kategori) => (
                                                        <span key={kategori} className="badge me-2 mb-1 uppercase" style={{background: '#2E2E2E', color: '#EBEBEB'}}>{kategori}</span>
                                                    ))}
                                                </div>
                                                <p><span>By</span> {item.artist}</p>
                                                <span className={style.bid}>Best Bid</span>
                                                <p className="card-text">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.bid_price)}</p>
                                                <label className={style.bid}>End Auction</label>
                                                <p className="card-text">
                                                    {timeString}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        );
    }
}