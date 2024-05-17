"use strict";

import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

//user
router.post("/login", UserController.login);
router.post("/register", UserController.register);

export default router;
