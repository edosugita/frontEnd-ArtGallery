'use client'

import style from '@/styles/Modal.module.css'
import {useState, useEffect} from "react"
import {validateUsername} from "@/components/validation/validation"
import {useRouter} from "next/navigation"
import Swal from "sweetalert2"
import Cookies from 'js-cookie'
import Token from '@/config/userToken'

export default function EditUsername() {
    const [data, setData] = useState(null)
    const [username, setUsername] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { usernameIsValid, usernameErrors } = validateUsername(username)
    const [user, setUser] = useState([])
    const userToken = Cookies.get('token')
    const router = useRouter()

    useEffect(() => {
        setUser(userToken !== undefined ? Token() : null)
    }, [userToken, user])


    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const response = await fetch(`api/users/${uuid}`)
    //             const data = await response.json()
    //             setData(data.user.username)
    //             setUsername(data.user.username)
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     }

    //     fetchData()
    // }, [uuid, data])

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            if (usernameErrors.length > 0 || username === '') {
                setErrorMessage('Username not valid')
            } else {
                const response = await fetch(`api/users/updates/username/${uuid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        username
                    })
                })

                if (response.error) {
                    setMessage('Invalid Data')
                } else {
                    await Swal.fire({
                        title: 'Success',
                        text: 'Username update successful!',
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
            <div className="modal fade" id="editUsername" tabIndex="-1" aria-labelledby="editUsernameLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={style.modal_content}>
                        <div className={style.modal_header}>
                            <h1 className="modal-title fs-5" id="editUsernameLabel">Edit Username</h1>
                            <button type="button" className={style.btn_close} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={`modal-body ${style.modal_body}`}>
                                {errorMessage && <>
                                    <div className="alert alert-danger text-center" role="alert">{errorMessage}</div>
                                </>}
                                <label htmlFor="username" className="form-label">NEW USERNAME</label>
                                <input type="text" className={style.form_control} name='username' id="username" placeholder="CreativeMuse" value={username} onChange={(event) => setUsername(event.target.value)} required />
                                <div id="surname" className="form-text">
                                    {!usernameIsValid && usernameErrors.map((error, index) => (
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
