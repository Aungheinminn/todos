'use client'
import { useState } from "react";
import { MobileNavbar, WebNavbar } from "../Navbar/Navbar";
import TopicsCommand from "../TopicsCommand/TopicCommand";
import Bottombar from "../Bottombar/Bottombar";
import { redirect } from "next/navigation";

type WrapperProps = {
    children: React.ReactNode;
}
const Wrapper:React.FC<WrapperProps> = ({ children }) => { 
    const [show, setShow] = useState<boolean>(false);
    const handleToggle = () => {
        setShow(!show);
        redirect('/topics')
    }
    return (
        <div className="relative w-full min-h-screen">
            <div className="z-10 fixed w-full top-0 ">
                <MobileNavbar onToggle={handleToggle} />
                <WebNavbar />
            </div>
            <TopicsCommand toggle={show} onToggle={handleToggle} />
            {children}
            <div className="z-10 fixed w-full bottom-[-1px]">
                <Bottombar />
            </div>
        </div>
    );
}
export default Wrapper