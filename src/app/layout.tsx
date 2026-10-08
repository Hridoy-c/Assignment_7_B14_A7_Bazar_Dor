import Header from "../components/shared/Header";

import type { Metadata } from "next";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🌟 বাংলা ফন্টটি এখানে যুক্ত করা হয়েছে (ওয়েট এবং সাবসেট সহ)
const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর - অ্যাসাইনমেন্ট ৭",
  description: "Programming Hero Assignment 7 - Bazar Dor App",
};



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn" 
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.variable} h-full antialiased`}
    >
      <body className={`${hindSiliguri.className} min-h-full flex flex-col`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
