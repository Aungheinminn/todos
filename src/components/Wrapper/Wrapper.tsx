"use client";
import { useState } from "react";
import { MobileNavbar, WebNavbar } from "../Navbar/Navbar";
import Bottombar from "../Bottombar/Bottombar";
import { redirect } from "next/navigation";
import { useCurrentUserStore } from "@/lib/userStore";

type WrapperProps = {
  children: React.ReactNode;
  router: string;
};
const Wrapper: React.FC<WrapperProps> = ({ children, router }) => {
  const { currentUser } = useCurrentUserStore((state) => state);

  console.log("cur", currentUser, typeof router);
  const noWrapperRoutes = ["/login", "/signup", "/unauthorized", "/redirect"];
  const isWrapperRequired = !noWrapperRoutes.includes(router);
  const [show, setShow] = useState<boolean>(false);
  const noNavbarPages = [
    "/notifications",
    "/settings",
    "/redirect",
    "/settings/account",
    "/settings/profile",
  ];

  const handleToggle = () => {
    setShow(!show);
    redirect("/topics");
  };
  if (!isWrapperRequired) {
    return <>{children}</>;
  }
  return (
    <div className="relative w-full min-h-screen">
      <div
        className={`z-10 fixed w-full top-0 ${noNavbarPages.includes(router) ? "hidden" : "block"}`}
      >
        <MobileNavbar onToggle={handleToggle} currentUser={currentUser} />
        <WebNavbar />
      </div>
      {children}
      <div className="z-10 fixed w-full bottom-[-1px]">
        <Bottombar />
      </div>
    </div>
  );
};
export default Wrapper;
