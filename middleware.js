export function middleware(request) {
    if (request.nextUrl.pathname.startsWith('/seller')) {
        console.log('seller')
    }
}