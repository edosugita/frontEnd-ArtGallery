import style from '@/styles/Navbar.module.css'
import { faBell, faCartShopping, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link';
import { useRouter } from "next/router";
import Login from './auth/Login';
import Register from './auth/Register';
import { getSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '@/public/images/png/logo.png'

export default function Navbar() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  function handleLogout() {
    signOut()
     .then(() => {
        router.push(router.asPath);
    })
    .catch((error) => console.error(error));
  }

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  return (
    <>
        <nav className={`navbar navbar-expand-md ${style.bg_dark}`} data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand" href="/">
                    <Image src={Logo} width="150" alt='Logo' />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${style.navbar}`} id="navbarSupportedContent">
                     <form className="my-auto w-100" role="search">
                        <div className={style.search}>
                          <input type="text" className="form-control" placeholder="Cari karya seni yang anda inginkan di sini ..." />
                          <FontAwesomeIcon className={style.icon_search} icon={faSearch} color='grey' />
                        </div>
                    </form>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                        <li className="nav-item">
                            <Link href={'/'} className={`${style.nav_link} ${router.pathname === '/' ? 'active' : ''}`}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={'/gallery'} className={`${style.nav_link} ${router.pathname === '/gallery' ? 'active' : ''}`}>
                                Gallery
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={'/auction'} className={`${style.nav_link} ${router.pathname === '/auction' ? 'active' : ''}`}>
                               Auction
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={'/news'} className={`${style.nav_link} ${router.pathname === '/news' ? 'active' : ''}`}>
                               News
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={'/event'} className={`${style.nav_link} ${router.pathname === '/event' ? 'active' : ''}`}>
                                Event
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={'/contact'} className={`${style.nav_link} ${router.pathname === '/contact' ? 'active' : ''}`}>
                                ContactUs
                            </Link>
                        </li>
                        {session !== null? (
                            <>
                            <li className="nav-item">
                                <Link className={`${style.nav_link} ${router.pathname === '/notification' ? 'active' : ''}`} href="/notification">
                                    <div className={style.circle}>
                                        <FontAwesomeIcon icon={faBell} />
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${style.nav_link} ${router.pathname === '/cart' ? 'active' : ''}`} href="/cart">
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
                            <a className={`${style.nav_link} dropdown-toggle`} role="button" data-bs-toggle="dropdown">
                                <div className={style.circle}>
                                    {session !== null ? (
                                        <>
                                            <div className={style.image_profile}>
                                                <Image src={`/images/avatar/${session.user.user.avatar}`} alt='Image Slider' width="250" height="250" />
                                            </div>
                                        </>
                                    ) : (
                                    <FontAwesomeIcon icon={faUser} />
                                    )}
                                </div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                {session === null ? (
                                <>
                                    <li><a href='#' className="dropdown-item" data-bs-toggle="modal" data-bs-target="#Login">Login</a></li>
                                    <li><a href='#' className="dropdown-item" data-bs-toggle="modal" data-bs-target="#Register">Register</a></li>
                                </>
                                ) : (
                                    <>
                                    <li>
                                        <Link href="/profile" className={`dropdown-item ${router.pathname === '/profile' ? 'active' : ''}`}>
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/collections" className={`dropdown-item ${router.pathname === '/collections' ? 'active' : ''}`}>
                                            My Collections
                                        </Link>
                                    </li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a href='#' className="dropdown-item" onClick={handleLogout}>Logout</a></li>
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