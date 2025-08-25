import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Main from "@/components/theme/Main";

import { Analytics } from "@vercel/analytics/next"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JIST Coding Club | AI, ML, Web & App Development | Hackathons & Workshops",
  description:
    "Welcome to the Official Coding Club of Jorhat Institute of Science & Technology (JIST). A hub for AI, Machine Learning, Web Development, App Development, Hackathons, Workshops, and Industry Collaboration. Join the best tech community in Assam to learn, build, and innovate with peers and mentors.",
  keywords: [
    "JIST",
    "JIST Coding Club",
    "Jorhat Institute of Science and Technology",
    "Coding Club JIST",
    "AI ML JIST",
    "Web Development JIST",
    "App Development JIST",
    "Hackathon JIST",
    "Workshops JIST",
    "Tech Club Assam",
    "Coding Community JIST",
    "Best Coding Club JIST",
    "Sponsors JIST Coding Club",
  ],
  authors: [{ name: "JIST Coding Club" }],
  icons: {
    icon: [
      { url: "/logo/club-logo.svg", type: "image/svg+xml" }, 
      { url: "/logo/club-logo.png", type: "image/png", sizes: "32x32" }, 
    ],
    shortcut: { url: "/logo/club-logo.png" },
    apple: { url: "/logo/club-logo.png" },
  },
  openGraph: {
    title:
      "JIST Coding Club | AI, ML, Web & App Development | Hackathons & Workshops",
    description:
      "Explore AI, ML, Web & App Development at JIST Coding Club. Participate in hackathons, workshops, and tech events hosted with industry sponsors.",
    url: "https://jist-codingclub.vercel.app/",
    siteName: "JIST Coding Club",
    images: [
      {
        url: "/logo/club-logo.png",
        width: 1200,
        height: 630,
        alt: "JIST Coding Club",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "JIST Coding Club | AI, ML, Web & App Development | Hackathons & Workshops",
    description:
      "The official Coding Club of JIST. A hub for AI, ML, Web & App Development, Hackathons, Workshops, and Sponsors-backed tech events.",
    images: ["/logo/club-logo.png"],
  },
  metadataBase: new URL("https://jist-codingclub.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Main>
         
{children}
  <Analytics/>
        </Main>
        
      </body>
    </html>
  );
}
