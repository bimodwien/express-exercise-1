"use strict";

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { user } from "../models/user";

export function verifyUser(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "") || "";
    req.user = verify(token, SECRET_KEY) as user;
    // console.log(req.user);

    next();
  } catch (error) {
    next(error);
  }
}
