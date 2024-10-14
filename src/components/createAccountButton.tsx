import { BUTTON_S } from "@/styles/styles";
import Link from "next/link";

export default function SignUpButton() {
    return (
        <Link href={"/signup"} style={BUTTON_S}>
            Sign up
        </Link>
    )
}