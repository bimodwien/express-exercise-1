"use strict";

import { hash, genSalt, compare } from "bcrypt";

const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

const comparePassword = async (hashPassword: string, password: string) => {
  return await compare(password, hashPassword);
};

export { hashPassword, comparePassword };
