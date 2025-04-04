import bcrypt from "bcrypt";
const saltRounds = 10;

export const encryptPassword = async (password: any) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const decryptPassword = async (textPassword: any, hash: any) => {
  const password = await bcrypt.compare(textPassword, hash);
  return password;
};

