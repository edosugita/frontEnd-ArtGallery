'use client'

import Image from "next/image"
import {useEffect, useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from "@fortawesome/free-solid-svg-icons"
import EditUsername from "@/components/users/EditUsername"
import EditPhone from "@/components/users/EditPhone"
import EditEmail from "@/components/users/EditEmail"
import EditPassword from "@/components/users/EditPassword"
import LayoutsUser from "@/components/Layouts/User/Layouts"
import Link from "next/link"
import Cookies from "js-cookie"
import Token from "@/config/userToken"
import axios from "axios"
import headers from "@/config/headers"

export default function Profile() {
    const [user, setUser] = useState([])
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const userToken = Cookies.get('token')

    useEffect(() => {
        setUser(userToken !== undefined ? Token() : null)
    }, [userToken, user])

    const uuid = user.uuid

    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_API_URL
        async function fetchData() {
            try {
                const response = await axios.get(`${url}/user/get/${uuid}`, {
                    headers: headers,
                    withCredentials: true
                })

                const responseData = response.data.data
                setData(responseData)
                setIsLoading(false)
            } catch (e) {
                console.error(e)
            }
        }

        fetchData()
    }, [data, uuid])

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
                    <div className="container p-5" key={data?.uuid}>
                        <div className="row">
                            <div className="col-md-3 col-12">
                                <h2>My Account</h2>
                                <div className="mt-4 nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <Link className="nav-link text-light" id="name-tab" data-toggle="pill" href="#" role="tab" aria-controls="name" aria-selected="true">Name</Link>
                                    <Link className="nav-link text-light" id="username-tab" data-toggle="pill" href="#" role="tab" aria-controls="username" aria-selected="false">Username</Link>
                                    <Link className="nav-link text-light" id="email-tab" data-toggle="pill" href="#" role="tab" aria-controls="email" aria-selected="false">Email</Link>
                                    <Link className="nav-link text-light" id="password-tab" data-toggle="pill" href="#" role="tab" aria-controls="password" aria-selected="false">Password</Link>
                                    <Link className="nav-link text-light" id="avatar-tab" data-toggle="pill" href="#" role="tab" aria-controls="avatar" aria-selected="false">Avatar</Link>
                                </div>
                            </div>
                            <div className="col-md-9 col-12">
                                <div className="tab-content" id="v-pills-tabContent">
                                    {/*NAME TAB*/}
                                    <div className="tab-pane fade show active" id="name" role="tabpanel" aria-labelledby="name-tab">
                                        <div className='p-4 rounded' style={{backgroundColor: "#2E2E2E"}}>
                                            <div className="row">
                                                <div className="col-4 d-flex align-items-center">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <h5>Name</h5>
                                                        </div>
                                                        <div className="col-12">
                                                            <span style={{color: "#858585", fontSize: "12px"}}>Your chosen name to identify yourself on a platform.</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-8">
                                                    <div className="p-3 rounded" style={{backgroundColor: "#474747"}}>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <label style={{color: "#858585", fontSize: "13px"}}>NAME</label>
                                                            </div>
                                                            <div className="col-12 mt-2">
                                                                <span>{data?.name}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*USERNAME TAB*/}
                                    <div className="tab-pane fade show active mt-5" id="username" role="tabpanel" aria-labelledby="username-tab">
                                        <div className='p-4 rounded' style={{backgroundColor: "#2E2E2E"}}>
                                            <div className="row">
                                                <div className="col-4 d-flex align-items-center">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <h5>Username</h5>
                                                        </div>
                                                        <div className="col-12">
                                                            <span style={{color: "#858585", fontSize: "12px"}}>Your chosen name to identify yourself on a platform.</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-8">
                                                    <div className="p-3 rounded" style={{backgroundColor: "#474747"}}>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <label style={{color: "#858585", fontSize: "13px"}}>USERNAME</label>
                                                            </div>
                                                            <div className="col-12 mt-2">
                                                                <span>{data?.username}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 d-flex justify-content-end mt-3">
                                                    <button className="btn p-2" style={{backgroundColor: "#474747", color: "#FFFFFF", fontSize: "13px"}} data-bs-toggle="modal" data-bs-target="#editUsername"><FontAwesomeIcon icon={faCog} className="me-2" />Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*PASSWORD TAB*/}
                                    <div className="tab-pane fade show active mt-5" id="password" role="tabpanel" aria-labelledby="password-tab">
                                        <div className='p-4 rounded' style={{backgroundColor: "#2E2E2E"}}>
                                            <div className="row">
                                                <div className="col-4 d-flex align-items-center">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <h5>Password</h5>
                                                        </div>
                                                        <div className="col-12">
                                                            <span style={{color: "#858585", fontSize: "12px"}}>A secret code to protect your account from unauthorized access.</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-8">
                                                    <div className="p-3 rounded" style={{backgroundColor: "#474747"}}>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <label style={{color: "#858585", fontSize: "13px"}}>PASSWORD</label>
                                                            </div>
                                                            <div className="col-12 mt-2">
                                                                <span>***********</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 d-flex justify-content-end mt-3">
                                                    <button className="btn p-2" style={{backgroundColor: "#474747", color: "#FFFFFF", fontSize: "13px"}} data-bs-toggle="modal" data-bs-target="#editPassword"><FontAwesomeIcon icon={faCog} className="me-2" />Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*EMAIL TAB*/}
                                    <div className="tab-pane fade show active mt-5" id="email" role="tabpanel" aria-labelledby="email-tab">
                                        <div className='p-4 rounded' style={{backgroundColor: "#2E2E2E"}}>
                                            <div className="row">
                                                <div className="col-4 d-flex align-items-center">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <h5>Email</h5>
                                                        </div>
                                                        <div className="col-12">
                                                            <span style={{color: "#858585", fontSize: "12px"}}>Used to receive important notifications and communications related to buying, selling, and bidding on artwork.</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-8">
                                                    <div className="p-3 rounded" style={{backgroundColor: "#474747"}}>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <label style={{color: "#858585", fontSize: "13px"}}>EMAIL</label>
                                                            </div>
                                                            <div className="col-12 mt-2">
                                                                <span>{data?.email}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 d-flex justify-content-end mt-3">
                                                    <button className="btn p-2" style={{backgroundColor: "#474747", color: "#FFFFFF", fontSize: "13px"}} data-bs-toggle="modal" data-bs-target="#editEmail"><FontAwesomeIcon icon={faCog} className="me-2" />Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*PHONE TAB*/}
                                    <div className="tab-pane fade show active mt-5" id="phone" role="tabpanel" aria-labelledby="phone-tab">
                                        <div className='p-4 rounded' style={{backgroundColor: "#2E2E2E"}}>
                                            <div className="row">
                                                <div className="col-4 d-flex align-items-center">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <h5>Phone Number</h5>
                                                        </div>
                                                        <div className="col-12">
                                                            <span style={{color: "#858585", fontSize: "12px"}}>Used for account verification and to receive important updates and notifications.</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-8">
                                                    <div className="p-3 rounded" style={{backgroundColor: "#474747"}}>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <label style={{color: "#858585", fontSize: "13px"}}>PHONE NUMBER</label>
                                                            </div>
                                                            <div className="col-12 mt-2">
                                                                <span>+62{data?.phone}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 d-flex justify-content-end mt-3">
                                                    <button className="btn p-2" style={{backgroundColor: "#474747", color: "#FFFFFF", fontSize: "13px"}} data-bs-toggle="modal" data-bs-target="#editPhone"><FontAwesomeIcon icon={faCog} className="me-2" />Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*AVATAR TAB*/}
                                    <div className="tab-pane fade show active mt-5" id="email" role="tabpanel" aria-labelledby="email-tab">
                                        <div className='p-4 rounded' style={{backgroundColor: "#2E2E2E"}}>
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <h5>Avatar</h5>
                                                        </div>
                                                        <div className="col-12">
                                                            <span style={{color: "#858585", fontSize: "12px"}}>A graphical representation of yourself on the website to personalize your account and interactions.</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-8">
                                                    <div className="p-3 rounded" style={{backgroundColor: "#474747"}}>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <label style={{color: "#858585", fontSize: "13px"}}>AVATAR</label>
                                                            </div>
                                                            {user.picture === 'user.png' ? (
                                                                <div className="col-12 mt-2">
                                                                    <Image
                                                                        src={`/images/avatar/avatar.jpg`}
                                                                        alt='Image Slider'
                                                                        width="250"
                                                                        height="250"
                                                                        className="rounded"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="col-12 mt-2">
                                                                    <Image
                                                                        src={`${process.env.NEXT_PUBLIC_IMG_URL}/${user.picture}`}
                                                                        alt='Image Slider'
                                                                        width="250"
                                                                        height="250"
                                                                        className="rounded"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 d-flex justify-content-end mt-3">
                                                    {/* <button className="btn p-2" style={{backgroundColor: "#474747", color: "#FFFFFF", fontSize: "13px"}} data-bs-toggle="modal" data-bs-target="#editUsername"><FontAwesomeIcon icon={faCog} className="me-2" />Edit</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <EditUsername />
                    <EditPassword />
                    <EditEmail />
                    <EditPhone />
                </LayoutsUser>
            )}
        </>
    )
}