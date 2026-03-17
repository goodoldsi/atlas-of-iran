import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Atlas of Iran",
  description:
    "A memorial archive documenting individuals killed during protests in Iran.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-white antialiased">

        <header className="relative w-full h-20 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 flex flex-col">
            <div className="flex-1 bg-[#239f40]" />
            <div className="flex-1 bg-[#f5f5f5]" />
            <div className="flex-1 bg-[#da0000]" />
          </div>

          <img
            src="/flag1.png"
            alt="Lion and Sun emblem"
            className="absolute left-1/2 top-1/2 h-18 -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </header>
        <main>{children}</main>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-black">
          <div className="bg-white/90 px-6 py-10">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 text-center text-sm text-black md:flex-row md:flex-wrap md:gap-8">
              <Link href="/privacy-policy" className="transition hover:opacity-70">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="transition hover:opacity-70">
                Terms of Service
              </Link>
              <Link href="/data-rights" className="transition hover:opacity-70">
                Your Data Rights
              </Link>
              <Link href="/donate" className="transition hover:opacity-70">
                Donate
              </Link>
              <Link href="/contact" className="transition hover:opacity-70">
                Contact
              </Link>
            </div>

            <p className="mt-6 text-center text-sm text-black/70">
              © 2026 Atlas of Iran. All rights reserved.
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}