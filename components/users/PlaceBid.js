import style from '@/styles/Modal.module.css'
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {usePathname, useRouter} from "next/navigation";
import axios from 'axios';
import headers from '@/config/headers';

export default function PlaceBid({ dataArt, uuidUser }) {
    const [price_bid, setPrice] = useState('')
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            if (price_bid === '') {
                setErrorMessage('Bid price not valid')
            } else {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/bid/add/${uuidUser}/${dataArt.uuid_art}`, {
                    price_bid
                }, {
                    headers: headers,
                    withCredentials: true
                })

                if (response.error) {
                    setErrorMessage('Invalid Data')
                } else {
                    await Swal.fire({
                        title: 'Success',
                        text: 'Bid price successful!',
                        icon: "success",
                        timer: 1000,
                        background: '#141414',
                        color: '#FFFFFF',
                        timerProgressBar: true,
                        showConfirmButton: false,
                        progressStepsColor: '#E30813',
                        willClose(popup) {
                            router.refresh()
                        },
                    })
                }
            }
        } catch (e) {
            setErrorMessage('Something went wrong')
        }
    }

    return (
        <>
            <div className="modal fade" id="placeBid" tabIndex="-1" aria-labelledby="placeBidLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={style.modal_content}>
                        <div className={style.modal_header}>
                            <h1 className="modal-title fs-5" id="placeBidLabel">Place Bid</h1>
                            <button type="button" className={style.btn_close} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={`modal-body ${style.modal_body}`}>
                                {errorMessage && <>
                                    <div className="alert alert-danger text-center" role="alert">{errorMessage}</div>
                                </>}
                                <label htmlFor="bid" className="form-label">Place your bid more than the latest best bid!</label>
                                <input type="text" className={style.form_control} value={price_bid} onChange={(event) => setPrice(event.target.value)} placeholder="Place your bid here ..."  />
                            </div>
                            <div className={style.modal_footer}>
                                <button type="submit" className="btn btn-danger w-100">Place Bid</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
