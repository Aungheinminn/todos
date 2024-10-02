"use client"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { MobileNavbar, WebNavbar } from "@/components/Navbar/Navbar";
import Bottombar from "@/components/Bottombar/Bottombar";
import TopicsCommand from "@/components/TopicsCommand/TopicCommand";
import Wrapper from "@/components/Wrapper/Wrapper";
import { redirect, usePathname } from "next/navigation";

import DetailPopup from "@/components/DetailPopup/DetailPopup";
import PopupComponent from "@/components/CreatePopup/CreatePopup";
import DeletePopup from "@/components/DeletePopup/DeletePopup";
import EditPopupComponent from "@/components/EditPopup/EditPopup";
import CreatePopupComponent from "@/components/CreatePopup/CreatePopup";
import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';

type AuthProviderProps = {
    token: string;
    children: React.ReactNode;
}    
const queryClient = new QueryClient()

const AuthProvider:React.FC<AuthProviderProps> = ({ token, children }) => {
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const nonAuthorizedRoutes = ["/login", "/signUp", "/unauthorized"];
    const isNonAuthorizedRoute = !nonAuthorizedRoutes.includes(pathname);
    console.log('isauth', isAuthorized, token)

    useEffect(() => {
        setIsAuthorized(!!token);
        setIsLoading(false);
    }, [token, pathname]);

    if (pathname !== '/unauthorized' && isLoading) {
        return <Loading />;
    }

    if (!isAuthorized && isNonAuthorizedRoute) {
        redirect('/unauthorized');
    }
    console.log('token', token, pathname)

    return (
        <QueryClientProvider client={queryClient}>
            <Wrapper>
              {children}
            </Wrapper>
            <DetailPopup />
            <CreatePopupComponent />
            <DeletePopup />
            <EditPopupComponent />     
        </QueryClientProvider>

    )
}

export default AuthProvider