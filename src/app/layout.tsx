import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Birthday Priyadharshika ❤️",
  description: "A premium, handcrafted interactive birthday experience made especially for Priyadharshika. A journey of childhood memories, reconnection, and Biotech aspirations.",
  authors: [{ name: "Your Friend" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#05020a] text-slate-100 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
