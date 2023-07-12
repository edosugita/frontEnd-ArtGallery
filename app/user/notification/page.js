'use client'

import { useState, useEffect } from "react"
import DeleteMessage from "@/components/users/DeleteMessage"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LayoutsUser from "@/components/Layouts/User/Layouts"
import Cookies from "js-cookie"
import Token from "@/config/userToken"
import axios from "axios"
import headers from "@/config/headers"

export default function Notification() {
    const [data, setData] = useState([])
    const [session, setSession] = useState(null)
    const [deleteItemData, setDeleteItemData] = useState(null)
    const [isDeleting, setIsDeleting] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const [user, setUser] = useState([])
    const userToken = Cookies.get('token')

    useEffect(() => {
        setUser(userToken !== undefined ? Token() : null)
    }, [userToken])

    const uuid = user.uuid

    useEffect(() => {        
        const fetchData = async () => {
            try {
               const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notification/get/${uuid}`, {
                    headers: headers,
                    withCredentials: true
                })
                const dataAll = Object.values(response.data.data)
                setData(dataAll)
                setIsLoading(false)
            } catch (e) {
                console.error(e)
            }
        }

        fetchData()
    }, [uuid, data])

    const handleDelete = async (itemId) => {
      try {
          setIsDeleting(true)
          setDeleteItemData(itemId)
      } catch (error) {
          console.error(error)
      }
          setIsDeleting(false)
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
                    <div className="container p-5">
                        <h5 className="notif">Notification</h5>
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" width="90%">Pesan</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id_notification}>
                                        <td>{item.content}</td>
                                        <td>
                                            <div className="d-flex align-items-center h-100">
                                              <button className="btn badge" data-bs-toggle="modal" data-bs-target="#deleteProduct" onClick={() => handleDelete(item)}>
                                                  <FontAwesomeIcon icon={faTrash} color='white' className="me-2" />
                                                  Hapus
                                              </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <DeleteMessage deleteItemData={deleteItemData} uuidUser={uuid}  />
                </LayoutsUser>
            )}
        </>
    )
}
