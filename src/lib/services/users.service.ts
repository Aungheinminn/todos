import { decryptPassword, encryptPassword } from "@/lib/services/hash.service";
import { CredentialModel, SignUpInput } from "@/lib/models/user.model";
import { getBaseUrl } from "@/lib/utils/baseUrl";

export const createUser = async (datas: SignUpInput) => {
  try {
    const res = await fetch(`${getBaseUrl()}/api/users/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datas),
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export const loginUser = async (datas: CredentialModel) => {
  try {
    const res = await fetch(`${getBaseUrl()}/api/users/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datas),
    });

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export const logoutUser = async () => {
  try {
    const res = await fetch(`${getBaseUrl()}/api/users/signOut`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.json();
  } catch (e) {
    console.error(e);
  }
};

// Apis Below this need to be authenticated

export const getCurrentUser = async () => {
  try {
    const res = await fetch(`${getBaseUrl()}/api/protected/currentUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export const getUserByRefId = async (id: string) => {
  try {
    const response = await fetch(
      `${getBaseUrl()}/api/protected/users/ref/${id}/getUserByRefId`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const createRefId = async (id: string) => {
  try {
    const response = await fetch(
      `${getBaseUrl()}/api/protected/users/user/${id}/createRefId`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};
