import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request) {
    const userToken = request.cookies.get('token')?.value
    const path = request.nextUrl.pathname

    const url = process.env.NEXT_PUBLIC_APP_URL
    const decodeToken = userToken ? jwt.decode(userToken) : null
    const status = decodeToken?.status

    if (!userToken) {
        if (path === '/admin/auth/login' || path === '/admin/auth/register') {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(`${url}/admin/auth/login`)
        }
    }

    if (status === 1) {
        if (path.startsWith('/admin') && !path.startsWith('/admin/auth/login') && !path.startsWith('/admin/auth/register')) {
            return NextResponse.redirect(`${url}/`)
        } else {
            return NextResponse.next()
        }
    }

    if (status === 2) {
        if (path.startsWith('/admin') && !path.startsWith('/admin/auth/login') && !path.startsWith('/admin/auth/register')) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(`${url}/admin/dashboard`)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        `/admin/:path*`,
    ]
}