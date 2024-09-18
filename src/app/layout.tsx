'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MobileNavbar, WebNavbar } from "@/components/Navbar/Navbar";
import Bottombar from "@/components/Bottombar/Bottombar";
import TopicsCommand from "@/components/TopicsCommand/TopicCommand";
import Wrapper from "@/components/Wrapper/Wrapper";


import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import DetailPopup from "@/components/DetailPopup/DetailPopup";
import PopupComponent from "@/components/CreatePopup/CreatePopup";
import DeletePopup from "@/components/DeletePopup/DeletePopup";
import EditPopupComponent from "@/components/EditPopup/EditPopup";
import CreatePopupComponent from "@/components/CreatePopup/CreatePopup";

const queryClient = new QueryClient()


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <body className="w-full text-white min-h-screen" suppressHydrationWarning={false}>
        <QueryClientProvider client={queryClient}>
          <Wrapper>
            {children}
          </Wrapper>
          <DetailPopup />
          <CreatePopupComponent />
          <DeletePopup />
          <EditPopupComponent />
        </QueryClientProvider>
      </body>
    </html>
  );
}
