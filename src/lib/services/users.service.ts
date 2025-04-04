import { decryptPassword, encryptPassword } from "@/lib/services/hash.service";
import { CredentialModel, UserModel } from "@/lib/models/user.model";

export const createUser = async (datas: UserModel) => {
  try {
    const res = await fetch("http://localhost:3000/api/users/signUp", {
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
  const { email, password } = datas;
  try {
    const res = await fetch(
      `http://localhost:3000/api/users/signIn?email=${email}&password=${password}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export const logoutUser = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/users/signOut", {
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
    const res = await fetch("http://localhost:3000/api/protected/currentUser", {
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
