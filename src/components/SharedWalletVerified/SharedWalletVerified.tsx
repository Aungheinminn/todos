import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import sharedWalletVerifiedIcon from "@/assets/shared-wallet-verified.svg";

const SharedWalletVerified = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="bg-green-500 p-[10px] rounded-md">
          <Image
            className="w-5 h-5"
            src={sharedWalletVerifiedIcon}
            alt="verified"
          />
        </TooltipTrigger>
        <TooltipContent>Shared Wallet</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SharedWalletVerified;
