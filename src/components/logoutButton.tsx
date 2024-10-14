import { SIGNOUT_URL } from "@/constants/constants";
import { AuthContext } from "@/pages/_app";
import { BUTTON_S } from "@/styles/styles";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function LogoutButton() {

    const { token, setAccountId, setPermission, setToken } = useContext(AuthContext);
    const router = useRouter();

    function logout() {
        axios.post(SIGNOUT_URL, {}, { headers: { 'Authorization': `Bearer ${token}` } }).then(() => {
        }).catch((e: Error|AxiosError) => {
            console.log(`Error signing out: ${e.message}`)
        }).finally(() => {
            setAccountId(null);
            setToken(null);
            setPermission(null);
            router.push("/")
        })
    }

    return (
        <button onClick={logout} style={BUTTON_S}>
            Log out
        </button>
    )
}