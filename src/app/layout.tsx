import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DMCE PageX | Precision PDF Watermark Tool",
  description:
    "Instantly append official Datta Meghe header logos and centralized watermarks with precision and zero cloud storage.",
  authors: [{ name: "DMCE Developer Engineering" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased bg-[#050506] text-[#EDEDEF] selection:bg-[#5E6AD2]/30 selection:text-white min-h-screen relative overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
