import { useRouter } from 'next/router';
import { BUTTON_S } from '@/styles/styles';

export default function BackButton() {
  const router = useRouter();

  return (
    <button style={BUTTON_S} onClick={() => router.back()} >
      Back
    </button>
  );
}