import { BUTTON_S } from "@/styles/styles";
import Link from "next/link";

export default function LoginButton() {
    return (
        <Link href={"/login"} style={BUTTON_S}>
            Login
        </Link>
    )
}