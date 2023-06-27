
import '@/app/globals.css'
import '@/public/assets/css/app.min.css'
import '@/public/assets/vendors/select2/select2.css'
import Navbar from './Navbar'
import Script from 'next/script'
import SideBar from './SideBar'
import Footer from './Footer'

export default function LayoutsSeller({ children }) {
    
    return (
        <html lang="en">
            <body>
                <main>
                    <div className="app">
                        <div className="layout">
                            <Navbar />
                            <SideBar />

                            <div className="page-container">
                                <div className="main-content">
                                    {children}
                                </div>

                                <Footer />
                            </div>
                        </div>
                    </div>
                </main>
            </body>
            <Script src='/assets/js/vendors.min.js' />
            <Script src='/assets/js/app.min.js' />
            <Script src='/assets/vendors/select2/select2.min.js' /> 
            <Script src='/assets/vendors/quill/quill.min.js' />
            <Script src='/assets/js/custom.js' /> 
        </html>
    )
}
