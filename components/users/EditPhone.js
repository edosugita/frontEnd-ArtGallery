import style from '@/styles/Modal.module.css'
import {useEffect, useState} from "react";
import {getCsrfToken, getSession} from "next-auth/react";
import {validatePhone} from "@/components/validation/validation";
import {setMessage} from "@/components/Message/messageSlice";
import Swal from "sweetalert2";
import {useRouter} from "next/router";

export default function EditPhone() {
    const [session, setSession] = useState(null)
    const [data, setData] = useState(null)
    const [phone, setPhone] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { phoneIsValid, phoneErrors } = validatePhone(phone)
    const router = useRouter()

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

    const uuid = session?.user?.user.uuid_user

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`api/users/${uuid}`)
                const data = await response.json()
                setData(data.user.phone)
                setPhone(`0${data.user.phone}`)
            } catch (e) {
                console.log(e)
            }
        }

        fetchData()
    }, [uuid, data])

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            if (phoneErrors.length > 0 || phone === '') {
                setErrorMessage('Phone number not valid')
            } else {
                const response = await fetch(`api/users/updates/phone/${uuid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        phone
                    })
                })

                if (response.error) {
                    setMessage('Invalid Data')
                } else {
                    await Swal.fire({
                        title: 'Success',
                        text: 'Phone number update successful!',
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
            <div className="modal fade" id="editPhone" tabIndex="-1" aria-labelledby="editPhoneLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={style.modal_content}>
                        <div className={style.modal_header}>
                            <h1 className="modal-title fs-5" id="editPhoneLabel">Edit Phone Number</h1>
                            <button type="button" className={style.btn_close} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={`modal-body ${style.modal_body}`}>
                                {errorMessage && <>
                                    <div className="alert alert-danger text-center" role="alert">{errorMessage}</div>
                                </>}
                                <input name="getCsrfToken" type="hidden" defaultValue={getCsrfToken()} />
                                <label htmlFor="telp" className="form-label">NEW PHONE NUMBER</label>
                                <input type="text" className={style.form_control} name='telp' id="telp" placeholder="+628123123123" value={`${phone}`} onChange={(event) => setPhone(event.target.value)} required />
                                <div id="phone" className="form-text">
                                    {!phoneIsValid && phoneErrors.map((error, index) => (
                                        <span key={index} className="text-danger">{error}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={style.modal_footer}>
                                <button type="submit" className="btn btn-danger">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
