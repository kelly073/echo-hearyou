import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Echo – A digital reflection for your feelings",
  description:
    "Echo is a safe, anonymous space to write your raw feelings and receive gentle AI reflections. You are not alone."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className={`${inter.className} min-h-screen text-[#2C3E50] antialiased leading-relaxed`}>
        {children}
      </body>
    </html>
  );
}

