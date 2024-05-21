"use strict";

import { Request } from "express";
import prisma from "../lib/prisma";
import { user } from "../models/user";
import { comparePassword, hashPassword } from "../lib/bcrypt";
import { Prisma } from "@prisma/client";
import { createToken } from "../lib/jwt";

class UserService {
  static async loginService(req: Request) {
    const { username, password } = req.body;
    const user = (await prisma.user.findFirst({
      where: {
        username: String(username),
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    })) as user;
    if (!user?.password) {
      throw new Error("Wrong Email of Username");
    }
    const checkUser = await comparePassword(user.password, String(password));
    if (!checkUser) {
      throw new Error("Wrong Password");
    }
    delete user.password;
    // console.log(user);

    return createToken(user, "1h");
  }

  static async registerService(req: Request) {
    const { username, password, email, full_name } = req.body;

    const existingUser = await prisma.user.findMany({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser.length) {
      throw new Error("username / email already used");
    }

    const hashPass = await hashPassword(String(password));
    const data: Prisma.UserCreateInput = {
      email,
      password: hashPass,
      username,
      full_name,
    };
    const registry = await prisma.user.create({
      data,
      select: {
        username: true,
        email: true,
      },
    });
    return registry;
  }
}

export default UserService;
