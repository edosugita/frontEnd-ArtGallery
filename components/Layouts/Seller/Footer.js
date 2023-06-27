import React from 'react'

export default function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer-content">
                    <p className="m-b-0">Copyright © {new Date().getFullYear()} ArtGallery All rights reserved.</p>
                    <span>
                        <a href="" className="text-gray m-r-15">Term &amp; Conditions</a>
                        <a href="" className="text-gray">Privacy &amp; Policy</a>
                    </span>
                </div>
            </footer>
        </>
    )
}
