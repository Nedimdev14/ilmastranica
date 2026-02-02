import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Da li Ilma smrdi?",
  description: "A fun question for Ilma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
