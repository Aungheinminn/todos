import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { cookies } from 'next/headers'



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const token = cookies().get('token')
  console.log('token', token)
  return (
    <html lang="en">
      <body className="w-full text-white min-h-screen" suppressHydrationWarning={false}>
          <AuthProvider token={token ? token.value : ''}>
            {children}       
          </AuthProvider>
      </body>
    </html>
  );
}
