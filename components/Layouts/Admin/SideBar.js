'use client';
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

export default function SideBar() {
    const pathname = usePathname()
    const segments = pathname ? pathname.split('/') : []
    const auctionHalfSegment = segments[segments.length - 2]
    const auctionLastSegment = segments[segments.length - 1]

    console.log(auctionHalfSegment + '/' + auctionLastSegment)

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
                        <li className={`nav-item dropdown ${isActiveDropDown('sell-item/product')} ${isActiveDropDown('sell-item/auction')} ${isActiveDropDown('sell-item/discount')}`}>
                            <Link className="dropdown-toggle" href="#">
                                <span className="icon-holder">
                                    <i className="anticon anticon-tags"></i>
                                </span>
                                <span className="title">Sell Item</span>
                                <span className="arrow">
                                    <i className="arrow-icon"></i>
                                </span>
                            </Link>
                            <ul className="dropdown-menu">
                                <li className={isActiveLink('sell-item/product')}>
                                    <Link href="/admin/sell-item/product">Products</Link>
                                </li>
                                <li className={isActiveLink('sell-item/auction')}>
                                    <Link href="/admin/sell-item/auction">Items for Auction</Link>
                                </li>
                                <li className={isActiveLink('sell-item/discount')}>
                                    <Link href="/admin/sell-item/discount">Products with a Discount</Link>
                                </li>
                            </ul>
                        </li>
                        <li className={`nav-item dropdown ${isActiveDropDown('data/product')} ${isActiveDropDown('data/auction')} ${isActiveDropDown('data/discount')}`}>
                            <Link className="dropdown-toggle" href="#">
                                <span className="icon-holder">
									<i className="anticon anticon-hdd"></i>
								</span>
                                <span className="title">View Product</span>
                                <span className="arrow">
									<i className="arrow-icon"></i>
								</span>
                            </Link>
                            <ul className="dropdown-menu">
                                <li className={isActiveLink('data/product')}>
                                    <Link href="avatar.html">Products</Link>
                                </li>
                                <li className={isActiveLink('data/auction')}>
                                    <Link href="alert.html">Auction Items</Link>
                                </li>
                                <li className={isActiveLink('data/discount')}>
                                    <Link href="badge.html">Discounted Items</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
