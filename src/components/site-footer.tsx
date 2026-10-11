import Link from 'next/link';
import { site } from '@/lib/content';
import { NAV } from './site-header';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-2/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold">Memoryland <span className="font-normal text-muted">· HCMUTE DSC 5 năm</span></p>
          <p className="mt-2 max-w-sm font-serif text-ink-soft italic">“{site.motto}”</p>
          <p className="mt-4 text-sm text-muted">{site.hashtags.join(' ')}</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest text-muted uppercase">Khám phá</p>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-orange">{n.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/dong-gop" className="hover:text-orange">Góp ký ức</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest text-muted uppercase">HCMUTE DSC</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href={site.links.website} className="hover:text-orange">Website CLB</a></li>
            <li><a href={site.links.archive} className="hover:text-orange">Kho lưu trữ hoạt động</a></li>
            <li><a href={site.links.facebook} className="hover:text-orange">Facebook</a></li>
            <li><a href={site.links.github} className="hover:text-orange">GitHub</a></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-line py-5 text-center text-xs text-muted">
        CLB Sinh viên Lập trình HCMUTE · Thành lập 20/07/2021 · Ảnh và tư liệu từ fanpage và thành viên CLB
      </p>
    </footer>
  );
}
