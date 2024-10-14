import HomeButton from './homeButton';
import BackButton from './backButton';
import LoginButton from './loginButton';
import SignUpButton from './createAccountButton';
import { useContext } from 'react';
import LogoutButton from './logoutButton';
import { AuthContext } from '@/pages/_app';

export default function Navbar() {

    const { accountId } = useContext(AuthContext);

    return (
        <div style={{ "display": "flex", "justifyContent": "space-between" }}>
            <div>
                <BackButton />
                <HomeButton />
            </div>
            <div style={{ "flexGrow": 1 }} />
            {!accountId &&
                <div style={{ "display": "flex", "justifyContent": "center" }}>
                    <LoginButton />
                    <SignUpButton />
                </div>
            }
            {accountId &&
                <LogoutButton />}
        </div>
    )
}