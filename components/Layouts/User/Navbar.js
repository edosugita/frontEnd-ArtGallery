'use client'

import style from '@/styles/Navbar.module.css'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faCartShopping, faSearch, faUser } from "@fortawesome/free-solid-svg-icons"
import Token from "@/config/userToken"
import Cookies from "js-cookie"
import { usePathname } from 'next/navigation'
import Login from '@/components/users/auth/Login'
import Register from '@/components/users/auth/Register'

export default function Navbar() {
    const [user, setUser] = useState([])
    const [isActive, setIsActive] = useState(false)
    
    const userToken = Cookies.get('token')

    const router = usePathname()

    const handleActive = () => {
        setIsActive(!isActive)
    }
    
    useEffect(() => {
        setUser(userToken !== undefined ? Token() : null)
    }, [userToken])

    return (
        <>
            <nav className={`navbar navbar-expand-md ${style.bg_dark}`} data-bs-theme="dark">
                <div className="container">
                    <Link className="navbar-brand" href="/">
                        <Image
                            src={'/assets/images/user/logo.png'}
                            width={512}
                            height={512}
                            alt='Logo'
                            className='w-44'
                        />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`navbar-collapse ${style.navbar}`} >
                        <form className="my-auto w-full" role="search">
                            <div className={style.search}>
                            <input type="text" className="form-control" placeholder="Cari karya seni yang anda inginkan di sini ..." />
                            <FontAwesomeIcon className={style.icon_search} icon={faSearch} color='grey' />
                            </div>
                        </form>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                            <li className="nav-item">
                                <Link href={'/'} className={`${style.nav_link} ${router === '/' ? 'active' : ''}`}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href={'/gallery'} className={`${style.nav_link} ${router === '/gallery' ? 'active' : ''}`}>
                                    Gallery
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href={'/auction'} className={`${style.nav_link} ${router === '/auction' ? 'active' : ''}`}>
                                Auction
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href={'/news'} className={`${style.nav_link} ${router === '/news' ? 'active' : ''}`}>
                                News
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href={'/event'} className={`${style.nav_link} ${router === '/event' ? 'active' : ''}`}>
                                    Event
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href={'/contact'} className={`${style.nav_link} ${router === '/contact' ? 'active' : ''}`}>
                                    ContactUs
                                </Link>
                            </li>
                            {user !== null? (
                                <>
                                <li className="nav-item">
                                    <Link className={`${style.nav_link} ${router === '/notification' ? 'active' : ''}`} href="/notification">
                                        <div className={style.circle}>
                                            <FontAwesomeIcon icon={faBell} />
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`${style.nav_link} ${router === '/cart' ? 'active' : ''}`} href="/cart">
                                        <div className={style.circle}>
                                            <FontAwesomeIcon icon={faCartShopping} />
                                        </div>
                                    </Link>
                                </li>
                                </>
                            ) : (
                                <></>
                            )}
                            
                            <li className="nav-item dropdown d-flex align-items-center flex-column">
                                <Link href={'/'} className={`${style.nav_link} dropdown-toggle`} role="button" data-bs-toggle="dropdown">
                                    <div className={style.circle}>
                                        {user !== null ? (
                                            <>
                                                {/* <div className={style.image_profile}>
                                                    <Image src={`/images/avatar/${user.user.user.avatar}`} alt='Image Slider' width="250" height="250" />
                                                </div> */}
                                            </>
                                        ) : (
                                        <FontAwesomeIcon icon={faUser} />
                                        )}
                                    </div>
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    {user === null ? (
                                    <>
                                        <li>
                                            <Link href='#' className="dropdown-item" onClick={()=>window.my_modal_5.showModal()}>Login</Link>
                                        </li>
                                        <li>
                                            <Link href='#' className="dropdown-item" data-bs-toggle="modal" data-bs-target="#Register">Register</Link>
                                        </li>
                                    </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link href="/profile" className={`dropdown-item ${router === '/profile' ? 'active' : ''}`}>
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/collections" className={`dropdown-item ${router === '/collections' ? 'active' : ''}`}>
                                                    My Collections
                                                </Link>
                                            </li>
                                            <li><hr className="dropdown-divider"/></li>
                                            <li><Link href='#' className="dropdown-item" >Logout</Link></li>
                                        </>
                                    )}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Login />
            <Register />
        </>
    )
}
