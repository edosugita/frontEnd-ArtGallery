'use client'

import style from '@/styles/Modal.module.css'
import {useState, useEffect} from "react"
import {validateCpassword, validatePassword} from "@/components/validation/validation"
import {useRouter} from "next/navigation"
import Swal from "sweetalert2"
import Cookies from 'js-cookie'
import Token from '@/config/userToken'
import axios from 'axios'
import headers from '@/config/headers'

export default function EditPassword() {
    const [data, setData] = useState(null)
    const [password, setPassword] = useState('')
    const [old_password, setOldPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [password_confirmation, setCpassword] = useState('')
    const { passwordIsValid, passwordErrors } = validatePassword(password)
    const { cpasswordIsValid, cpasswordErrors } = validateCpassword(password, password_confirmation)
    const [user, setUser] = useState([])
    const userToken = Cookies.get('token')
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        setUser(userToken !== undefined ? Token() : null)
    }, [userToken, user])

    const uuid = user.uuid

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            if (password !== password_confirmation) {
                setErrorMessage("Password not matched!")
            }  else {
                const response = await axios.put(`${url}/user/update/password/${uuid}`, {
                    old_password,
                    password_confirmation,
                    password
                }, {
                    headers: headers,
                    withCredentials: true
                })

                if (response.error) {
                    setMessage('Invalid Data')
                } else {
                    await Swal.fire({
                        title: 'Success',
                        text: 'Password update successful!',
                        icon: "success",
                        timer: 1000,
                        background: '#141414',
                        color: '#FFFFFF',
                        timerProgressBar: true,
                        showConfirmButton: false,
                        progressStepsColor: '#E30813',
                        willClose(popup) {
                            router.push('/')
                        },
                    })
                }
            }
        } catch (e) {
            setErrorMessage('Password not matched!')
        }
    }

    return (
        <>
            <div className="modal fade" id="editPassword" tabIndex="-1" aria-labelledby="editUsernameLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={style.modal_content}>
                        <div className={style.modal_header}>
                            <h1 className="modal-title fs-5" id="editUsernameLabel">Edit Password</h1>
                            <button type="button" className={style.btn_close} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={`modal-body ${style.modal_body}`}>
                                <label htmlFor="old_password" className="form-label">OLD PASSWORD</label>
                                <input type="password" className={style.form_control} value={`${old_password}`} onChange={(event) => setOldPassword(event.target.value)} required placeholder="************" />

                            </div>
                            <div className={`modal-body ${style.modal_body}`}>
                                <label htmlFor="new_password" className="form-label">NEW PASSWORD</label>
                                <input type="password" className={style.form_control} value={`${password}`} onChange={(event) => setPassword(event.target.value)} required placeholder="************" />

                                {!passwordIsValid && passwordErrors.map((error, index) => (
                                    <span key={index} className="text-danger">{error}</span>
                                ))}
                            </div>
                            <div className={`modal-body ${style.modal_body}`}>
                                <label htmlFor="con_password" className="form-label">CONFIRM PASSWORD</label>
                                <input type="password" className={style.form_control} value={password_confirmation} onChange={(event) => setCpassword(event.target.value)} required placeholder="************" />
                                {!cpasswordIsValid && cpasswordErrors.map((error, index) => (
                                    <span key={index} className="text-danger">{error}</span>
                                ))}
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
