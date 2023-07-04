import style from '@/styles/Modal.module.css'
import {useEffect, useState} from "react";
import {getCsrfToken, getSession} from "next-auth/react";
import {setMessage} from "@/components/Message/messageSlice";
import Swal from "sweetalert2";
import {useRouter} from "next/router";

export default function PlaceBid() {
    const [price, setPrice] = useState('')
    const router = useRouter()
    const [data, setData] = useState(null)
    const {slug} = router.query
    const [session, setSession] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        async function fetchSession() {
            try {
                const session = await getSession()
                setSession(session)
            } catch (e) {
                console.log(e)
            }
        }

        fetchSession()
    }, [session])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/api/data/product/slug?slug=${slug}`)
                const data = await response.json()
                setData(data[0])
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [slug, data])

    const uuidArts = data?.uuid_art
    const uuidUser = session?.user?.user.uuid_user

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            if (price === '') {
                setErrorMessage('Bid price not valid')
            } else {
                const response = await fetch(`http://localhost:3000/api/data/bid/add/${uuidArts}?uuidUser=${uuidUser}`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        price
                    })
                })

                if (response.error) {
                    setMessage('Invalid Data')
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
                            router.reload()
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
                                <input name="getCsrfToken" type="hidden" defaultValue={getCsrfToken()} />
                                <label htmlFor="bid" className="form-label">Place your bid more than the latest best bid!</label>
                                <input type="text" className={style.form_control} value={price} onChange={(event) => setPrice(event.target.value)} placeholder="Place your bid here ..."  />
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
