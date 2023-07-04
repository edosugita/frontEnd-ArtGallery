import Collections from '@/components/collections/Collections'
import Footer from '@/components/users/Footer'
import Filters from '@/components/users/gallery/Filters'
import Navbar from '@/components/users/Navbar'
import style from '@/styles/Gallery.module.css'

export default function MyCollection() {
  return (
    <>
        <header>
            <Navbar />
        </header>
        <main>
            <div className="container p-5">
                <div className={`row ${style.row}`}>
                    <div className="col-md-9 col-12 mb-4">
                    <Collections />
                    <nav aria-label="Page navigation example">
                        <ul class="pagination pagination-sm justify-content-center">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    </div>
                    <div className="col-md-3 col-12 mb-4">
                    <Filters />
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
