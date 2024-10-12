"use client"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import Wrapper from "@/components/Wrapper/Wrapper";
import { usePathname } from 'next/navigation';

type ReactQueryProviderProps = {
    children: React.ReactNode;
}    
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

const ReactQueryProvider:React.FC<ReactQueryProviderProps> = ({ children }) => {
        const router = usePathname();

    return (
        <QueryClientProvider client={queryClient}>
            <Wrapper router={router}>
              {children}
            </Wrapper>
        </QueryClientProvider>
    )
}

export default ReactQueryProvider