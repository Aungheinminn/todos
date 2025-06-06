import { WalletType } from "@/lib/types/wallet.type";

export const createSharedWallet = async (data: WalletType) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/shared-wallets/user/${data.user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    return response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getSharedWallets = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/shared-wallets/user/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const res = await response.json();
    console.log(res);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getSharedWalletUsers = async (wallet_id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/shared-wallets/shared-wallet/${wallet_id}/getUsers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const res = await response.json();
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const removeSharedWalletUser = async ({
  wallet_id,
  user_id,
}: {
  wallet_id: string;
  user_id: string;
}) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/shared-wallets/shared-wallet/${wallet_id}/remove-shared-wallet-user`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      },
    );
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const makeSharedWalletAdmin = async ({
  wallet_id,
  user_id,
}: {
  wallet_id: string;
  user_id: string;
}) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/shared-wallets/shared-wallet/${wallet_id}/make-admin`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      },
    );
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};
