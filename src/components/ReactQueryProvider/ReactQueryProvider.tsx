"use client"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import Wrapper from "@/components/Wrapper/Wrapper";

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
    return (
        <QueryClientProvider client={queryClient}>
            <Wrapper>
              {children}
            </Wrapper>
        </QueryClientProvider>
    )
}

export default ReactQueryProvider