import { NextResponse } from 'next/server'

export function middleware(request) {
    const userToken = request.cookies.get('token')?.value
    const path = request.nextUrl.pathname

    const url = process.env.NEXT_PUBLIC_APP_URL
    
    const decodeJwt = (token) => {
        const [headerB64, payloadB64, signatureB64] = token.split('.');
        const payload = JSON.parse(atob(payloadB64));
        return payload;
    };

    let decodedToken;
    try {
        if (userToken) {
        decodedToken = decodeJwt(userToken);
        }
    } catch (error) {
        console.log('Error decoding JWT:', error.message);
    }

    if (!userToken) {
        if (path === '/admin/auth/login' || path === '/admin/auth/register') {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(`${url}/admin/auth/login`)
        }
    }

    const status = decodedToken?.status

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