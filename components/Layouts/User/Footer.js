import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <>
        <div className='border-t-[1px] bg-background border-background-primary p-5'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 col-12'>
                        <div className="flex justify-start">
                            <div className="row">
                                <div className="col-12">
                                    <h1 className="text-4xl tracking-wide text-[#EBEBEB] mb-5 font-semibold">23 Art Galery</h1>
                                </div>
                                <div className="col-12">
                                    <p className="text-xs text-[#858585] mb-10 font-normal">23artgalery@email.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-12'>
                        <div className="row">
                            <div className="col-md-4 col-sm-6 col-12 mb-3">
                                <h6 className={`mb-3 font-bold text-xs tracking-[0.03em] text-[#7A7A7A]`}>Fitur</h6>
                                <div className="col-12 mb-3">
                                    <Link href='#' className="font-normal text-xs tracking-[0.03em] text-[#7A7A7A] hover:text-red-primary delay-150 no-underline">
                                        Galery
                                    </Link>
                                </div>
                                <div className="col-12 mb-3">
                                    <Link href='#' className="font-normal text-xs tracking-[0.03em] text-[#7A7A7A] hover:text-red-primary delay-150 no-underline">
                                        Auction
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-12 mb-3">
                                <h6 className={`mb-3 font-bold text-xs tracking-[0.03em] text-[#7A7A7A]`}>Service</h6>
                                <div className="col-12 mb-3">
                                    <Link href='#' className="font-normal text-xs tracking-[0.03em] text-[#7A7A7A] hover:text-red-primary delay-150 no-underline">
                                        Contact Us
                                    </Link>
                                </div>
                                <div className="col-12 mb-3">
                                    <Link href='#' className="font-normal text-xs tracking-[0.03em] text-[#7A7A7A] hover:text-red-primary delay-150 no-underline">
                                        FAQ
                                    </Link>
                                </div>
                                <div className="col-12 mb-3">
                                    <Link href='#' className="font-normal text-xs tracking-[0.03em] text-[#7A7A7A] hover:text-red-primary delay-150 no-underline">
                                        Kebijakan & Syarat Ketentuan
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-12 mb-3">
                                <h6 className={`mb-3 font-bold text-xs tracking-[0.03em] text-[#7A7A7A]`}>Sosial Media</h6>
                                <div className={`row`}>
                                    <div className="col-3 mb-3">
                                        <Link href='#'>
                                            <Image src={'/svg/Instagram.svg'} alt="Sosial Media Instagram" width={20} height={20} />
                                        </Link>
                                    </div>
                                    <div className="col-3 mb-3">
                                        <Link href='#'>
                                            <Image src={'/svg/Facebook.svg'} alt="Sosial Media Instagram" width={20} height={20} />
                                        </Link>
                                    </div>
                                    <div className="col-3 mb-3">
                                        <Link href='#'>
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
