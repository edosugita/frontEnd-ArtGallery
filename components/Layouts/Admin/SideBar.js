'use client';
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

export default function SideBar() {
    const pathname = usePathname()
    const segments = pathname ? pathname.split('/') : []
    const auctionHalfSegment = segments[segments.length - 2]
    const auctionLastSegment = segments[segments.length - 1]

    const isActiveLink = (href) => {
        return auctionHalfSegment + '/' + auctionLastSegment === href ? 'active' : ''
    }

    const isActiveDropDown = (href) => {
        return auctionHalfSegment + '/' + auctionLastSegment === href ? 'open' : ''
    }
    return (
        <>
            <div className="side-nav">
                <div className="side-nav-inner">
                    <ul className="side-nav-menu scrollable">
                        <li className={`nav-item dropdown ${isActiveDropDown('admin/dashboard')}`}>
                            <Link className="dropdown-toggle" href="#">
                                <span className="icon-holder">
                                    <i className="anticon anticon-dashboard"></i>
                                </span>
                                <span className="title">Dashboard</span>
                                <span className="arrow">
                                    <i className="arrow-icon"></i>
                                </span>
                            </Link>
                            <ul className="dropdown-menu">
                                <li className={isActiveLink('admin/dashboard')}>
                                    <Link href="/admin/dashboard">Home</Link>
                                </li>
                            </ul>
                        </li>
                        <li className={`nav-item dropdown ${isActiveDropDown('product/product')} ${isActiveDropDown('product/auction')} ${isActiveDropDown('product/discount')}`}>
                            <Link className="dropdown-toggle" href="#">
                                <span className="icon-holder">
                                    <i className="anticon anticon-tags"></i>
                                </span>
                                <span className="title">Product</span>
                                <span className="arrow">
                                    <i className="arrow-icon"></i>
                                </span>
                            </Link>
                            <ul className="dropdown-menu">
                                <li className={isActiveLink('product/sell')}>
                                    <Link href="/admin/product/sell">Products for Sale</Link>
                                </li>
                                <li className={isActiveLink('product/auction')}>
                                    <Link href="/admin/product/auction">Items for Auction</Link>
                                </li>
                                <li className={isActiveLink('product/discount')}>
                                    <Link href="/admin/product/discount">Products with a Discount</Link>
                                </li>
                            </ul>
                        </li>
                        <li className={`nav-item dropdown ${isActiveDropDown('admin/notification')}`}>
                            <Link className="dropdown-toggle" href="#">
                                <span className="icon-holder">
									<i className="anticon anticon-hdd"></i>
								</span>
                                <span className="title">Notification</span>
                                <span className="arrow">
									<i className="arrow-icon"></i>
								</span>
                            </Link>
                            <ul className="dropdown-menu">
                                <li className={isActiveLink('admin/notification')}>
                                    <Link href="/admin/notification">Add</Link>
                                </li>
                            </ul>
                        </li>
                        <li className={`nav-item dropdown ${isActiveDropDown('admin/information')} ${isActiveDropDown('information/add')} `}>
                            <Link className="dropdown-toggle" href="#">
                                <span className="icon-holder">
									<i className="anticon anticon-hdd"></i>
								</span>
                                <span className="title">Information</span>
                                <span className="arrow">
									<i className="arrow-icon"></i>
								</span>
                            </Link>
                            <ul className="dropdown-menu">
                                <li className={isActiveLink('admin/information')}>
                                    <Link href="/admin/information">Create</Link>
                                </li>
                            </ul>
                        </li>
                        <li className={`nav-item dropdown ${isActiveDropDown('admin/event')} ${isActiveDropDown('event/add')} `}>
                            <Link className="dropdown-toggle" href="#">
                                <span className="icon-holder">
									<i className="anticon anticon-hdd"></i>
								</span>
                                <span className="title">Event</span>
                                <span className="arrow">
									<i className="arrow-icon"></i>
								</span>
                            </Link>
                            <ul className="dropdown-menu">
                                <li className={isActiveLink('admin/event')}>
                                    <Link href="/admin/event">Create</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
