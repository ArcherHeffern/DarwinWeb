import { SIGNUP_URL } from "@/constants/constants"
import { FORM_ITEM_CONTAINER, FORM_S, SUBMIT_BUTTON_S, TEXT_INPUT_S } from "@/styles/styles";
import { SignUpResponse } from "@/types/backend";
import axios, { AxiosError, AxiosResponse } from "axios"
import { FormEvent, useState } from "react"


export default function Signup() {

    const [emailWasSent, setEmailWasSent] = useState<boolean>(false);
    const [ttl, setTtl] = useState<null|string>(null);
    const [errorMsg, setErrorMsg] = useState<null|string>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        const email = formData.get("email")
        if (!email) {
            throw Error("Invalid state detected: It should not be possible to submit the form with a null email")
        }

        axios.post(SIGNUP_URL, { "email": email }).then((response: AxiosResponse) => {
            const signUpResponse: SignUpResponse = response.data;
            setEmailWasSent(true)
            setTtl(signUpResponse.ttl);
        }).catch((error: AxiosError) => {
            setErrorMsg(`Error message ${error.message}`)
        });
    }

    if (errorMsg) {
        return (
            <div>
                <p>{errorMsg}</p>
            </div>
        )
    }

    if (!emailWasSent) {
        return (
            <div>
                <form onSubmit={handleSubmit} style={FORM_S}>
                    <div style={FORM_ITEM_CONTAINER}>
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" required style={TEXT_INPUT_S}/>
                    </div>
                    <input type="submit" value="submit" style={SUBMIT_BUTTON_S}/>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <p>We sent a link to your email account to verify who you are and set up the rest of your account</p>
                <p>This link will expire in {ttl} (h/m/s)</p>
            </div>
        )
    }
}