"use strict";

import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../config";

const createToken = (payload: any, expiresIn: string) => {
  return sign(payload, SECRET_KEY, { expiresIn });
};

export { createToken };
