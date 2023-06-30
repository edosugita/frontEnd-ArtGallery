
import '@/app/globals.css'
import '@/public/assets/css/app.min.css'
import Script from 'next/script'

export default function LayoutsAdminAuth({ children }) {
    return (
        <html lang="en">
            <body>
                <main>
                    <div className="app">
                        <div className="container-fluid p-0 h-100">
                            <div className="row no-gutters h-100 full-height bg-black">
                                <div className="col-lg-4 d-none d-lg-flex bg" style={{backgroundImage: 'url(/assets/images/others/image-bg.jpg)'}}>
                                </div>
                                {children}
                            </div>
                        </div>
                    </div>
                </main>
            </body>
            <Script src='/assets/js/vendors.min.js' />
            <Script src='/assets/js/app.min.js' />
        </html>
    )
}
