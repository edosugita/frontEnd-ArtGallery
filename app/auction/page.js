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
import { format } from "date-fns"

export default function Auction() {
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [filteredItems, setFilteredItems] = useState(null)
    const sortBy = 'bid'

    const ITEMS_PER_PAGE = 16

    const getPaginatedItems = (items, page) => {
        const startIndex = (page - 1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE
        return items.slice(startIndex, endIndex)
    }

    const fetchItems = async () => {
         try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/auction/get`, {
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

    useEffect(() => {
        fetchItems()
        .then((data) => {
            setItems(data)
                setCurrentPage(1)
            })
                .catch((error) => {
                console.error(error)
            })
    }, [])
    
    const handleFilterSubmit = async (filterData) => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/filter`, {
                params: filterData,
                headers: headers,
                withCredentials: true,
            })

            const data = Object.values(response.data.data)
            const filteredData = data.filter((item) => item.label === 'bid')
            setFilteredItems(filteredData)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <LayoutsUser>
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center vh-100" style={{backgroundColor: '#141414'}}>
                    <div className="spinner-grow text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="container p-5">
                    <div className={`row ${style.row}`}>
                        <div className="col-md-9 col-12 mb-4">
                            <div className="row">
                                {(filteredItems && filteredItems.length > 0
                                        ? filteredItems
                                        : getPaginatedItems(items, currentPage)
                                    ).map((item) => (
                                    <>
                                        {item.status === '0' ? null : (
                                            <div className='col-lg-3 col-md-4 col-sm-6 col-12 mb-3' key={item.uuid_art}>
                                                <Link className="text-decoration-none text-light" href={`/bid/detail/${item.slug}`}>
                                                    <div className={styles.card}>
                                                        <div style={{height: '200px', width: '100%', overflow: "hidden"}}>
                                                            <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.image}`} alt="Image Slider" height="520" width="520" className="rounded" style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} />
                                                        </div>
                                                        <div className={styles.card_body}>
                                                            <h5 style={{height: '3rem'}}>{item.artname}</h5>
                                                            <div className="mb-1 mt-2" style={{height: '4rem'}}>
                                                                {item.kategori.split(",").map((kategori) => (
                                                                    <span key={kategori} className="badge me-2 mb-1 text-uppercase" style={{background: '#2E2E2E', color: '#EBEBEB'}}>{kategori}</span>
                                                                ))}
                                                            </div>
                                                            <p><span>By</span> {item.artist}</p>
                                                                <span className={styles.bid}>Best Bid</span>
                                                            <p className="card-text">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.bid_price)}</p>
                                                                <label className={styles.bid}>End Auction</label>
                                                            <p className="card-text" style={{ color: '#ff0000' }}>{format(new Date(item.end_bid), "dd/MM/yyyy 'at' hh:mm a")}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                    </>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-3 col-12 mb-4">
                            <Filters onSubmit={handleFilterSubmit} sort={sortBy} />
                        </div>

                        <nav aria-label="Page navigation example">
                            <ul className="pagination pagination-sm justify-content-center">
                                <li className="page-item">
                                    <Link
                                    className="page-link"
                                    href="#"
                                    aria-label="Previous"
                                    onClick={() =>
                                        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1))
                                    }
                                    >
                                    <span aria-hidden="true">&laquo;</span>
                                    </Link>
                                </li>
                                {items.length > 0 &&
                                    Array.from(
                                    { length: Math.ceil(items.length / ITEMS_PER_PAGE) },
                                    (_, i) => (
                                        <li
                                        className={`page-item ${
                                            currentPage === i + 1 ? 'active' : ''
                                        }`}
                                        key={i}
                                        >
                                        <Link
                                            className="page-link"
                                            href="#"
                                            onClick={() => setCurrentPage(i + 1)}
                                        >
                                            {i + 1}
                                        </Link>
                                        </li>
                                    )
                                )}
                                <li className="page-item">
                                    <Link
                                    className="page-link"
                                    href="#"
                                    aria-label="Next"
                                    onClick={() =>
                                        setCurrentPage((prevPage) =>
                                        getPaginatedItems(items, prevPage + 1).length === 0
                                            ? prevPage
                                            : prevPage + 1
                                        )
                                    }
                                    disabled={getPaginatedItems(items, currentPage + 1).length === 0}
                                    >
                                    <span aria-hidden="true">&raquo;</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </LayoutsUser>
    )
}
