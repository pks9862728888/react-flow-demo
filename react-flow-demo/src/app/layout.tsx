import "./globals.css";
import React from "react";
import NavBar from "@/app/components/NavBar/NavBar";

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    <NavBar/>
    {children}
    </body>
    </html>
  );
}
