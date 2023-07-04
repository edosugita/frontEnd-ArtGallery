import Image from "next/image";
import Link from "next/link";
import style from '@/styles/SectionHome/SectionThree.module.css'
import {useEffect, useState} from "react";

export default function SectionThree() {
    const [data, setData] = useState([])
    const [dataOne, setDataOne] = useState([])

    useEffect(() => {
        async function fetchDataAll() {
            try {
                const response = await fetch('api/data/information/all?limit=5')
                const data = await response.json()
                setData(data)
            } catch (e) {
                console.error(e)
            }
        }

        fetchDataAll()
    }, []);

    useEffect(() => {
        async function fetchDataAll() {
            try {
                const response = await fetch('api/data/information/all?limit=1')
                const dataOne = await response.json()
                setDataOne(dataOne)
            } catch (e) {
                console.error(e)
            }
        }

        fetchDataAll()
    }, []);

    const formatDate = (date) => {
        const formattedDate = new Date(date)
        const day = formattedDate.getDate().toString().padStart(2, '0')
        const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0')
        const year = formattedDate.getFullYear()
        return `${day}/${month}/${year}`
    };

    const handleClick = (e, path) => {
        path === 'see' ? window.location.href='/news' : ''
    }
    return (
        <>
            <section className={style.section_three}>
                <div className='row mb-3'>
                    <div className="d-flex align-items-center">
                        <div className='col-6 mb-3'>
                            <h4 className={style.h4_title}>New Information</h4>
                        </div>
                        <div className='col-6 mb-3'>
                            <div className='d-flex justify-content-end'>
                                <input className={`btn rounded-top-3 ${style.section_three_btn}`} type='button' value='See All' onClick={(e) => handleClick(e, 'see')}  />
                            </div>
                        </div>
                    </div>

                    <div className='col-md-7' >
                        {dataOne.map((item, index) => (
                            <div className="information" key={index}>
                                <div className={style.section_three_img}>
                                    <div style={{height: '350px', width: '100%', overflow: "hidden"}}>
                                        <Image src={"/images/png/" + item.image} alt="Image Slider" height="520" width="520" className="rounded" style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} />
                                    </div>
                                </div>
                                <div className={style.section_three_title}>
                                    <h6>{item.title}</h6>
                                </div>
                                <div className={style.section_three_desc}>
                                    <span>{item.information}</span>
                                    <Link href={'/news/detail/' + item.slug}>
                                        See all ..
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='col-md-5'>
                        <div className={`${style.list_information}`}>
                            {data.map((item, index) => (
                                <Link className="text-decoration-none text-light" href={'/news/detail/' + item.slug} key={index}>
                                    <div className="row">
                                        <div className="col-4">
                                            <div className={style.list_img}>
                                                <div style={{height: '75px', width: '100%', overflow: "hidden"}}>
                                                    <Image src={"/images/png/" + item.image} alt="Image Slider" height="520" width="520" className="rounded" style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-8 d-grid align-content-between">
                                            <div className={`col-12 ${style.list_title}`}>
                                                <h6>{item.title}</h6>
                                            </div>
                                            <div className={`col-12 ${style.list_date}`}>
                                                <p>{formatDate(item.created_at)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
