import { decryptPassword, encryptPassword } from "./hash.service";
import { CredentialModel, UserModel } from "./models/user.model";

export const createUser = async (datas: UserModel) => {
    try{
        const res = await fetch('http://localhost:3000/api/users/signUp', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datas)
        })
        return res
    } catch (e) {
        console.log(e)
    }
}

export const loginUser = async (datas: CredentialModel) => {
    const { email, password } = datas;
    try {
        const res = await fetch(`http://localhost:3000/api/users/signIn?email=${email}&password=${password}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        return res.json();
    } catch (e) {
        console.log(e);
    }
};


export const getUsers = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/users', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res
    } catch (e) {
        console.log(e)
    }
}