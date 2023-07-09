'use client'
import axios from "axios"
import headers from "./headers"
import Swal from "sweetalert2"
import Cookies from "js-cookie"
import Token from "./userToken"

export default async function Logout() {
    const url = process.env.NEXT_PUBLIC_API_URL
    const user = Token()

    try {
        const response = await axios.post(`${url}/user/logout`, {}, {
            headers: headers,
            withCredentials: true
        })

        const responseData = response.data

        if (responseData.status == 200) {
            Cookies.remove('token')
            if (user?.status == 2) {
                Swal.fire({
                    title: 'Logout Success',
                    text: responseData.message,
                    icon: 'success',
                    timer: 1000,
                    timerProgressBar: true,
                    willClose: () => {
                        window.location.href = "/admin/auth/login"
                    }
                })
            } else {
                Swal.fire({
                    title: 'Logout Success',
                    text: responseData.message,
                    icon: "success",
                    timer: 1000,
                    background: '#141414',
                    color: '#FFFFFF',
                    timerProgressBar: true,
                    showConfirmButton: false,
                    progressStepsColor: '#E30813',
                    willClose: () => {
                        window.location.href = "/"
                    }
                })
            }
        }
    } catch (error) {
        console.error(error)
    }

    return null
}