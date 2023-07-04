import DeleteProduct from "@/components/users/DeleteProduct";
import style from "@/styles/Cart.module.css";
import Navbar from "@/components/users/Navbar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Cart() {
  const [selectAll, setSelectAll] = useState(false);
  const [data, setData] = useState([]);
  const [session, setSession] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deleteItemData, setDeleteItemData] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const router = useRouter();
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);
  const [productNames, setProductNames] = useState([]);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    fetchSession();
  }, []);

  const uuidUser = session?.user?.user.uuid_user;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/data/cart/all?uuidUser=${uuidUser}`
        );
        const data = await response.json();
        setData(data);

        const names = data.map((item) => item.artname);
        setProductNames(names);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    document.title = "Art Gallery";
  }, [uuidUser]);

  useEffect(() => {
    let totalPrice = 0;
    selectedItems.forEach((itemId) => {
      const item = data.find((item) => item.id_cart === itemId);
      if (item) {
        totalPrice += item.price;
      }
    });
    setTotalPrice(totalPrice);
  }, [selectedItems, data]);

  const handleSelectAll = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
    if (!selectAll) {
      const allItemIds = data.map((item) => item.id_cart);
      setSelectedItems(allItemIds);
    } else {
      setSelectedItems([]);
    }
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (selectAll) {
        return prevSelectedItems.filter(
          (selectedItemId) => selectedItemId !== itemId
        );
      } else {
        if (prevSelectedItems.includes(itemId)) {
          return prevSelectedItems.filter(
            (selectedItemId) => selectedItemId !== itemId
          );
        } else {
          return [...prevSelectedItems, itemId];
        }
      }
    });
  };

  const handleDelete = async (itemId) => {
    try {
      setIsDeleting(true);
      const itemData = data.find((item) => item.id_cart === itemId);
      const deleteItemDataWithUuidArt = {
        ...itemData,
        uuidArt: itemData.uuid_art,
      };
      setDeleteItemData(deleteItemDataWithUuidArt);
    } catch (error) {
      console.error(error);
    }
    setIsDeleting(false);
  };

  const handlePaymentMethodChange = (methodId) => {
    setSelectedPaymentMethods((prevSelectedMethods) => {
      if (prevSelectedMethods.includes(methodId)) {
        return prevSelectedMethods.filter(
          (selectedId) => selectedId !== methodId
        );
      } else {
        return [...prevSelectedMethods, methodId];
      }
    });
  };

  const handleCheckout = async () => {
    try {
      const itemIds = selectedItems.map((itemId) => {
        const item = data.find((item) => item.id_cart === itemId);
        return item.uuid_art;
      });

      const fullName = session?.user?.user.name
      const email = session?.user?.user.email
      const phone = session?.user?.user.phone
      const uuidArt = itemIds.join(",")
      const payment_status = "pending"

      const payload = {
        uuidArt,
        totalPrice,
        paymentMethods: selectedPaymentMethods,
        productNames,
        fullName,
        email,
        phone,
      };

      // Mengambil semua uuidArt dari seluruh item dalam data
      const uuidArts = data.map((item) => item.uuid_art);

      await callMidtransAPI(payload, uuidArts);
    } catch (error) {
      console.error(error);
    }
  };

  async function callMidtransAPI(payload, uuidArts) {
    try {
      const response = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to call Midtrans API");
      }

      const { redirectUrl } = await response.json();

      window.open(redirectUrl);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="vh-100">
        <div className="container p-5">
          <h5 className="notif">Cart</h5>
          <table className="table">
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
                <th scope="col" width="70%">
                  Nama Art
                </th>
                <th scope="col" width="30%">
                  Harga
                </th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id={`checkbox-${item.id_cart}`}
                        checked={selectedItems.includes(item.id_cart)}
                        onChange={() => handleCheckboxChange(item.id_cart)}
                      />
                    </div>
                  </td>
                  <td>{item.artname}</td>
                  <td>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(item.price)}
                  </td>
                  <td>
                    <div className="d-flex align-items-center h-100">
                      <button
                        className="btn badge"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteProduct"
                        onClick={() => handleDelete(item.id_cart)}
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
                  <button
                    className={`btn btn-danger ${style.btn}`}
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <DeleteProduct deleteItemData={deleteItemData} uuidUser={uuidUser} />
    </>
  );
}
