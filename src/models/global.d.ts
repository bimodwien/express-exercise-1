import { user } from "./user";

declare global {
  namespace Express {
    interface Request {
      user: user;
      token: string;
    }
  }
}
