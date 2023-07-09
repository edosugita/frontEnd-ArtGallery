'use client'

import { useState, useEffect } from "react";
import DeleteMessage from "@/components/users/DeleteMessage"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LayoutsUser from "@/components/Layouts/User/Layouts";

export default function Notification() {
    const [data, setData] = useState([]);
    const [session, setSession] = useState(null);
    const [deleteItemData, setDeleteItemData] = useState(null);
    const [isDeleting, setIsDeleting] = useState(null)
    const [isLoading, setIsLoading] = useState(true)


    const handleDelete = async (itemId) => {
      try {
          setIsDeleting(true);
          const itemData = data.find((item) => item.id_notification === itemId);
          const deleteItemDataWithUuidArt = { ...itemData};
          setDeleteItemData(deleteItemDataWithUuidArt);
      } catch (error) {
          console.error(error)
      }
          setIsDeleting(false);
    };
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
                        <table className="table">
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
                                              <button className="btn badge" data-bs-toggle="modal" data-bs-target="#deleteProduct" onClick={() => handleDelete(item.id_notification)}>
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
                </LayoutsUser>
            // <DeleteMessage deleteItemData={deleteItemData} uuidUser={uuidUser}  />
            )}
        </>
    );
}
