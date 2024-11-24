import { ItemType } from "./types/item.type";

export const createItems = async ({
  datas,
  user_id,
}: {
  datas: ItemType;
  user_id: string;
}) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/protected/items/user/${user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(datas),
      },
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const getItems = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/protected/items/user/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      },
    );
    const response = await res.json();
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteItems = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/protected/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const getItemDetails = async (user_id: string, currentDate: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/protected/items/user/${user_id}/getItemDetails?currentDate=${currentDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      },
    );
    const response = await res.json();
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
