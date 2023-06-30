'use client'
import axios from "axios";
import headers from "./headers";
import Swal from "sweetalert2";

export default async function Logout() {
    const url = process.env.NEXT_PUBLIC_API_URL
    
    try {
        const response = await axios.post(`${url}/user/logout`, {}, {
            headers: headers,
            withCredentials: true
        });

        const responseData = response.data

        if (responseData.status == 200) {
            Swal.fire({
                title: 'Logout Success',
                text: responseData.message,
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                willClose: () => {
                    window.location.href = "/"
                }
            })
        }
    } catch (error) {
        console.error(error)
    }

    return null
}