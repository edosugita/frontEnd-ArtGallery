import style from '@/styles/Modal.module.css'
import Swal from "sweetalert2"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { validatePassword, validateCpassword, validateUsername, validateEmail, validatePhone } from "@/components/validation/validation"
import axios from 'axios'
import headers from '@/config/headers'

export default function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setCpassword] = useState('')
    const [phone, setPhone] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [isErrorName, setIsErrorName] = useState('')
    const [isErrorUsername, setIsErrorUsername] = useState('')
    const [isErrorEmail, setIsErrorEmail] = useState('')
    const [isErrorPhone, setIsErrorPhone] = useState('')
    const [isErrorPassword, setIsErrorPassword] = useState('')
    const [isErrorCPassword, setIsErrorCPassword] = useState('')
    const [isError, setIsError] = useState('')

    const router = useRouter()

    const status = 1

    const { usernameIsValid, usernameErrors } = validateUsername(username)
    const { emailIsValid, emailErrors } = validateEmail(email)
    const { phoneIsValid, phoneErrors } = validatePhone(phone)
    const { passwordIsValid, passwordErrors } = validatePassword(password)
    const { cpasswordIsValid, cpasswordErrors } = validateCpassword(password, password_confirmation)

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            if (password !== password_confirmation) {
                setErrorMessage("Password not matched!")
            } else if (name === '') {
                setErrorMessage('Name cannot be empty')
            } else if (usernameErrors.length > 0 || username === '') {
                setErrorMessage('Username not valid')
            } else if (emailErrors.length > 0 || email === '') {
                setErrorMessage('Email not valid')
            } else if (passwordErrors.length > 0 || password === '') {
                setErrorMessage('Password not valid')
            } else if (cpasswordErrors.length > 0 || cpassword === '') {
                setErrorMessage('Confirm password not valid')
            } else if (phoneErrors.length > 0 || phone === '') {
                setErrorMessage('Phone number not valid')
            } else {
                const url = process.env.NEXT_PUBLIC_API_URL
        
                try {
                    const response = await axios.post(`${url}/user/create`,{
                        name,
                        username,
                        email,
                        phone,
                        password,
                        password_confirmation,
                        status
                    }, {
                        headers: headers,
                    })

                    const responseData = response.data

                    if (responseData.status == 201) {
                        Swal.fire({
                            title: 'Success',
                            text: 'Registration successful!',
                            icon: "success",
                            timer: 1000,
                            background: '#141414',
                            color: '#FFFFFF',
                            timerProgressBar: true,
                            showConfirmButton: false,
                            progressStepsColor: '#E30813',
                            willClose: () => {
                                router.push('/')
                            }
                        })
                    }
                    
                } catch (error) {
                    setIsErrorName(error.response?.data?.errors?.name || null);
                    setIsErrorUsername(error.response?.data?.errors?.username || null)
                    setIsErrorEmail(error.response?.data?.errors?.email || null)
                    setIsErrorPhone(error.response?.data?.errors?.phone || null)
                    setIsErrorPassword(error.response?.data?.errors?.password || null)
                    setIsErrorCPassword(error.response?.data?.errors?.password_confirmation || null)
                    setIsError(error.response?.data?.message || null)

                    console.error(error)
                }
            }
        } catch (error) {
            setErrorMessage("Something went wrong")
        }
    }

    return (
        <>
            <div className="modal fade" id="Register" tabIndex="-1" aria-labelledby="RegisterLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={style.modal_content}>
                        <div className={style.modal_header}>
                            <h1 className="modal-title fs-5" id="RegisterLabel">Register</h1>
                            <button type="button" className={style.btn_close} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={`modal-body ${style.modal_body}`}>
                            {errorMessage && <>
                                <div className="alert alert-danger text-center" role="alert">{errorMessage}</div>
                            </>}
                            
                                <label htmlFor="name" className="form-label">NAME</label>
                                <input type="text" className={style.form_control} name='name' id="name" placeholder="type your name here ..." value={name} onChange={(event) => setName(event.target.value)} required />
                            </div>
                            <div className={`modal-body ${style.modal_body}`}>
                                <label htmlFor="username" className="form-label">USERNAME</label>
                                <input type="text" className={style.form_control} name='username' id="username" placeholder="type your username here ..." value={username} onChange={(event) => setUsername(event.target.value)} required />
                                <div id="surname" className="form-text">
                                    {!usernameIsValid && usernameErrors.map((error, index) => (
                                        <span key={index} className="text-danger">{error}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={`modal-body ${style.modal_body}`}>
                                <label htmlFor="email" className="form-label">EMAIL</label>
                                <input type="email" className={style.form_control} name='email' id="email" placeholder="type your email here ..." value={email} onChange={(event) => setEmail(event.target.value)} required />
                                <div id="email" className="form-text">
                                    {!emailIsValid && emailErrors.map((error, index) => (
                                        <span key={index} className="text-danger">{error}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={`modal-body ${style.modal_body}`}>
                                <label htmlFor="password" className="form-label">PASSWORD</label>
                                <div className={style.passw}>
                                    <input type={showPassword ? 'text' : 'password'} className={style.form_control} name='password' id="password" placeholder="**********" value={password} onChange={(event) => setPassword(event.target.value)} required />
                                    <FontAwesomeIcon onClick={handleTogglePassword} className={style.icon_passw} icon={showPassword ? faEyeSlash : faEye} color='grey' />
                                </div>
                                <div id="password" className="form-text">
                                    {!passwordIsValid && passwordErrors.map((error, index) => (
                                        <span key={index} className="text-danger">{error}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={`modal-body ${style.modal_body}`}>
                                <label htmlFor="cpassword" className="form-label">RE-WRITE PASSWORD</label>
                                <div className={style.passw}>
                                    <input type={showPassword ? 'text' : 'password'} className={style.form_control} name='cpassword' id="cpassword" placeholder="**********" value={password_confirmation} onChange={(event) => setCpassword(event.target.value)} required />
                                    <FontAwesomeIcon onClick={handleTogglePassword} className={style.icon_passw} icon={showPassword ? faEyeSlash : faEye} color='grey' />
                                </div>
                                <div id="cpassword" className="form-text">
                                    {!cpasswordIsValid && cpasswordErrors.map((error, index) => (
                                        <span key={index} className="text-danger">{error}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={`modal-body ${style.modal_body}`}>
                                <label htmlFor="phone" className="form-label">NEW PHONE NUMBER</label>
                                <input type="tel" className={style.form_control} name='phone' id="phone" placeholder="+62" value={phone} onChange={(event) => setPhone(event.target.value)} required />
                                <div id="phone" className="form-text">
                                    {!phoneIsValid && phoneErrors.map((error, index) => (
                                        <span key={index} className="text-danger">{error}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={style.modal_footer}>
                                <button type="submit" className="btn btn-danger w-100 rounded-3">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
