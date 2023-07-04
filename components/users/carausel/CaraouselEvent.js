import Image from "next/image";
import { Component } from "react";
import Slider from "react-slick";
import style from '@/styles/Event.module.css'
import Link from "next/link";

export default class CarouselNewsArt extends Component {
    state = {
        data: [],
    };

    async componentDidMount() {
        const response = await fetch("http://localhost:3000/api/data/product/sell");
        const data = await response.json();
        this.setState({ data });
    }

    render() {
        const { data } = this.state;

        const settings = {
            className: "center",
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 3,
            swipeToSlide: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
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
                console.log(
                    `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
                );
            },
        };
        return (
            <div>
                <Slider {...settings}>
                    {data.map((item, index) => (
                        <div key={index}>
                            <div className='me-2 ms-2'>
                                <div className={`d-flex align-items-center rounded p-3 gap-3`} style={{backgroundColor: '#1A1A1A', border: '1px solid #2E2E2E'}}>
                                    <div className="rounded" style={{width: '100px', height: '100px', overflow: "hidden"}}>
                                        <Image src={`/images/png/${item.image}`} alt="Image Slider" height="520" width="520" className="rounded" style={{width: 'auto', height: '200px'}} />
                                    </div>
                                    <div className="text">
                                        <h6 style={{fontSize: '16px'}}>{item.artname}</h6>
                                        <span style={{fontSize: '12px', color: '#D1D1D1'}}>29 December 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }
}