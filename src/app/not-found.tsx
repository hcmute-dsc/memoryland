import Link from 'next/link';
import { Container } from '@/components/ui';

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="text-8xl font-extrabold text-orange/20">404</p>
      <h1 className="mt-4 text-3xl font-bold">Ký ức này chưa được lưu lại</h1>
      <p className="mt-3 text-ink-soft">Trang bạn tìm không tồn tại, hoặc đã được chuyển đi nơi khác.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-orange hover:text-white">
        Về trang chủ
      </Link>
    </Container>
  );
}
