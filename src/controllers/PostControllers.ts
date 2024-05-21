"use strict";

import { NextFunction, Request, Response } from "express";
import PostService from "../services/PostService";

class PostControllers {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PostService.getPosts();
      res.status(200).send({
        message: "Fetching Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PostService.getPostsById(req);
      res.status(200).send({
        message: "Fetching by ID",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      await PostService.createPost(req);
      res.status(201).send({
        message: "Create Post Success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      await PostService.updatePost(req);
      res.status(201).send({
        message: "Update Post Success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      await PostService.deletePost(req);
      res.status(201).send({
        message: "Delete Post Success",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default PostControllers;
