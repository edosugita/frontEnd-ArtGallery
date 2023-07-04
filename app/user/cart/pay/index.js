import Footer from '@/components/users/Footer'
import Navbar from '@/components/users/Navbar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Payment() {
    const router = useRouter()

    const { fullName, email, phone, uuidArt, payment_status, gross_amount, paymentMethod } = router.query;

    const handleClick = async (pembayaran) => {
        try {
            const payload = {
                paymentMethod: pembayaran,
                fullName,
                email,
                phone,
                uuidArt,
                payment_status,
                gross_amount,
            };

            const response = await fetch('/api/payment/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // Handle response jika sukses
                const data = await response.json();
                console.log('Checkout success:', data);
                // Lakukan tindakan sesuai kebutuhan
            } else {
                // Handle response jika terjadi kesalahan
                const errorData = await response.json();
                console.log('Checkout error:', errorData);
                // Lakukan tindakan sesuai kebutuhan
            }
        } catch (error) {
            console.error('Error:', error);
            // Lakukan tindakan sesuai kebutuhan
        }
    };

    return (
        <>
            <header>
                <Navbar />
            </header>

            <main className="vh-100 mt-5 container">
                <div className="card p-5">
                    <div className="row gap-3 justify-content-center">
                        <div className="col-12">
                            <h5 className='text-center text-dark mb-5'>Metode Pembayaran</h5>
                        </div>
                        <div className="col-md-5 col-sm-12 cursor-pointer" onClick={() => handleClick('bri')}>
                            <div className="bg-secondary p-3 d-flex justify-content-center align-items-center rounded">
                                <span className='fw-bold fs-5'>BRI</span>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-12 cursor-pointer" onClick={() => handleClick('bni')}>
                            <div className="bg-secondary p-3 d-flex justify-content-center align-items-center rounded">
                                <span className='fw-bold fs-5'>BNI</span>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-12 cursor-pointer" onClick={() => handleClick('bca')}>
                            <div className="bg-secondary p-3 d-flex justify-content-center align-items-center rounded">
                                <span className='fw-bold fs-5'>BCA</span>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-12 cursor-pointer" onClick={() => handleClick('mandiri')}>
                            <div className="bg-secondary p-3 d-flex justify-content-center align-items-center rounded">
                                <span className='fw-bold fs-5'>Mandiri</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}
