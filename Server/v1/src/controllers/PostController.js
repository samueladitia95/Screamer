"use strict";
const { Post, User, Comment, sequelize, Like } = require("../models");

class PostController {
  static async getAll(req, res, next) {
    try {
      const posts = await Post.findAll({
        // limit: 20,
        order: [["updatedAt", "DESC"]],
        include: [
          { model: User, attributes: { exclude: ["password", "createdAt", "updatedAt", "bio", "location"] } },
          { model: Comment, attributes: [] },
          { model: Like, attributes: { exclude: ["createdAt", "updatedAt"] } },
        ],
        attributes: {
          exclude: ["createdAt", "UserId"],
          include: [[sequelize.fn("COUNT", sequelize.col("Comments.id")), "commentCount"]],
        },
        group: ["Post.id", "User.id", "Likes.id"],
      });
      return res.status(200).json(posts);
    } catch (err) {
      return next(err);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id, {
        attributes: { exclude: ["createdAt", "UserId"] },
        include: { model: User, attributes: { exclude: ["password", "createdAt", "updatedAt"] } },
      });
      if (!post) {
        return next({ name: "NotFound", message: "Post does not exist" });
      } else {
        return res.status(200).json(post);
      }
    } catch (err) {
      return next(err);
    }
  }

  static async createOne(req, res, next) {
    try {
      const { title, content } = req.body;
      const { id: UserId } = req.userData;
      const postData = {
        title,
        content,
        UserId,
      };
      const newPost = await Post.create(postData, { returning: false });
      return res.status(201).json(newPost);
    } catch (err) {
      return next(err);
    }
  }

  static async updateOne(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const postData = {
        title,
        content,
      };

      const isUpdated = await Post.update(postData, { where: { id } });
      if (!isUpdated[0]) {
        return next({ name: "BadRequest", message: "Update Post Failed" });
      } else {
        const updatedPost = await Post.findByPk(id, {
          attributes: { exclude: ["createdAt", "UserId"] },
          include: { model: User, attributes: { exclude: ["password", "createdAt", "updatedAt"] } },
        });
        return res.status(200).json({ message: "Update Post successful", post: updatedPost });
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const deletedPost = await Post.findByPk(id);
      if (!deletedPost) {
        return next({ name: "NotFound", message: "Post does not exist" });
      }

      const isDeleted = await Post.destroy({ where: { id } });
      if (isDeleted) {
        return res.status(200).json({ message: "Delete Successful", data: deletedPost });
      } else {
        return next({ name: "BadRequest", message: "Delete Post Failed" });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PostController;
