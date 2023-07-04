import { useEffect } from 'react'
import Footer from '@/components/users/Footer'
import Navbar from '@/components/users/Navbar'
import style from '@/styles/Detail.module.css'
import Image from 'next/image'
import ArtTest from '@/public/images/png/Image.png'

export default function CollectionsDetail() {
    useEffect(() => {
        document.title = 'Art Galery'
    })
  return (
    <>
        <header>
            <Navbar />
        </header>

        <main>
            <div className="container p-5">
                <section className={style.section_one}>
                    <div className="row">
                        <div className="col-lg-7 col-md-12">
                            <div className={style.section_img}>
                                <Image src={ArtTest} alt='Images' />
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <div className="col-12 mb-5">
                                <div className={style.information}>
                                    <h5 className={style.h5}>Form in Space</h5>
                                    <p className={style.by}>By<span className={style.name}> Doja</span></p>
                                    <p className={style.desc}>&#34;Form in Space&#34; is a visual art piece that explores the relationship between form and space. This artwork is an exploration of the interplay between objects and the space they occupy, and how this relationship can evoke a range of emotional and physical responses in the viewer. The artist has used various techniques and mediums to create a dynamic and thought-provoking composition that invites the viewer to contemplate the complex relationship between form and space.</p>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className={style.buy_information}>
                                    <div className={style.box}>
                                        <p>price</p>
                                        <h5>RP 180.000</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>

        <footer>
            <Footer />
        </footer>
    </>
  )
}
