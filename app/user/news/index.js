import { useEffect, useState } from 'react' 
import Footer from '@/components/users/Footer'
import Navbar from '@/components/users/Navbar'
import style from '@/styles/SectionHome/SectionThree.module.css'
import ArtTest from '@/public/images/png/Image.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Information() {
    const [data, setData] = useState([])
    const [dataOne, setDataOne] = useState([])
    const [dataAll, setDataAll] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 10
    const totalPages = Math.ceil(dataAll.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = dataAll.slice(indexOfFirstItem, indexOfLastItem)

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

    useEffect(() => {
        async function fetchDataAll() {
            try {
                const response = await fetch('api/data/information/all')
                const dataAll = await response.json()
                setDataAll(dataAll)
            } catch (e) {
                console.error(e)
            }
        }

        fetchDataAll()
    }, [])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const formatDate = (date) => {
        const formattedDate = new Date(date)
        const day = formattedDate.getDate().toString().padStart(2, '0')
        const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0')
        const year = formattedDate.getFullYear()
        return `${day}/${month}/${year}`
    };

    useEffect(() => {
        document.title = 'News Information'
    })
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <div className="container p-5">
                    <div className="section_one">
                        <div className="row">
                            
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
                                                        <div className={style.list_img}>
                                                            <div style={{height: '75px', width: '100%', overflow: "hidden"}}>
                                                                <Image src={"/images/png/" + item.image} alt="Image Slider" height="520" width="520" className="rounded" style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} />
                                                            </div>
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

                    <div className="section_two mt-5">
                        <div className="row">
                            {currentItems.map((item, index) => (
                                <div className="col-md-6 col-sm-12 mb-3" key={index}>
                                    <div className={style.list_information}>
                                        <Link className="text-decoration-none text-light" href={'/news/detail/' + item.slug} >
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className={style.list_img}>
                                                        <div className={style.list_img}>
                                                            <div style={{height: '75px', width: '100%', overflow: "hidden"}}>
                                                                <Image src={"/images/png/" + item.image} alt="Image Slider" height="520" width="520" className="rounded" style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} />
                                                            </div>
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
                                    </div>
                                </div>
                            ))}
                        </div>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination pagination-sm justify-content-center">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" aria-label="Previous" onClick={() => handlePageChange(currentPage - 1)} >
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                                </li>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li className={`page-item ${index + 1 === currentPage ? 'active' : ''}`} key={index} >
                                        <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)} >
                                        {index + 1}
                                        </a>
                                    </li>
                                ))}
                                <li className={`page-item ${ currentPage === totalPages ? 'disabled' : '' }`} >
                                    <a className="page-link" href="#" aria-label="Next" onClick={() => handlePageChange(currentPage + 1)} >
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    )
}
