import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mirror – Reflective journaling with AI",
  description:
    "Mirror is a calm, AI-assisted reflective journaling space for emotional clarity and self-understanding."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="mirror-shell">{children}</body>
    </html>
  );
}

