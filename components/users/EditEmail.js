import style from '@/styles/Modal.module.css'
import {useEffect, useState} from "react"
import {validateEmail} from "@/components/validation/validation"
import {getCsrfToken, getSession} from "next-auth/react"
import Swal from "sweetalert2"
import {useRouter} from "next/router"

export default function EditEmail() {
    const [session, setSession] = useState(null)
    const [data, setData] = useState(null)
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { emailIsValid, emailErrors } = validateEmail(email)

    const router = useRouter()

    useEffect(() => {
        async function fetchSession() {
            try {
                const session = await getSession()
                setSession(session)
            } catch (e) {
                console.log({message: e})
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
                setData(data.user.email)
                setEmail(data.user.email)
            } catch (e) {
                console.log(e)
            }
        }

        fetchData()
    }, [uuid, data])

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            if (emailErrors.length > 0 || email === '') {
                setErrorMessage('Email not valid')
            } else {
                const response = await fetch(`api/users/updates/email/${uuid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        email
                    })
                })
                if (response.error) {
                    setErrorMessage("Invalid data");
                } else {
                    await Swal.fire({
                        title: 'Success',
                        text: 'Email update successful!',
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
            <div className="modal fade" id="editEmail" tabIndex="-1" aria-labelledby="editEmailLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={style.modal_content}>
                        <div className={style.modal_header}>
                            <h1 className="modal-title fs-5" id="editEmailLabel">Edit Email</h1>
                            <button type="button" className={style.btn_close} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={`modal-body ${style.modal_body}`}>
                                {errorMessage && <>
                                    <div className="alert alert-danger text-center" role="alert">{errorMessage}</div>
                                </>}
                                <input name="getCsrfToken" type="hidden" defaultValue={getCsrfToken()} />
                                <label htmlFor="email" className="form-label">NEW EMAIL</label>
                                <input type="email" className={style.form_control} name='email' id="email" placeholder="CreativeMuse@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
                                <div id="email" className="form-text">
                                    {!emailIsValid && emailErrors.map((error, index) => (
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
