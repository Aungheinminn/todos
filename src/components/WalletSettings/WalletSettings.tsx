import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type WalletSettingsProps = {
  children: React.ReactNode;
  isOpen: boolean;
  currentlyShown?: boolean;
  handleClick: () => void;
  handleDelete: () => void;
  handleSetDefault: () => void;
  handleViewDetails: () => void;
  handleOpenChange: () => void;
};

const WalletSettings: React.FC<WalletSettingsProps> = ({
  children,
  isOpen,
  currentlyShown,
  handleClick,
  handleDelete,
  handleSetDefault,
  handleViewDetails,
  handleOpenChange,
}) => {
  console.log("isOpen", isOpen);
  return (
    <Popover modal={true} open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger disabled={currentlyShown} onClick={handleClick}>
        {children}
      </PopoverTrigger>
      <PopoverContent className="z-50 w-fit bg-gray-700 flex flex-col gap-y-1 p-1">
        <Button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-slate-600"
        >
          Delete
        </Button>
        <Button
          onClick={handleSetDefault}
          className="bg-green-500 hover:bg-slate-600"
        >
          Set Default
        </Button>
        <Button
          onClick={handleViewDetails}
          className="bg-blue-500 hover:bg-slate-600"
        >
          Details
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default WalletSettings;
