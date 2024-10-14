import LoadingScreen from "@/components/loadingScreen";
import { VERIFY_EMAIL_URL } from "@/constants/constants";
import { FORM_ITEM_CONTAINER, FORM_S, SUBMIT_BUTTON_S, TEXT_INPUT_S } from "@/styles/styles";
import { Account, AccountPermission, AccountStatus } from "@/types/backend";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

export default function VerifyEmail() {
    const { query, isReady } = useRouter();
    const token = query.id;
    const [broadcastMsg, setBroadcastMsg] = useState<null | string>(null);
    const [createdAccount, setCreatedAccount] = useState<null | Account>(null);

    useEffect(() => {
        if (!isReady || typeof token !== 'string') {
            return;
        }
    }, [token, isReady])

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        const name = formData.get("name");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword")
        if (password !== confirmPassword) {
            setBroadcastMsg("Passwords don't match")
            return;
        }
        axios.post(VERIFY_EMAIL_URL + "/" + token, {
            'name': name,
            'password': password,
        }).then((response: AxiosResponse) => {
            setBroadcastMsg(null);
            setCreatedAccount(response.data)
        }).catch((error: AxiosError) => {
            setBroadcastMsg(`${error.message}: ${error.response?.data}`)
        })
    }

    if (!token) {
        return (<LoadingScreen />)
    }

    if (createdAccount) {
        return (
            <div>
                <div>
                    <h1>Created Account</h1>
                    <p>id: {createdAccount.id}</p>
                    <p>name: {createdAccount.name}</p>
                    <p>status: {AccountStatus[createdAccount.status]}</p>
                    <p>permission: {AccountPermission[createdAccount.permission]}</p>
                </div>
                <div>
                    <h1>Teacher Role Request Form</h1>
                    <p>TODO: In the meantime, ask for these permissions from Archer Heffern (hefferna@brandeis.edu)</p>
                </div>

            </div>
        )
    }

    return (
        <div>
            {broadcastMsg && <p>Exception: {broadcastMsg}</p>}
            <form onSubmit={handleSubmit} style={FORM_S}>
                <div style={FORM_ITEM_CONTAINER}>
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" style={TEXT_INPUT_S} id="name" required />
                </div>
                <div style={FORM_ITEM_CONTAINER}>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" style={TEXT_INPUT_S} required />
                </div>
                <div style={FORM_ITEM_CONTAINER}>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="password" name="confirmPassword" id="confirmPassword" style={TEXT_INPUT_S} required />
                </div>
                <input type="submit" value="submit" style={SUBMIT_BUTTON_S} />
            </form>
        </div>
    )
}