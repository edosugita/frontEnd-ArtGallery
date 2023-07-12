import Image from "next/image";
import { Component } from "react";
import Slider from "react-slick";
import style from '@/styles/SectionHome/SectionFour.module.css'
import Link from "next/link";
import axios from "axios";
import headers from "@/config/headers";

export default class CarouselNewsArt extends Component {
    state = {
        data: [],
    };

    async componentDidMount() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/sell/get`, {
                headers: headers,
                withCredentials: true
            })
            const data = Object.values(response.data.data);

            this.setState({ data });
        } catch (e) {
            console.log({message: e})
        }
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
                        dots: true,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        swipeToSlide: true,
                        initialSlide: 2,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        swipeToSlide: true,
                    },
                },
            ],
            afterChange: function (index) {
            },
        };
        return (
            <div>
                <Slider {...settings}>
                    {data.map((item, index) => (
                        <>
                            {item.status === '0' ? null : (
                                <div key={index}>
                                    <div className='me-2 ms-2'>
                                        <Link className="text-decoration-none text-light" href={`/detail/${item.slug}`}>
                                            <div className={style.card}>
                                                <div style={{height: '200px', width: '100%', overflow: "hidden"}}>
                                                    <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.image}`} alt="Image Slider" height="520" width="520" className="rounded" style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} />
                                                </div>
                                                <div className={style.card_body}>
                                                    <h5 style={{height:'4rem'}}>{item.artname}</h5>
                                                    <div className="mb-3 mt-2">
                                                        {item.kategori.split(",").map((kategori) => (
                                                            <span key={kategori} className="badge me-2 mb-1 text-uppercase" style={{background: '#2E2E2E', color: '#EBEBEB'}}>{kategori}</span>
                                                        ))}
                                                    </div>
                                                    <p>
                                                        <span>By</span> {item.artist}
                                                    </p>
                                                    <p className={`card-text ${style.card_text}`}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </>
                    ))}
                </Slider>
            </div>
        );
    }
}