'use client'

import LayoutsUser from '@/components/Layouts/User/Layouts'
import Filters from "@/components/users/gallery/Filters"
import style from '@/styles/Gallery.module.css'
import styles from '@/styles/SectionHome/SectionTwo.module.css'
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import axios from 'axios'
import headers from '@/config/headers'

export default function Gallery() {
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    const ITEMS_PER_PAGE = 16

    const getPaginatedItems = (items, page) => {
        const startIndex = (page - 1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE
        return items.slice(startIndex, endIndex)
    }

    const fetchFirstApi = async () => {
       try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/sell/get`, {
                headers: headers,
                withCredentials: true
            })
            const data = Object.values(response.data.data)
            setIsLoading(false)
            return data
        } catch (e) {
            console.log({message: e})
        }
    }

    const fetchSecondApi = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/discount/get`, {
                headers: headers,
                withCredentials: true
            })
            const data = Object.values(response.data.data)
            return data
        } catch (e) {
            console.log({message: e})
        }
    }

    useEffect(() => {
        Promise.all([fetchFirstApi(), fetchSecondApi()])
            .then(([firstApiData, secondApiData]) => {
                const mergedData = [...firstApiData, ...secondApiData]
                setItems(mergedData)
                setCurrentPage(1)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
    return (
        <LayoutsUser>
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div class="spinner-grow text-danger" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="container p-5">
                    <div className={`row ${style.row}`}>
                        <div className="col-md-9 col-12 mb-4">
                            <div className="row">
                            {getPaginatedItems(items, currentPage).map((item) => (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3" key={item.id}>
                                    <Link className="text-decoration-none text-light" href={`/detail/${item.slug}`}>
                                        <div className={styles.card}>
                                            <div style={{height: '200px', width: '100%', overflow: "hidden"}}>
                                                <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.image}`} alt="Image Slider" height="520" width="520" className="rounded" style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} />
                                            </div>
                                            <div className={styles.card_body}>
                                                <h5 style={{height: '5rem'}}>{item.artname}</h5>
                                                <div className="mb-3 mt-2" style={{height: '4rem'}}>
                                                    {item.kategori.split(",").map((kategori) => (
                                                    <span key={kategori} className="badge me-2 mb-1 text-uppercase" style={{background: '#2E2E2E', color: '#EBEBEB'}}>{kategori}</span>
                                                    ))}
                                                </div>
                                                <p><span>By</span> {item.artist}</p>
                                                <div className={`d-flex align-items-center gap-2 ${styles.discount}`}>
                                                    { item.discount === null ? (
                                                        <>
                                                            <div style={{height: '35px'}}></div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p>{item.discount}%</p>
                                                            <p>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</p>
                                                        </>
                                                    )}
                                                </div>
                                                <p className={`card-text ${styles.card_text}`}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price - (item.price * (item.discount / 100)))}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            </div>
                        </div>

                        <div className="col-md-3 col-12 mb-4">
                            <Filters />
                        </div>

                        <div className="join flex justify-center">
                            <button
                                className="join-item btn"
                                onClick={() =>
                                setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1))
                                }
                            >
                                «
                            </button>
                            {items.length > 0 &&
                                Array.from(
                                { length: Math.ceil(items.length / ITEMS_PER_PAGE) },
                                (_, i) => (
                                    <button
                                    className={`join-item btn ${currentPage === i + 1 ? "active" : ""}`}
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    >
                                    Page {i + 1}
                                    </button>
                                )
                                )}
                            <button
                                className="join-item btn"
                                onClick={() =>
                                setCurrentPage((prevPage) =>
                                    getPaginatedItems(items, prevPage + 1).length === 0
                                    ? prevPage
                                    : prevPage + 1
                                )
                                }
                                disabled={getPaginatedItems(items, currentPage + 1).length === 0}
                            >
                                »
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </LayoutsUser>
    )
}
