'use client'

import LayoutsUser from '@/components/Layouts/User/Layouts'
import Image from 'next/image'
import style from '@/styles/Home.module.css'
import ArtTest2 from '@/public/images/png/tes2.png'
import SectionOne from '@/components/users/SectionHome/SectionOne'
import { useState } from 'react'
import SectionTwo from '@/components/users/SectionHome/SectionTwo'
import SectionThree from '@/components/users/SectionHome/SectionThree'
import SectionFour from '@/components/users/SectionHome/SectionFour'
import CarouselOnGoing from '@/components/users/carausel/CarouselOnGoing'
import CarouselUpcoming from '@/components/users/carausel/CarouselUpcoming'

export default function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const handleClick = (e, path) => {
        path = 'see' ? window.location.href='/auction' : ''
    }
    return (
        <LayoutsUser>
            <div className='container p-5'>
                <SectionOne />
                <SectionTwo />
                {/* <SectionThree /> */}
                <SectionFour />

                {/* SECTION SIX 'Images' */}
                <section className={style.section_six}>
                    <div className="row align-items-center">
                        <div className="col-md-8 col-sm-12 col-12">
                            <div className={style.section_six_images}>
                                <div className={style.section_six_layout}>
                                <Image src={ArtTest2} alt='Images'/>
                                </div>
                            </div>
                        </div>
                        <div className={`col-md-4 col-sm-12 col-12 ${style.text}`}>
                            <h3>Explore Our Collection</h3>
                            <p>Lihat koleksi kita dengan fliter dan sorting yang membantu</p>
                            <input type='button' className='btn btn-danger' value={'Browse'} />
                        </div>
                    </div>
                </section>
                {/* END SECTION SIX*/}

                {/* SECTION SEVEN */}
                <section className={style.section_seven}>
                    <div className='row align-items-center mb-3'>
                        <div className='col-6 mb-3'>
                            <h4 className={style.h4_title}>On Going Auction</h4>
                        </div>
                        <div className='col-6 mb-3'>
                            <div className='d-flex justify-content-end'>
                                <input className={`btn rounded-top-3 ${style.section_seven_btn}`} type='button' value='See All' onClick={(e) => handleClick(e, 'see')} />
                            </div>
                        </div>
                  </div>

                  <CarouselOnGoing />
                </section>
                {/* END SECTION SEVEN*/}

                {/* SECTION EIGHT */}
                <section className={style.section_eight}>
                    <div className='row align-items-center mb-3'>
                        <div className='col-6 mb-3'>
                            <h4 className={style.h4_title}>Upcoming Auction</h4>
                        </div>
                        <div className='col-6 mb-3'>
                            <div className='d-flex justify-content-end'>
                                <input className={`btn rounded-top-3 ${style.section_eight_btn}`} type='button' value='See All' onClick={(e) => handleClick(e, 'see')} />
                            </div>
                        </div>
                    </div>

                    <CarouselUpcoming />
                </section>
                {/* END SECTION EIGHT*/}

                {/* SECTION NINE 'Images' */}
                <section className={style.section_nine}>
                    <div className="row align-items-center justify-content-between">
                        <div className={`col-md-4 col-sm-12 col-12 ${style.text}`}>
                            <h3>Explore Our Collection</h3>
                            <p>Lihat koleksi kita dengan fliter dan sorting yang membantu</p>
                            <input type='button' className='btn btn-danger' value={'Browse'} />
                        </div>
                        <div className="col-md-8 col-sm-12 col-12">
                            <div className={style.section_six_images}>
                                <div className={style.section_six_layout}>
                                    <Image src={ArtTest2} alt='Images'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* END SECTION NINE*/}
              </div>
        </LayoutsUser>
    )
}
