import {useEffect, useState} from 'react'
import Footer from '@/components/users/Footer'
import Navbar from '@/components/users/Navbar'
import style from '@/styles/Information/Information.module.css'
import ArtTest from '@/public/images/png/Image.png'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from "next/router";

export default function DetailInformation() {
    const router = useRouter()
    const {slug} = router.query
    const [data, setData] = useState(null)
    const [dataAll, setDataAll] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/api/data/information/slug?slug=${slug}`)
                const data = await response.json()
                setData(data[0])
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [slug, data])

    useEffect(() => {
        async function fetchDataAll() {
            try {
                const response = await fetch(`http://localhost:3000/api/data/information/all?limit=5`)
                const dataAll = await response.json()
                setDataAll(dataAll)
            } catch (error) {
                console.log(error)
            }
        }
        fetchDataAll()
    }, [dataAll])

    const formatDate = (date) => {
        const formattedDate = new Date(date)
        const day = formattedDate.getDate().toString().padStart(2, '0')
        const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0')
        const year = formattedDate.getFullYear()
        return `${day}/${month}/${year}`
    };

    useEffect(() => {
        document.title = 'Information'
    })

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <div className="container p-5">
                    <div className="row">
                        <div className='col-md-7'>
                            <div className="information">
                                <div className={style.section_three_img}>
                                    <div style={{height: '400px', width: '100%', overflow: "hidden"}}>
                                        {data && (
                                            <Image src={"/images/png/" + data.image} alt="Image Slider" height="520" width="520" className="rounded" style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} />
                                        )}
                                    </div>
                                </div>
                                <div className={style.section_three_title}>
                                    {data && <h6>{data.title}</h6>}
                                </div>
                                <div className={style.section_three_desc}>
                                    {data && <p>data.content</p>}
                                </div>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <div className={`${style.list_information}`}>
                                {dataAll.map((item, index) => (
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
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}
