import Image from 'next/image'
import CarouselSale from '../carausel/CarouselSale'
import ArtTest from '@/public/images/png/Image.png'
import style from '@/styles/SectionHome/SectionTwo.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import headers from '@/config/headers'
import axios from 'axios'

export default function SectionTwo() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const handleClick = (e, path) => {
        path === 'see' ? window.location.href='/gallery' : ''
    }

   useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/discount/get`, {
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
        
        fetchData()
    }, []);

    return (
        <>
            {isLoading ? (
                <div className={`${style.section_two} d-flex justify-content-center align-items-center`}>
                    <div className="spinner-grow text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <section className={style.section_two}>
                    <div className='row align-items-center mb-3'>
                        <div className='col-6 mb-3'>
                            <h4 className={style.h4_title}>Art On Sale</h4>
                        </div>
                        <div className='col-6 mb-3'>
                            <div className='d-flex justify-content-end'>
                                <input className={`btn rounded-top-3 ${style.section_two_btn}`} type='button' value='See All' onClick={(e) => handleClick(e, 'see')} />
                            </div>
                        </div>

                        {data.map((item) => (
                            <div className='col-md-4 col-sm-6 col-12 mb-3 h-100' key={item.uuid_art}>
                                <Link className="text-decoration-none text-light" href={`/detail/${item.slug}`}>
                                    <div className={style.card}>
                                        <div style={{height: '300px', width: '100%', overflow: "hidden"}}>
                                            <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.image}`} alt="Image Slider" height="520" width="520" className="rounded" style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} />
                                        </div>
                                        <div className={style.card_body}>
                                            <h5 style={{height:'4rem'}}>{item.artname}</h5>
                                            <div className="mb-3 mt-2">
                                                {item.kategori.split(",").map((kategori) => (
                                                    <span key={kategori} className="badge me-2 mb-1 text-uppercase" style={{background: '#2E2E2E', color: '#EBEBEB'}}>{kategori}</span>
                                                ))}
                                            </div>
                                            <p><span>By</span> {item.artist}</p>
                                            <div className={`d-flex align-items-center gap-2 ${style.discount}`}>
                                                <p>{item.discount}%</p>
                                                <p>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</p>
                                            </div>
                                            <p className={`card-text ${style.card_text}`}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price - (item.price * (item.discount / 100)))}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <CarouselSale/>
                </section>
            )}
        </>
    )
}