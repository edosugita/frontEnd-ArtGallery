import style from '@/styles/Modal.module.css'
import { useRouter } from 'next/router';
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function DeleteProduct({ deleteItemData, uuidUser }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            const response = await fetch(`http://localhost:3000/api/data/cart/delete?uuidUser=${uuidUser}&uuidArt=${deleteItemData.uuid_art}`, {
            method: "DELETE"
            })

            if (response.ok) {
                await Swal.fire({
                    title: 'Success',
                    text: 'Data has been deleted!',
                    icon: "success",
                    timer: 1000,
                    background: '#141414',
                    color: '#FFFFFF',
                    timerProgressBar: true,
                    showConfirmButton: false,
                    progressStepsColor: '#E30813',
                    willClose(popup) {
                        router.reload()
                    },
                })
            } else {
                await Swal.fire({
                    title: 'Error',
                    text: 'Failed to delete data!',
                    icon: "error",
                    timer: 1000,
                    background: '#141414',
                    color: '#FFFFFF',
                    timerProgressBar: true,
                    showConfirmButton: false,   
                    progressStepsColor: '#E30813',
                    willClose(popup) {
                        router.reload()
                    },
                })
            }
        } catch (error) {
            console.error("An error occurred while deleting data:", error)
        }

        setIsDeleting(false)
    }


    return (
        <>
            <div className="modal fade" id="deleteProduct" tabIndex="-1" aria-labelledby="deleteProductLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={style.modal_content}>
                        <div className={style.modal_header}>
                            <h1 className="modal-title fs-5" id="deleteProductLabel">Hapus Produk</h1>
                            <button type="button" className={style.btn_close} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className={`modal-body ${style.modal_body}`}>
                            Apakah anda yakin menghapus produk
                        </div>
                        <div className={style.modal_footer}>
                            <button button type="button" className="btn btn-danger w-100" onClick={handleDelete}>
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
