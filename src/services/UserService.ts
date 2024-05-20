"use strict";

import { Request } from "express";
import prisma from "../lib/prisma";
import { user } from "../models/user";

class UserService {
  static async loginService(req: Request) {
    const { username, password }: user = req.body;
    const user = await prisma.user.findFirst({
      where: {
        username: username,
        password: password,
      },
      select: {
        username: true,
        email: true,
      },
    });
    return user;
  }

  static async registerService(req: Request) {
    const { username, password, email, full_name }: user = req.body;
    if (!username || !password || !email || !full_name) {
      throw new Error("Data cannot be blank");
    }
    const registry = await prisma.user.create({
      data: req.body,
      select: {
        username: true,
        email: true,
      },
    });
    return registry;
  }
}

export default UserService;
