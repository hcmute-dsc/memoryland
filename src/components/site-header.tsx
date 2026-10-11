import Image from 'next/image';
import Link from 'next/link';

export const NAV = [
  { href: '/hanh-trinh', label: 'Hành trình' },
  { href: '/the-he', label: 'Các thế hệ' },
  { href: '/cau-chuyen', label: 'Câu chuyện' },
  { href: '/loi-nhan', label: 'Lời nhắn' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Trang chủ 5 năm HCMUTE DSC">
          <Image src="/brand/hcmute-dsc-mark.png" alt="" width={84} height={32} className="h-7 w-auto dark:hidden" priority />
          <Image src="/brand/hcmute-dsc-mark-dark.png" alt="" width={84} height={32} className="hidden h-7 w-auto dark:block" priority />
          <span className="rounded-full bg-orange px-2 py-0.5 text-xs font-bold tracking-wide text-white">5 NĂM</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Điều hướng chính">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-full px-3 py-1.5 text-sm font-medium text-ink-soft transition hover:bg-paper-2 hover:text-ink">
              {n.label}
            </Link>
          ))}
          <Link href="/dong-gop" className="ml-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:bg-orange hover:text-white">
            Góp ký ức
          </Link>
        </nav>

        <details className="group relative md:hidden">
          <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full hover:bg-paper-2" aria-label="Mở menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="group-open:hidden">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="hidden group-open:block">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </summary>
          <nav className="absolute right-0 mt-2 flex w-56 flex-col rounded-2xl border border-line bg-card p-2 shadow-xl" aria-label="Điều hướng chính">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-paper-2">
                {n.label}
              </Link>
            ))}
            <Link href="/dong-gop" className="mt-1 rounded-xl bg-ink px-3 py-2.5 text-sm font-semibold text-paper">
              Góp ký ức
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
