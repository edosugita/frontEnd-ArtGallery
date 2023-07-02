import Cookies from "js-cookie"

export default function Token() {
    const userToken = Cookies.get('token')

    const [headerB64, payloadB64, signatureB64] = userToken.split('.')
    const payload = JSON.parse(atob(payloadB64))

    return payload
}
