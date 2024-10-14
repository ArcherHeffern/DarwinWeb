import { BUTTON_S } from "@/styles/styles";
import Link from "next/link";

export default function CreateAccountButton() {
    return (
        <Link href={"/account"} style={BUTTON_S}>
            Create account
        </Link>
    )
}