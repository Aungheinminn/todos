"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Wrapper from "@/components/Wrapper/Wrapper";
import { usePathname } from "next/navigation";
import ConfirmTransactionPopup from "../ConfirmTransactionPopup/ConfirmTransactionPopup";
import DuplicateTransactionPopup from "../DuplicateTransactionPopup/DuplicateTransactionPopup";
import ConfirmWalletPopup from "../ConfirmWalletPopup/ConfirmWalletPopup";
import DeleteTransactionPopup from "../DeleteTransactionPopup/DeleteTransactionPopup";
import DeleteWalletPopup from "../DeleteWalletPopup/DeleteWalletPopup";
import ConfirmBudgetPopup from "../ConfirmBudgetPopup/ConfrimBudgetPopup";
import DeleteBudgetPopup from "../DeleteBudgetPopup/DeleteBudgetPopup";
import ConfirmSharedWalletPopup from "@/components/ConfirmSharedWalletPopup/ConfirmSharedWalletPopupu";

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
      <ConfirmSharedWalletPopup />
      <ConfirmTransactionPopup />
      <ConfirmWalletPopup />
      <ConfirmBudgetPopup />
      <DeleteTransactionPopup />
      <DeleteWalletPopup />
      <DeleteBudgetPopup />
      <DuplicateTransactionPopup />
      <Wrapper router={router}>{children}</Wrapper>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
