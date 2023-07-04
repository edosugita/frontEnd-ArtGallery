import Footer from '@/components/users/Footer'
import Navbar from '@/components/users/Navbar'
import CarouselEvent from '@/components/users/carausel/CaraouselEvent'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Event() {
    useEffect(() => {
        document.title = 'Events'
    })
    return (
        <>
            <header>
                <Navbar />
            </header>

            <main>
                <div className="container p-5">
                    <div className="row">
                        <div className="col-lg-5 col-12 mb-3">
                            <div className="jumbotron">
                                <h1>Explore the Metaverse in a New Way with Our VR Gallery Art App</h1>
                                <label className='mt-4' style={{fontWeight: 400, fontSize: '14px', color: '#858585', width: '80%'}}>
                                    Discover a new world of art in the Metaverse with our VR Gallery app. Download now and experience breathtaking masterpieces in a whole new way.
                                </label>
                                <div className="d-flex justify-content-start gap-3">
                                    <Link href={'#'}>
                                        <Image src={'/images/svg/play_store.svg'} width={150} height={150} alt='Google Play Store' />
                                    </Link>
                                    <Link href={'#'}>
                                        <Image src={'/images/svg/app_store.svg'} width={150} height={150} alt='Google Play Store' />
                                    </Link>
                                    <Link href={'#'}>
                                        <Image src={'/images/svg/microsoft_store.svg'} width={120} height={150} alt='Google Play Store' className='rounded' />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7 col-12 d-flex justify-content-end mb-4">
                            <iframe className='rounded' width="600" height="374" src="https://www.youtube.com/embed/Y7spRA4_Ma0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>

                        <div className="col-12 mb-3">
                            <h4 style={{fontStyle: 'normal', fontWeight: 600, fontSize: '18px !important'}}>Next Event</h4>
                        </div>
                        <div className="col-12 mb-4">
                            <CarouselEvent />
                        </div>

                        <div className="mt-4">
                            <div className="row">
                                <div className="col-md-5 col-12">
                                    <div className="">
                                        <Image src={'/images/png/image_event.png'} alt='Image Event' width={520} height={520} style={{width: '100%', height: '100%'}} className='rounded' />
                                    </div>
                                </div>

                                <div className="col-md-7 col-12 d-flex flex-column justify-content-evenly">
                                    <h3 style={{letterSpacing: '0.04em', width: '50%'}}>
                                        Enter a New Dimension of Art Explore Our Metaverse Gallery
                                    </h3>
                                    <p style={{color: '#858585'}}>Click now to enter a new dimension of art.</p>
                                    <div className="">
                                        <button className={`btn btn-danger`} style={{width: 'auto'}}>See Metaverse</button>
                                    </div>
                                </div>
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
