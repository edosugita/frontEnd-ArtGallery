'use client'
import Logout from "@/config/logout";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <div className="header">
                <div className="logo logo-dark flex justify-center">
                    <Link href="/admin/dashboard">
                        <Image
                            src="/assets/images/logo/logo.png"
                            width={130}
                            height={65}
                            alt="Logo" />
                        <Image
                            className="logo-fold"
                            src="/assets/images/logo/logo-fold.png"
                            width={80}
                            height={65}
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className="logo logo-white flex justify-center">
                    <Link href="index.html">
                        <Image
                            src="/assets/images/logo/logo-white.png"
                            width={130}
                            height={65}
                            alt="Logo"
                        />
                        <Image
                            className="logo-fold"
                            src="/assets/images/logo/logo-fold-white.png"
                            width={80}
                            height={65}
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className="nav-wrap">
                    <ul className="nav-left">
                        <li className="desktop-toggle">
                            <Link href="javascript:void(0);">
                                <i className="anticon"></i>
                            </Link>
                        </li>
                        <li className="mobile-toggle">
                            <Link href="javascript:void(0);">
                                <i className="anticon"></i>
                            </Link>
                        </li>
                    </ul>
                    <ul className="nav-right">
                        <li className="dropdown dropdown-animated scale-left">
                            <div className="pointer" data-toggle="dropdown">
                                <div className="avatar avatar-image  m-h-10 m-r-15">
                                    <Image
                                        src="/assets/images/avatars/thumb-3.jpg"
                                        width={40}
                                        height={40}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="p-b-15 p-t-20 dropdown-menu pop-profile">
                                <div className="p-h-20 p-b-15 m-b-10 border-bottom">
                                    <div className="d-flex m-r-50">
                                        <div className="avatar avatar-lg avatar-image">
                                            <Image
                                                src="/assets/images/avatars/thumb-3.jpg"
                                                width={48}
                                                height={48}
                                                alt=""
                                            />
                                        </div>
                                        <div className="m-l-10">
                                            <p className="m-b-0 text-dark font-weight-semibold">Marshall Nichols</p>
                                            <p className="m-b-0 opacity-07">UI/UX Desinger</p>
                                        </div>
                                    </div>
                                </div>
                                <Link href="javascript:void(0);" className="dropdown-item d-block p-h-15 p-v-10">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <i className="anticon opacity-04 font-size-16 anticon-user"></i>
                                            <span className="m-l-10">Edit Profile</span>
                                        </div>
                                        <i className="anticon font-size-10 anticon-right"></i>
                                    </div>
                                </Link>
                                <div className="dropdown-item d-block p-h-15 p-v-10 cursor-pointer" onClick={() => Logout()}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <i className="anticon opacity-04 font-size-16 anticon-logout"></i>
                                            <span className="m-l-10">Logout</span>
                                        </div>
                                        <i className="anticon font-size-10 anticon-right"></i>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>    
        </>
    )
}
