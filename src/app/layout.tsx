import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DetailPopup from "@/components/DetailPopup/DetailPopup";
import CreatePopupComponent from "@/components/CreatePopup/CreatePopup";
import DeletePopup from "@/components/DeletePopup/DeletePopup";
import EditPopupComponent from "@/components/EditPopup/EditPopup";
import ReactQueryProvider from "@/components/ReactQueryProvider/ReactQueryProvider";
import ItemDetailsPopup from "@/components/ItemDetailsPopup/ItemDetailsPopup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	console.log("bruh");
  return (
    <html lang="en">
      <body
        className="w-full text-white min-h-screen"
        suppressHydrationWarning={false}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <DetailPopup />
        <CreatePopupComponent />
        <DeletePopup />
        <EditPopupComponent />
        <ItemDetailsPopup />
      </body>
    </html>
  );
}
