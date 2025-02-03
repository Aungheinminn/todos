import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type WalletSettingsProps = {
  children: React.ReactNode;
  isOpen: boolean;
  currentlyShown?: boolean;
  handleClick: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
  handleViewDetails: () => void;
  handleOpenChange: () => void;
};

const WalletSettings: React.FC<WalletSettingsProps> = ({
  children,
  isOpen,
  currentlyShown,
  handleClick,
  handleDelete,
  handleEdit,
  handleViewDetails,
  handleOpenChange,
}) => {
  return (
    <Popover modal={isOpen} open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        className="w-full"
        disabled={currentlyShown}
        onClick={handleClick}
      >
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
          onClick={handleEdit}
          className="bg-yellow-500 hover:bg-slate-600"
        >
          Edit
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
