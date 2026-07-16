import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DMCE PageX | Precision PDF Watermark Tool",
  description:
    "Instantly append official Datta Meghe header logos and centralized watermarks with cinematic precision and zero cloud storage.",
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
        className={`${inter.variable} antialiased bg-[#050506] text-[#EDEDEF] selection:bg-[#5E6AD2]/30 selection:text-white min-h-screen relative overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
