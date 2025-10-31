import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevWrite – Developers Write, Share & Grow",
    template: "%s | DevWrite",
  },
  description:
    "DevWrite is your hub for thoughtful writing on code, creativity, and technology — written by developers, for developers.",
  keywords: [
    "DevWrite",
    "developer blog",
    "coding tutorials",
    "web development",
    "frontend",
    "backend",
    "JavaScript",
    "React",
    "Next.js",
    "tech writing",
  ],

  openGraph: {
    title: "DevWrite – Developers Write, Share & Grow",
    description:
      "Discover thoughtful writing on code, creativity, and technology. Written by developers, for developers.",
    siteName: "DevWrite",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "DevWrite – Developers Write, Share & Grow",
    description:
      "A modern platform where developers share insights, tutorials, and ideas in web development, design, and technology.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" richColors/>
      </body>
    </html>
  );
}
