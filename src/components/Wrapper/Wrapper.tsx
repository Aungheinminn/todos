'use client'
import { useState } from "react";
import { MobileNavbar, WebNavbar } from "../Navbar/Navbar";
import Bottombar from "../Bottombar/Bottombar";
import { redirect, usePathname } from "next/navigation";
import { UserType } from "@/lib/types/user.type";
import { useQuery } from "react-query";
import { useCurrentUserStore } from "@/lib/userStore";
import { getCurrentUser } from "@/lib/users.service";

type WrapperProps = {
    children: React.ReactNode;
    router: string;
}
const Wrapper:React.FC<WrapperProps> = ({ children, router }) => { 
    const { currentUser, updateCurrentUser } = useCurrentUserStore(state => state)

    console.log('cur', currentUser, typeof router)
    const noWrapperRoutes = ["/login", "/signUp", "/unauthorized"];
    const isWrapperRequired = !noWrapperRoutes.includes(router);
    const [show, setShow] = useState<boolean>(false);
    const noNavbarPages = ["/settings"]
    
    const handleToggle = () => {
        setShow(!show);
        redirect('/topics')
    }
    if (!isWrapperRequired) {
        return <>{children}</>;
    }
    return (
        <div className="relative w-full min-h-screen">
            
            <div className={`z-10 fixed w-full top-0 ${noNavbarPages.includes(router) ? 'hidden' : 'block'}`}>
                <MobileNavbar onToggle={handleToggle} currentUser={currentUser} />
                <WebNavbar />
            </div>
            {children}
            <div className="z-10 fixed w-full bottom-[-1px]">
                <Bottombar />
            </div>
        </div>
    );
}
export default Wrapper