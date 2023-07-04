import { useState, useEffect } from "react";
import DeleteMessage from "@/components/users/DeleteMessage";
import Footer from "@/components/users/Footer";
import Navbar from "@/components/users/Navbar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSession } from "next-auth/react";

export default function Notification() {
  const [data, setData] = useState([]);
  const [session, setSession] = useState(null);
  const [deleteItemData, setDeleteItemData] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null)
  
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    fetchSession();
  }, []);

  const uuidUser = session?.user?.user.uuid_user;

  useEffect(() => {
    document.title = 'Art Gallery';
    
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/data/notification/get?uuidUser=${uuidUser}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (uuidUser) {
      fetchData();
    }
  }, [session]);


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
      <header>
        <Navbar />
      </header>

      <main>
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
      </main>

      <footer>
        <Footer />
      </footer>

      <DeleteMessage deleteItemData={deleteItemData} uuidUser={uuidUser}  />
    </>
  );
}
