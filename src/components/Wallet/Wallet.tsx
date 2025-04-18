import { WalletType } from "@/lib/types/wallet.type";

type WalletProps = {
  wallet: WalletType;
};

const createMonograms = (userIds: string[] = []) => {
  return userIds.slice(0, 3).map((userId) => {
    const initials = userId.split("").slice(0, 2).join("").toUpperCase();
    return (
      <div
        key={userId}
        className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm font-medium -ml-2 border border-white"
      >
        {initials}
      </div>
    );
  });
};

const Wallet: React.FC<WalletProps> = ({ wallet }) => {
  return (
    <div className="bg-gray-700 rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white line-clamp-2">
            {wallet.wallet_name}
            {wallet.current && (
              <span className="ml-2 text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">
                Current
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-500">
            Created: {wallet.created_at && new Date(wallet.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-gray-100 px-3 py-1 rounded-full">
          <span className="text-gray-600 font-medium">{wallet.currency}</span>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-3xl font-bold text-white">{wallet.balance}</p>
      </div>
    </div>
  );
};

export default Wallet;
