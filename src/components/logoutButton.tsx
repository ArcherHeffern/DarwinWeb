import { SIGNOUT_URL } from "@/constants/constants";
import { AuthContext } from "@/pages/_app";
import { AuthHeaders } from "@/services/auth";
import { BUTTON_S } from "@/styles/styles";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function LogoutButton() {

    const { token, setAccountId, setPermission, setToken, setUsername } = useContext(AuthContext);
    const router = useRouter();

    function logout() {
        if (!token) {
            console.log("Attempted to log out when user was already logged out (did not have token)")
            return;
        }
        axios.post(SIGNOUT_URL, {}, AuthHeaders(token)).then(() => {
        }).catch((e: Error|AxiosError) => {
            console.log(`Error signing out: ${e.message}`)
        }).finally(() => {
            setAccountId(null);
            setToken(null);
            setPermission(null);
            setUsername(null);
            router.push("/")
        })
    }

    return (
        <button onClick={logout} style={BUTTON_S}>
            Log out
        </button>
    )
}