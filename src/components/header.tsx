import HomeButton from './homeButton';
import BackButton from './backButton';
import LoginButton from './loginButton';
import SignUpButton from './createAccountButton';
import { useContext } from 'react';
import LogoutButton from './logoutButton';
import { AuthContext } from '@/pages/_app';
import { BUTTON_S } from '@/styles/styles';

export default function Header() {

    const { username } = useContext(AuthContext);

    return (
        <div style={{ "display": "flex", "justifyContent": "space-between", "height": "50px", 'alignItems': 'center' }}>
            <div style={{ "display": "flex", "justifyContent": "space-between", "lineHeight": "none" }}>
                <BackButton />
                <HomeButton />
            </div>

            <h1 style={{ 'textDecoration': 'none', 'margin': '0' }}>Darwin Auto Grading System</h1>
            {!username &&
                <div style={{ "display": "flex", "justifyContent": "center" }}>
                    <LoginButton />
                    <SignUpButton />
                </div>
            }
            {username && (
                <div style={{ "display": "flex", "justifyContent": "space-between", "lineHeight": "none" }}>
                    <p style={BUTTON_S}>Hello {username}!</p>
                    <LogoutButton />
                </div>)
            }
        </div>
    )
}