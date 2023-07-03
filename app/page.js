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
        <div className="navbar bg-error">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </label>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
            <button className='btn btn-primary mr-4' onClick={handleClick}>PAY</button>

            {snapToken && (
                <button className='btn btn-primary' onClick={handleConfirm}>CONFIRM</button>
            )}
        </>
    )
}
