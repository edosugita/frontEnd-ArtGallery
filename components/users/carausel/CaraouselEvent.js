import Image from "next/image"
import { Component } from "react"
import Slider from "react-slick"
import headers from "@/config/headers"
import axios from "axios"

const formatDate = (date) => {
    const formattedDate = new Date(date)
    const day = formattedDate.getDate().toString().padStart(2, '0')
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ]
    const monthIndex = formattedDate.getMonth()
    const month = months[monthIndex]
    const year = formattedDate.getFullYear()
    return `${day} ${month} ${year}`
}
export default class CarouselNewsArt extends Component {
    state = {
        data: [],
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/event/get`, {
                headers: headers,
                withCredentials: true
            })
            const data = Object.values(response.data.data)

            this.setState({ data })
        } catch (e) {
            console.log({message: e})
        }
    }

    render() {
        const { data } = this.state
        let slidesToShow = 3
    
        if (data.length < 3) {
            slidesToShow = data.length
        }

        const settings = {
            className: "center",
            infinite: true,
            centerPadding: "60px",
            slidesToShow: slidesToShow,
            swipeToSlide: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: data.length < 3 ? data.length : 3,
                        swipeToSlide: true,
                        infinite: true,
                        dots: true,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: data.length < 2 ? data.length : 2,
                        swipeToSlide: true,
                        initialSlide: 2,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: data.length < 1 ? data.length : 1,
                        swipeToSlide: true,
                    },
                },
            ],
            afterChange: function (index) {
            },
        }
        return (
            <div>
                <Slider {...settings}>
                    {
                        console.log(data)
                    }
                    {data.map((item, index) => (
                        <div key={index}>
                            <div className='me-2 ms-2'>
                                <div className={`d-flex align-items-center rounded p-3 gap-3`} style={{backgroundColor: '#1A1A1A', border: '1px solid #2E2E2E'}}>
                                    <div className="rounded" style={{width: '100px', height: '100px', overflow: "hidden"}}>
                                        <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.image}`} alt="Image Slider" height="520" width="520" className="rounded" style={{width: 'auto', height: '200px'}} />
                                    </div>
                                    <div className="text">
                                        <h6 style={{fontSize: '16px'}}>{item.title}</h6>
                                        <span style={{fontSize: '12px', color: '#D1D1D1'}}>{formatDate(item.start)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        )
    }
}