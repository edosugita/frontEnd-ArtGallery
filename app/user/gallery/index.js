import Filters from "@/components/users/gallery/Filters"
import Footer from "@/components/users/Footer"
import Navbar from "@/components/users/Navbar"
import style from '@/styles/Gallery.module.css'
import styles from '@/styles/SectionHome/SectionTwo.module.css'
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 16;

  const getPaginatedItems = (items, page) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return items.slice(startIndex, endIndex);
  };

  const fetchFirstApi = async () => {
    const response = await fetch("http://localhost:3000/api/data/product/sell");
    const data = await response.json();
    return data;
  };

  const fetchSecondApi = async () => {
    const response = await fetch("http://localhost:3000/api/data/product/discount");
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    Promise.all([fetchFirstApi(), fetchSecondApi()])
        .then(([firstApiData, secondApiData]) => {
          const mergedData = [...firstApiData, ...secondApiData];
          setItems(mergedData);
          setCurrentPage(1);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

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
            <div className={`row ${style.row}`}>
              <div className="col-md-9 col-12 mb-4">
                <div className="row">
                  {getPaginatedItems(items, currentPage).map((item) => (
                      <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3" key={item.id}>
                        <Link className="text-decoration-none text-light" href={`/detail/${item.slug}`}>
                          <div className={styles.card}>
                            <div style={{height: '200px', width: '100%', overflow: "hidden"}}>
                              <Image src={"/images/png/" + item.image} alt="Image Slider" height="520" width="520" className="rounded" style={{height: '100%', width: '100%', display: "block", objectFit:"cover"}} />
                            </div>
                            <div className={styles.card_body}>
                              <h5>{item.artname}</h5>
                              <div className="mb-3 mt-2">
                                {item.kategori.split(",").map((kategori) => (
                                  <span key={kategori} className="badge me-2 mb-1" style={{background: '#2E2E2E', color: '#EBEBEB'}}>{kategori}</span>
                                ))}
                              </div>
                              <p><span>By</span> {item.username}</p>
                              <div className={`d-flex align-items-center gap-2 ${styles.discount}`}>
                                { item.discount === null ? (
                                    <>
                                      <p></p>
                                      <p></p>
                                    </>
                                ) : (
                                    <>
                                      <p>{item.discount}%</p>
                                      <p>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</p>
                                    </>
                                )}
                              </div>
                              <p className={`card-text ${styles.card_text}`}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price - (item.price * (item.discount / 100)))}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                  ))}
                </div>
              </div>

              <div className="col-md-3 col-12 mb-4">
                <Filters />
              </div>

              <nav aria-label="Page navigation example">
                <ul className="pagination pagination-sm justify-content-center">
                  <li className="page-item">
                    <a
                        className="page-link"
                        href="#"
                        aria-label="Previous"
                        onClick={() =>
                            setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1))
                        }
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  {items.length > 0 &&
                      Array.from(
                          { length: Math.ceil(items.length / ITEMS_PER_PAGE) },
                          (_, i) => (
                              <li
                                  className={`page-item ${
                                      currentPage === i + 1 ? "active" : ""
                                  }`}
                                  key={i}
                              >
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                  {i + 1}
                                </a>
                              </li>
                          )
                      )}
                  <li className="page-item">
                    <a
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
                        disabled={
                            getPaginatedItems(items, currentPage + 1).length === 0
                        }
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>

            </div>
          </div>
        </main>

        <footer>
          <Footer />
        </footer>
      </>
  )
}