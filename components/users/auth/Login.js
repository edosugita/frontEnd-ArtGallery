'use client'

import style from '@/styles/Modal.module.css'
import Swal from "sweetalert2"
import { useState } from 'react'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import headers from '@/config/headers'
import Cookies from 'js-cookie'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [emailError, setEmailError] = useState("")
    const [isEmail, setIsEmail] = useState(true)
    const [isErrorEmail, setIsErrorEmail] = useState('')
    const [isErrorPassword, setIsErrorPassword] = useState('')
    const [isError, setIsError] = useState('')
    const [usernameError, setUsernameError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const pathname = usePathname()
    
    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }
    
    const handleSignIn = async (event) => {
        event.preventDefault()
        const url = process.env.NEXT_PUBLIC_API_URL
        
        try {
            const response = await axios.post(`${url}/user/login`,{
                email,
                password,
            }, {
                headers: headers,
                withCredentials: true
            })

            const responseData = response.data
            console.log(responseData)
            
            if (responseData.status == 200) {
                if (responseData.data.status === 2) {
                    setErrorMessage('Email is not registered or email and password are incorrect.')
                } else {
                    Cookies.set('token', responseData.data.token, { expires: 60 })
                    Swal.fire({
                        title: 'Login successful!',
                        text: 'Welcome to ArtGallery',
                        icon: "success",
                        timer: 1000,
                        background: '#141414',
                        color: '#FFFFFF',
                        timerProgressBar: true,
                        showConfirmButton: false,
                        progressStepsColor: '#E30813',
                        willClose: () => {
                            router.push(pathname)
                        }
                    })
                }
            }
            
        } catch (error) {
            setIsErrorEmail(error.response?.data?.errors?.email || null)
            setIsErrorPassword(error.response?.data?.errors?.password || null)
            setErrorMessage(error.response?.data?.message || null)
        }
    }

    const handleEmailChange = (event) => {
        const value = event.target.value
        setEmail(value)
        setEmailError("")
        setUsernameError("")
        if (value.includes("@")) {
            if (!/\S+@\S+\.\S+/.test(value)) {
                setIsEmail(true)
                setEmailError("Invalid email format")
            }
        } else {
            if (value.length < 3) {
                setIsEmail(false)
                setUsernameError("Username must be at least 3 characters long")
            }
        }
    }

    const validatePassword = () => {
        let passwordIsValid = true
        let passwordErrors = []

        if (password === ''){
            passwordIsValid = false
            passwordErrors.push("")
        } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
            passwordIsValid = false
            passwordErrors.push("Password must contain a combination of uppercase and lowercase letters.")
        } else if (!/(?=.*\d)(?=.*[a-zA-Z])/.test(password)) {
            passwordIsValid = false
            passwordErrors.push("Password must contain a combination of letters and numbers.")
        } else if (!/(?=.*[@#$%^&+=!])(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
            passwordIsValid = false
            passwordErrors.push("Password must contain at least one special character, such as @, #, or $.")
        } else if (password.length < 8) {
            passwordIsValid = false
            passwordErrors.push("Password must be at least 8 characters long.")
        } else if (password.length > 16) {
            passwordIsValid = false
            passwordErrors.push("Password must be at most 16 characters long.")
        }

        return { passwordIsValid, passwordErrors }
    }

    const { passwordIsValid, passwordErrors } = validatePassword()

    return (
        <>
            <div className="modal fade" id="Login" tabIndex="-1" aria-labelledby="LoginLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={style.modal_content}>
                        <div className={style.modal_header}>
                            <h1 className="modal-title fs-5" id="LoginLabel">Login</h1>
                            <button type="button" className={style.btn_close} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSignIn}>
                            <div className={`modal-body ${style.modal_body}`}>
                                {errorMessage && <>
                                    <div className="alert alert-danger text-center" role="alert">
                                        {errorMessage}
                                    </div>
                                </>}
                                <label htmlFor="email" className="form-label">EMAIL</label>
                                <input type="text" className={style.form_control} name='email' id="email" placeholder="type your email here ..." value={email} onChange={handleEmailChange} required />
                                <div id="email" className="form-text">
                                    {emailError && <span className="text-danger">{emailError}</span>}
                                </div>
                            </div>
                            <div className={`modal-body ${style.modal_body}`}>
                                <label htmlFor="password" className="form-label">PASSWORD</label>
                                <div className={style.passw}>
                                    <input type={showPassword ? "text" : "password"} className={style.form_control} name='password' id="password" placeholder="type your password here ..." value={password} onChange={(event) => setPassword(event.target.value)} required />
                                    <FontAwesomeIcon onClick={handleTogglePassword} className={style.icon_passw} icon={showPassword ? faEyeSlash : faEye} color='grey' />
                                </div>
                                <div id="password" className="form-text">
                                    {!passwordIsValid && passwordErrors.map((error, index) => (
                                        <span key={index} className="text-danger">{error}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={style.modal_footer}>
                                <button type="submit" className="btn btn-danger w-100 rounded-3">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}