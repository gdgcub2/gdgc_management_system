import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GDGC Management",
  description: "GDGC Smart Event Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

