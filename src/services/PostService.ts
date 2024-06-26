"use strict";

import { Request } from "express";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

class PostService {
  static async getPosts() {
    const data = await prisma.post.findMany({
      include: {
        Comment: true,
        Like: true,
      },
      orderBy: {
        createAt: "asc",
      },
    });
    return data;
  }

  static async getPostsById(req: Request) {
    const id = req.params.id;
    const data = await prisma.post.findUnique({
      include: {
        Comment: true,
        Like: true,
      },
      where: {
        id: Number(id),
      },
    });
    return data;
  }

  static async createPost(req: Request) {
    const { image_url, caption, location } = req.body;
    const data: Prisma.PostCreateInput = {
      image_url,
      caption,
      location,
      user: {
        connect: {
          id: req.user?.id,
        },
      },
    };

    return await prisma.post.create({
      data,
    });
  }

  static async updatePost(req: Request) {
    const id = req.params.id;
    const user_id = req.user.id;
    const data: Prisma.PostCreateInput = { ...req.body };

    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!post) throw new Error("Post Not Found");
    if (post.userId != user_id)
      throw new Error("This User Cannot Edit This Post");

    return await prisma.post.update({
      data,
      where: {
        id: Number(id),
      },
    });
  }

  static async deletePost(req: Request) {
    const user_id = req.user.id;
    const id = req.params.id;

    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!post) throw new Error("Post Not Found");
    if (post.userId != user_id)
      throw new Error("This User Cannot Delete This Post");

    return await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
  }
}

export default PostService;
