import style from '@/styles/Footer.module.css'
import Link from 'next/link'
import Instagram from '@/public/images/svg/Instagram.svg'
import Facebook from '@/public/images/svg/Facebook.svg'
import Twitter from '@/public/images/svg/Twitter.svg'
import Image from 'next/image'

export default function Footer() {
  return (
    <>
        <div className={style.footer}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 col-12'>
                        <div className="d-flex justify-content-start">
                            <div className="row">
                                <div className="col-12">
                                    <h1 className={style.title}>23 Art Galery</h1>
                                </div>
                                <div className="col-12">
                                    <p className={style.mail}>23artgalery@email.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-12'>
                        <div className="row">
                            <div className="col-md-4 col-sm-6 col-12 mb-3">
                                <h6 className={`mb-3 ${style.link_title}`}>Fitur</h6>
                                <div className="col-12 mb-3">
                                    <Link href='#' className={style.link}>
                                        Galery
                                    </Link>
                                </div>
                                <div className="col-12 mb-3">
                                    <Link href='#' className={style.link}>
                                        Auction
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-12 mb-3">
                                <h6 className={`mb-3 ${style.link_title}`}>Service</h6>
                                <div className="col-12 mb-3">
                                    <Link href='#' className={style.link}>
                                        Contact Us
                                    </Link>
                                </div>
                                <div className="col-12 mb-3">
                                    <Link href='#' className={style.link}>
                                        FAQ
                                    </Link>
                                </div>
                                <div className="col-12 mb-3">
                                    <Link href='#' className={style.link}>
                                        Kebijakan & Syarat Ketentuan
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-12 mb-3">
                                <h6 className={`mb-3 ${style.link_title}`}>Sosial Media</h6>
                                <div className={`row ${style.sosmed}`}>
                                    <div className="col-3 mb-3">
                                        <Link href='#' className={style.link_sosmed}>
                                            <Image src={Instagram} alt="Sosial Media Instagram" width={20} height={20} />
                                        </Link>
                                    </div>
                                    <div className="col-3 mb-3">
                                        <Link href='#' className={style.link_sosmed}>
                                            <Image src={Facebook} alt="Sosial Media Instagram" width={20} height={20} />
                                        </Link>
                                    </div>
                                    <div className="col-3 mb-3">
                                        <Link href='#' className={style.link_sosmed}>
                                            <Image src={Twitter} alt="Sosial Media Instagram" width={20} height={20} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
