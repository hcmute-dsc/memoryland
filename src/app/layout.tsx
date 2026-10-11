import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Serif } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/content";
import "./globals.css";

const body = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const quote = Noto_Serif({
  variable: "--font-quote",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://memoryland.hcmute-dsc.io.vn"),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: `${site.tagline} Hành trình 5 năm của CLB Sinh viên Lập trình HCMUTE (HCMUTE DSC), 2021 – 2026.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${body.variable} ${quote.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
