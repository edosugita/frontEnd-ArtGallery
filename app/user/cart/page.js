'use client'

import DeleteProduct from "@/components/users/DeleteProduct"
import style from "@/styles/Cart.module.css"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import LayoutsUser from "@/components/Layouts/User/Layouts"
import Token from "@/config/userToken"
import axios from "axios"
import Cookies from "js-cookie"
import headers from "@/config/headers"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

export default function Cart() {
    const [selectAll, setSelectAll] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [deleteItemData, setDeleteItemData] = useState(null)
    const [isDeleting, setIsDeleting] = useState(null)
    const router = useRouter()
    const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([])
    const [productNames, setProductNames] = useState([])
    const [user, setUser] = useState([])
    const userToken = Cookies.get('token')

    useEffect(() => {
        setUser(userToken !== undefined ? Token() : null)
    }, [userToken])

    const uuid = user.uuid

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = process.env.NEXT_PUBLIC_API_URL
                const response = await axios.get(`${url}/cart/get/${uuid}`, {
                    headers: headers,
                    withCredentials: true
                })

                const responseData = Object.values(response.data.data)
                setData(responseData)

                setIsLoading(false)
            } catch (error) {
                console.error(error)  
            }
        }

        if (uuid) {
            fetchData()
        }
    }, [data, uuid])
    
    useEffect(() => {
        let totalPrice = 0
        selectedItems.forEach((itemId) => {
            const item = data.find((item) => item.id === itemId)
            if (item) {
                totalPrice += item.art.price
            }
        })
        setTotalPrice(totalPrice)
    }, [selectedItems, data])

    const handleSelectAll = () => {
        setSelectAll((prevSelectAll) => !prevSelectAll)
        if (!selectAll) {
            const allItemIds = data.map((item) => item.id)
            setSelectedItems(allItemIds)
        } else {
            setSelectedItems([])
        }
    }

    const handleCheckboxChange = (itemId) => {
        setSelectedItems((prevSelectedItems) => {
            if (selectAll) {
                return prevSelectedItems.filter(
                    (selectedItemId) => selectedItemId !== itemId
                )
            } else {
                if (prevSelectedItems.includes(itemId)) {
                    return prevSelectedItems.filter(
                        (selectedItemId) => selectedItemId !== itemId
                    )
                } else {
                    return [...prevSelectedItems, itemId]
                }
            }
        })
    }

    const handleDelete = async (itemId) => {
        try {
            setIsDeleting(true)
            const itemData = data.find((item) => item.art.uuid_art === itemId)
            const deleteItemDataWithUuidArt = {
                ...itemData,
                uuidArt: itemData.uuid_art,
            }
            
            setDeleteItemData(deleteItemDataWithUuidArt)
        } catch (error) {
            console.error(error)
        }
        setIsDeleting(false)
    }

    const handleCheckout = () => {
        const selectedItemsData = data.filter((item) =>
            selectedItems.includes(item.id)
        )

        const uuidArts = selectedItemsData.map((item) => item.uuid_art)

        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to buy this",
            icon: 'warning',
            background: '#141414',
            color: '#FFFFFF',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Pay'
        }).then(async(result) => {
            if (result.isConfirmed) {
                const url = process.env.NEXT_PUBLIC_API_URL
                const uuid = user.uuid
                const uuid_art = uuidArts
                const response = await axios.post(`${url}/payment/create`, {
                    uuid,
                    uuid_art
                }, {
                    headers: headers,
                    withCredentials: true
                })

                snap.pay(response.data.data.tokenPayment, {
                    onSuccess: function (result) {
                        alert('Payment success!')
                        postData(result, uuid_art)
                        deleteSelectedItems(uuid_art)
                    },
                    onPending: function (result) {
                        alert('Waiting for payment!')
                        postData(result, uuid_art)
                        deleteSelectedItems(uuid_art)
                    },
                    onError: function (result) {
                        alert('Payment failed!')
                        postData(result, uuid_art)
                    },
                    onClose: function () {
                        alert('You closed the popup without finishing the payment')
                    }
                })
            }
        })
    }

    const postData = async(payment, uuidArt) => {
        console.log(payment)
        if (payment) {
            const url = process.env.NEXT_PUBLIC_API_URL
            const uuid = user.uuid
            const uuid_art = uuidArt

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

    const deleteSelectedItems = async (uuidArts) => {
        try {
            const url = process.env.NEXT_PUBLIC_API_URL
            const uuid = user.uuid
            await Promise.all(
                uuidArts.map(async (uuidArt) => {
                    const response = await axios.delete(`${url}/cart/delete/${uuid}/${uuidArt}`,
                    {
                        headers: headers,
                        withCredentials: true
                    }
                    )
                        if (response.status === 200) {
                        console.log(`Item ${uuidArt} deleted successfully`)
                    }
                })
            )
            fetchData()
        } catch (error) {
            console.error("Error deleting selected items:", error)
        }
    }


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
                    <div className="vh-100">
                        <div className="container p-5">
                            <h5 className="notif">Cart</h5>
                            <table className="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" width="5%">
                                            <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  value=""
                                                  id="flexCheckDefault"
                                                  checked={selectAll}
                                                  onChange={handleSelectAll}
                                                />
                                            </div>
                                        </th>
                                        <th scope="col" width="50%">Art Name</th>
                                        <th scope="col" width="30%">Artist</th>
                                        <th scope="col" width="40%">Price</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                {data && data.length > 0 ? (
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="form-check">
                                                        <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id={`checkbox-${item.id}`}
                                                        checked={selectedItems.includes(item.id)}
                                                        onChange={() => handleCheckboxChange(item.id)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>{item.art.artname}</td>
                                                <td>{item.art.artist}</td>
                                                <td>
                                                    {new Intl.NumberFormat("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                    }).format(item.art.price)}
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center h-100">
                                                        <button
                                                        className="btn badge"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#deleteProduct"
                                                        onClick={() => handleDelete(item.art.uuid_art)}
                                                        >
                                                            <FontAwesomeIcon
                                                            icon={faTrash}
                                                            color="white"
                                                            className="me-2"
                                                            />
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                ) : null}
                            </table>
                        </div>

                        <div className="container pe-5 ps-5 fixed-bottom">
                            <div className={style.checkout}>
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className="form-check">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              value=""
                                              id="flexCheckDefault"
                                              checked={selectAll}
                                              onChange={handleSelectAll}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="flexCheckDefault"
                                            >
                                              Pilih Semua
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="d-flex justify-content-end align-items-center gap-3">
                                            <h5 className={style.h5}>
                                              Total Harga :{" "}
                                              <span>
                                                {new Intl.NumberFormat("id-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                }).format(totalPrice)}
                                              </span>
                                            </h5>
                                            {totalPrice > 0.0 && (
                                                <button className={`btn btn-danger ${style.btn}`} onClick={handleCheckout}>
                                                    Checkout
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DeleteProduct deleteItemData={deleteItemData} uuidUser={uuid} />
                </LayoutsUser>
            )}
        </>
    )
}
