import "./globals.css";

export const metadata = {
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
      <body className="bg-neutral-950 text-white">
        <header className="border-b border-zinc-800">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="/" className="text-lg font-semibold tracking-wide">
              Atlas of Iran
            </a>

            <nav className="flex items-center gap-6 text-sm text-zinc-300">
              <a href="/" className="transition hover:text-white">
                Home
              </a>
              <a href="/memorial" className="transition hover:text-white">
                Memorial
              </a>
              <a href="/#about" className="transition hover:text-white">
                About
              </a>
            </nav>
          </div>
        </header>

        <main className="pt-8">{children}</main>
      </body>
    </html>
  );
}