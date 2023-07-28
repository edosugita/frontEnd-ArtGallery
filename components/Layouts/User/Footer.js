import style from '@/styles/Footer.module.css'
import Link from 'next/link'
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
                                <Link className="logo" href="/">
                                    <Image
                                        src={'/assets/images/user/logo.png'}
                                        width={512}
                                        height={512}
                                        alt='Logo'
                                        style={{width: '11rem', height: 'auto'}}
                                    />
                                </Link>
                                <div className="col-12 mt-4">
                                    <p className={style.mail}>artgalery@email.com</p>
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
                                            <Image src={'/svg/Instagram.svg'} alt="Sosial Media Instagram" width={20} height={20} />
                                        </Link>
                                    </div>
                                    <div className="col-3 mb-3">
                                        <Link href='#' className={style.link_sosmed}>
                                            <Image src={'/svg/Facebook.svg'} alt="Sosial Media Instagram" width={20} height={20} />
                                        </Link>
                                    </div>
                                    <div className="col-3 mb-3">
                                        <Link href='#' className={style.link_sosmed}>
                                            <Image src={'/svg/Twitter.svg'} alt="Sosial Media Instagram" width={20} height={20} />
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
