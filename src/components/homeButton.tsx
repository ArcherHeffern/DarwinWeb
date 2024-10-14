import { BUTTON_S } from "@/styles/styles";
import Link from "next/link";

export default function HomeButton() {

    return (
        <Link style={BUTTON_S} href={{
            pathname: '/'
        }}>Home</Link>
    )
}