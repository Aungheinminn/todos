'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MobileNavbar, WebNavbar } from "@/components/Navbar/Navbar";
import Bottombar from "@/components/Bottombar/Bottombar";
import TopicsCommand from "@/components/TopicsCommand/TopicCommand";
import Wrapper from "@/components/Wrapper/Wrapper";
import "react-day-picker/dist/style.css";

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className="w-full text-white min-h-screen" suppressHydrationWarning={false}>
          <Wrapper>
            {children}
          </Wrapper>
        </body>
      </QueryClientProvider>

    </html>
  );
}
