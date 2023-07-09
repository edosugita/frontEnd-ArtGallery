'use client'

import LayoutsUser from "@/components/Layouts/User/Layouts"
import { useState } from "react"

export default function News() {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center vh-100" style={{backgroundColor: '#141414'}}>
                    <div class="spinner-grow text-danger" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <LayoutsUser>
                    <div>News</div>
                </LayoutsUser>
            )}
        </>
    )
}
