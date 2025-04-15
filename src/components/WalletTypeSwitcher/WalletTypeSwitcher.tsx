type WalletTypeSwitcherProps = {
  walletType: string;
  onToggle: (value: string) => void;
};

const WalletTypeSwitcher: React.FC<WalletTypeSwitcherProps> = ({
  walletType,
  onToggle,
}) => {
  return (
    <div className="flex bg-gray-900 rounded-md p-1.5">
      <button
        onClick={() => onToggle("normal")}
        className={`px-3 py-1 text-sm rounded-md transition-all ${
          walletType === "normal"
            ? "bg-gray-600 text-white"
            : "text-gray-400 hover:text-gray-200"
        }`}
      >
        Normal
      </button>
      <button
        onClick={() => onToggle("shared")}
        className={`px-3 py-1 text-sm rounded-md transition-all ${
          walletType === "shared"
            ? "bg-gray-600 text-white"
            : "text-gray-400 hover:text-gray-200"
        }`}
      >
        Shared
      </button>
    </div>
  );
};

export default WalletTypeSwitcher;
