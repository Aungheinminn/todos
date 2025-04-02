import { SharedWalletRequestType } from "@/lib/types/sharedWalletRequest.type";

export const createSharedWalletRequest = async (
  data: SharedWalletRequestType,
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/shared-wallet-requests`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const declineSharedWalletRequest = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/shared-wallet-requests/request/${id}/decline`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
      },
    );

    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const deleteSharedWalletRequest = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/shared-wallet-requests/request/${id}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      },
    );

    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};


export const getSharedWalletRequestsByUserId = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/shared-wallet-requests/request/${id}/delete`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        }
      })

    const res = await response.json();
    return res.data;
  } catch (e) {
    console.error(e)
  }
}
