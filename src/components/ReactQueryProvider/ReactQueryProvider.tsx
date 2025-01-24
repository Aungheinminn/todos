"use client";
import { QueryClient, QueryClientProvider } from "react-query";

import Wrapper from "@/components/Wrapper/Wrapper";
import { usePathname } from "next/navigation";
import ConfirmTransactionPopup from "../ConfirmTransactionPopup/ConfirmTransactionPopup";
import DeleteTransactionPopup from "../DeleteTransactionPopup/DeleteTransactionPopup";

type ReactQueryProviderProps = {
  children: React.ReactNode;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({
  children,
}) => {
  const router = usePathname();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmTransactionPopup />
      <DeleteTransactionPopup />
      <Wrapper router={router}>{children}</Wrapper>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
