import { FormEvent, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { LOGIN_URL } from '@/constants/constants'
import { LoginResponse } from '@/types/backend'
import { BUTTON_S, CENTER_FORM_S, TEXT_INPUT_S } from '@/styles/styles'
import { AuthContext } from '../_app'

export default function LoginPage() {
    const router = useRouter()

    const { setAccountId, setPermission, setToken, setUsername } = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState<null | string>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        if (!email || !password) {
            setErrorMsg("Set email and password fields!")
            return;
        }

        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);
        axios.post(LOGIN_URL, params).then((response: AxiosResponse) => {
            const loginResponse: LoginResponse = response.data
            setAccountId(loginResponse.account_id)
            setToken(loginResponse.access_token)
            setPermission(loginResponse.permission)
            setUsername(loginResponse.name)
            router.push("/")
        }).catch((e: Error | AxiosError) => {
            if (axios.isAxiosError(e)) {
                setErrorMsg(JSON.stringify(e.response?.data) || "Axios request failed but we don't know why...")
            } else {
                setErrorMsg(e.message)
            }
        })
    }

    return (
        <div style={CENTER_FORM_S}>
            {errorMsg && <p>{errorMsg}</p>}
            <form onSubmit={handleSubmit} style={{"display": "flex", "flexDirection": "column"}}>
                <input type="email" name="email" placeholder="Email" required style={TEXT_INPUT_S}/>
                <input type="password" name="password" placeholder="Password" required style={TEXT_INPUT_S}/>
                <button type="submit" style={BUTTON_S}>Login</button>
            </form>
        </div>
    )
}