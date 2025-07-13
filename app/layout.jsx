import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider ,SignedIn,SignedOut} from "@clerk/nextjs";
import styles from "@/app/scrollbar.css"
import { icons } from "lucide-react";






const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Filo – Instant File & Text Sharing",
  description:
    "Filo is a modern file sharing and text/code pasting app built with Next.js. Use FiloDrop to securely share files with authentication and short links, or FiloPad to quickly paste and share text or code without signing in.",
  icons:{
     icon:"/rabbitf.ico",
     shortcut: '/rabbitf.ico',
     apple: '/rabbitf.png',
  }

  };



export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" className={`dark bg-neutral-900 ${styles.container}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-900`}>
        {children}
      </body>
    </html>
    </ClerkProvider>
    
  );
}
