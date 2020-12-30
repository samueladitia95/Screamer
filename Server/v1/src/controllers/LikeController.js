"use strict";
const { Like } = require("../models");

class LikeController {
  static async createOne(req, res, next) {
    try {
      const { PostId } = req.params;
      const { id: UserId } = req.userData;
      const isExist = await Like.findOne({ where: { PostId, UserId } });
      if (isExist) {
        return next({ name: "BadRequest", message: "Like alredy added" });
      } else {
        const likeData = { PostId, UserId };
        const isAdded = await Like.create(likeData, { returning: false });
        if (!isAdded) {
          return next({ name: "BadRequest", message: "Like failed to add" });
        } else {
          return res.status(201).json({ message: "Like added to Post" });
        }
      }
    } catch (err) {
      return next(err);
    }
  }
  static async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const isDeleted = await Like.destroy({ where: { id } });
      if (isDeleted) {
        return res.status(200).json({ message: "Delete Successful" });
      } else {
        return next({ name: "BadRequest", message: "Delete Like Failed" });
      }
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = LikeController;
