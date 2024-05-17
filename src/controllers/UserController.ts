"use strict";

import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.loginService(req);
      res.status(201).send({
        message: "Login Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.registerService(req);
      res.status(201).send({
        message: "Register Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
