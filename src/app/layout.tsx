import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karson Mellott | Portfolio",
  description: "Welcome to my portfolio",
  appleWebApp: {
    capable: true,
    title: "Karson Mellott - Portfolio",
    statusBarStyle: "default",
  },
  icons: {
    apple: "/apple-icon-180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}