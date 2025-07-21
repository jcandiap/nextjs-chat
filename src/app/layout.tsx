"use client";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { useStoreTheme } from "@/store/useStoreTheme";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { theme } = useStoreTheme();
  return (
    <html lang="en" data-theme={ theme }>
      <body>
        <Navbar />
          {children}
        <Toaster />
      </body>
    </html>
  );
}
