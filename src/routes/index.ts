"use strict";

import { Router } from "express";
import UserController from "../controllers/UserController";
import PostControllers from "../controllers/PostControllers";
import { verifyUser } from "../middlewares/auth";

const router = Router();

//user
router.post("/login", UserController.login);
router.post("/register", UserController.register);

//post
router.get("/posts", PostControllers.getAll);
router.get("/posts/:id", PostControllers.getById);
router.post("/posts", verifyUser, PostControllers.create);
router.put("/posts/:id", verifyUser, PostControllers.update);
router.delete("/posts/:id", verifyUser, PostControllers.deletePost);

export default router;
