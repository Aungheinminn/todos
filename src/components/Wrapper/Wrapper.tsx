"use client";
import { useMemo, useState } from "react";
import { MobileNavbar } from "../Navbar/Navbar";
import Bottombar from "../Bottombar/Bottombar";
import Sidebar from "../Sidebar/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { debounce } from "@/lib/utils/debounce";

const SIDEBAR_COLLAPSE_THRESHOLD = 24.7486694654;

type WrapperProps = {
  children: React.ReactNode;
  router: string;
};
const Wrapper: React.FC<WrapperProps> = ({ children, router }) => {
  const noWrapperRoutes = ["/login", "/signup", "/unauthorized", "/redirect"];
  const isWrapperRequired = !noWrapperRoutes.includes(router);
  const noNavbarPages = [
    "/notifications",
    "/settings",
    "/redirect",
    "/settings/account",
  ];

  const [isEnoughtSpace, setIsEnoughtSpace] = useState(true);

  const handleResize = useMemo(
    () =>
      debounce((size: number) => {
        setIsEnoughtSpace(size > SIDEBAR_COLLAPSE_THRESHOLD);
      }, 60),
    [],
  );

  if (!isWrapperRequired) {
    return <>{children}</>;
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="relative w-full min-h-screen flex"
    >
      <ResizablePanel
        defaultSize={30}
        maxSize={30}
        minSize={15}
        onResize={handleResize}
        className="hidden md:flex h-screen"
      >
        <Sidebar isEnoughtSpace={isEnoughtSpace} />
      </ResizablePanel>
      <ResizableHandle className="hidden md:flex" withHandle />
      <ResizablePanel defaultSize={70} className={`w-full`}>
        <div
          className={`z-10 fixed w-full top-0 ${noNavbarPages.includes(router) ? "hidden" : "md:hidden"}`}
        >
          <MobileNavbar />
        </div>

        <main className="pt-[55px] md:pt-0">{children}</main>

        <div className="z-10 fixed w-full bottom-[-1px] md:hidden">
          <Bottombar />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default Wrapper;
