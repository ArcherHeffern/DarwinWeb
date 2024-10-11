import Link from 'next/link';
import BackButton from './backbutton';
import { BUTTON_S } from '@/styles/styles';

export default function Layout({ children }) {
  return (
    <div>
      <BackButton/>
      <Link style={BUTTON_S} href={{
        pathname: '/'
      }}>Home</Link>
      <main>{children}</main>
    </div>
  );
}