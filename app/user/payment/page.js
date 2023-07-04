'use client'
import headers from '@/config/headers'
import axios from 'axios'
import React, { useState } from 'react'

export default function Home() {
    const [snapToken, setSnapToken] = useState('')

    const handleClick = async() => {
        const url = process.env.NEXT_PUBLIC_API_URL
        const uuid = "08487f7b-5b2f-4dcb-8cdd-5f2f6044bd5c"
        const uuid_art = [
            "3b105997-6612-42ff-a0d5-d8afe6bcc61a",
            "341196e5-77f9-4384-a5b9-2be0430a6a3a"
        ]
        const response = await axios.post(`${url}/payment/create`, {
            uuid,
            uuid_art
        }, {
            headers: headers,
            withCredentials: true
        })
        
        setSnapToken(response.data.data.tokenPayment)
    }

    const handleConfirm = async () => {
        snap.pay(snapToken, {
            onSuccess: function (result) {
                alert('Payment success!')
                postData(result)
            },
            onPending: function (result) {
                alert('Waiting for payment!')
                postData(result)
            },
            onError: function (result) {
                alert('Payment failed!')
                postData(result)
            },
            onClose: function () {
                alert('You closed the popup without finishing the payment')
            }
        })

        postData()
    }

    const postData = async(payment) => {
        if (payment) {
            const url = process.env.NEXT_PUBLIC_API_URL
            const uuid = "08487f7b-5b2f-4dcb-8cdd-5f2f6044bd5c"
            const uuid_art = [
                "3b105997-6612-42ff-a0d5-d8afe6bcc61a",
                "341196e5-77f9-4384-a5b9-2be0430a6a3a"
            ]
            const order_id = payment.order_id
            const gross_amount = payment.gross_amount
            const payment_type = payment.payment_type
            const bank = payment.va_numbers[0].bank
            const va_number = payment.va_numbers[0].va_number
            const status_code = payment.status_code

            const response = await axios.post(`${url}/payment/add`, {
                uuid,
                uuid_art,
                order_id,
                gross_amount,
                payment_type,
                bank,
                va_number,
                status_code,
            }, {
                headers: headers,
                withCredentials: true
            })

            console.log(response)
        }
    }

    return (
        <>
           <button className='btn btn-primary mr-4' onClick={handleClick}>PAY</button>

            {snapToken && (
                <button className='btn btn-primary' onClick={handleConfirm}>CONFIRM</button>
            )}
        </>
    )
}
