"use strict";

const { Comment } = require("../models");

class CommentController {
  static async getAll(req, res, next) {
    try {
      const { PostId } = req.params;
      const comments = await Comment.findAll({ where: { PostId }, order: [["createdAt", "DESC"]] });
      return res.status(200).json(comments);
    } catch (err) {
      return next(err);
    }
  }

  static async createOne(req, res, next) {
    try {
      const { PostId } = req.params;
      const { id: UserId } = req.userData;
      const { content } = req.body;
      const commentData = {
        content,
        PostId,
        UserId,
      };
      const newComment = await Comment.create(commentData, { returning: false });
      return res.status(201).json(newComment);
    } catch (err) {
      return next(err);
    }
  }

  static async updateOne(req, res, next) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const commentData = {
        content,
      };
      const isUpdated = await Comment.update(commentData, { where: { id } });
      if (!isUpdated[0]) {
        return next({ name: "BadRequest", message: "Update Comment Failed" });
      } else {
        const updatedComment = await Comment.findByPk(id);
        return res
          .status(200)
          .json({ message: "Update Comment successful", comment: updatedComment });
      }
    } catch (err) {
      return next(err);
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const deletedComment = await Comment.findByPk(id);
      if (!deletedComment) {
        return next({ name: "NotFound", message: "Comment does not exist" });
      }

      const isDeleted = await Comment.destroy({ where: { id } });
      if (isDeleted) {
        return res.status(200).json({ message: "Delete Successful", data: deletedComment });
      } else {
        return next({ name: "BadRequest", message: "Delete Comment Failed" });
      }
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = CommentController;
