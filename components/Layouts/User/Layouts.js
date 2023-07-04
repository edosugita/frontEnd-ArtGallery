'use client'

import '@/styles/globals.css'
import Navbars from './Navbar'
import Script from 'next/script'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useEffect } from 'react'

export default function LayoutsUser({ children }) {
    useEffect(() => {
        typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
    }, [])
    
    return (
        <html lang="en">
            <body className='bg-background text-white'>
                <header>
                    <Navbars />
                </header>
                <main>{children}</main>
                <footer>
                    <Footer />
                </footer>
            </body>
            <Script
                type="text/javascript"
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key="SB-Mid-client-XravRxhAaythPuaC"
            />
        </html>
    )
}
