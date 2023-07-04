import Image from 'next/image'
import Link from 'next/link'
import ArtTest from '@/public/images/png/Image.png'
import style from '@/styles/SectionHome/SectionFive.module.css'
import {useEffect, useState} from "react";

export default function SectionFive() {
    const [dataManga, setDataManga] = useState([])
    const [dataRealism, setDataRealism] = useState([])
    const [dataAbstract, setDataAbstract] = useState([])

    useEffect(() => {
        async function fetchDataManga() {
            try {
                const response = await fetch("api/data/product/all?kategori=manga&limit=5")
                const dataManga = await response.json()
                setDataManga(dataManga)
            } catch (e) {
                console.error(e)
            }
        }
        fetchDataManga()
    }, [])

    useEffect(() => {
        async function fetchDataRealism() {
            try {
                const response = await fetch("api/data/product/all?kategori=realism&limit=5")
                const dataRealism = await response.json()
                setDataRealism(dataRealism)
            } catch (e) {
                console.error(e)
            }
        }
        fetchDataRealism()
    }, [])

    useEffect(() => {
        async function fetchDataAbstract() {
            try {
                const response = await fetch("api/data/product/all?kategori=abstract&limit=5")
                const dataAbstract = await response.json()
                setDataAbstract(dataAbstract)
            } catch (e) {
                console.error(e)
            }
        }
        fetchDataAbstract()
    }, [])

    return (
        <>
            <section className={style.section_five}>
                <div className='row'>

                    <div className='col-md-4 col-sm-12'>
                        <div className='mb-3'>
                            <div className="d-flex align-items-center">
                                <div className='col-6 mb-3'>
                                    <h4 className={style.h4_title}>Manga</h4>
                                </div>
                                <div className='col-6 mb-3'>
                                    <div className='d-flex justify-content-end'>
                                        <input className={`btn rounded-top-3 ${style.section_five_btn}`} type='button' value='See All' />
                                    </div>
                                </div>
                            </div>

                            {dataManga.map((item, index) => (
                                <div className={`col-12 ${style.section_five_12}`} key={index}>
                                    <Link href='#' className={style.section_five_card}>
                                        <div className="row slign-items-center">
                                            <div className="col-5">
                                                <div className={style.section_five_images}>
                                                    <Image src={`/images/png/${item.image}`} width={500} height={500} alt='Imges' />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <h6 className={style.section_five_title}>{item.artname}</h6>
                                                <h6 className={style.section_five_by}>By {item.username}</h6>
                                                <h6 className={style.section_five_title}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</h6>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='col-md-4 col-sm-12'>
                        <div className='mb-3'>
                            <div className="d-flex align-items-center">
                                <div className='col-6 mb-3'>
                                    <h4 className={style.h4_title}>Realist</h4>
                                </div>
                                <div className='col-6 mb-3'>
                                    <div className='d-flex justify-content-end'>
                                        <input className={`btn rounded-top-3 ${style.section_five_btn}`} type='button' value='See All' />
                                    </div>
                                </div>
                            </div>

                            {dataRealism.map((item, index) => (
                                <div className={`col-12 ${style.section_five_12}`} key={index}>
                                    <Link href='#' className={style.section_five_card}>
                                        <div className="row slign-items-center">
                                            <div className="col-5">
                                                <div className={style.section_five_images}>
                                                    <Image src={`/images/png/${item.image}`} width={500} height={500} alt='Imges' />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <h6 className={style.section_five_title}>{item.artname}</h6>
                                                <h6 className={style.section_five_by}>By {item.username}</h6>
                                                <h6 className={style.section_five_title}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</h6>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className='col-md-4 col-sm-12'>
                        <div className='mb-3'>
                            <div className="d-flex align-items-center">
                                <div className='col-6 mb-3'>
                                    <h4 className={style.h4_title}>Abstract</h4>
                                </div>
                                <div className='col-6 mb-3'>
                                    <div className='d-flex justify-content-end'>
                                        <input className={`btn rounded-top-3 ${style.section_five_btn}`} type='button' value='See All' />
                                    </div>
                                </div>
                            </div>
                            {dataAbstract.map((item, index) => (
                                <div className={`col-12 ${style.section_five_12}`} key={index}>
                                    <Link href='#' className={style.section_five_card}>
                                        <div className="row slign-items-center">
                                            <div className="col-5">
                                                <div className={style.section_five_images}>
                                                    <Image src={`/images/png/${item.image}`} width={500} height={500} alt='Imges' />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <h6 className={style.section_five_title}>{item.artname}</h6>
                                                <h6 className={style.section_five_by}>By {item.username}</h6>
                                                <h6 className={style.section_five_title}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</h6>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
