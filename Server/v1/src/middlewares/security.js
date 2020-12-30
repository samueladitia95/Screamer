"use strict";

const { User, Post, Comment, Like } = require("../models");
const { decodeToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (access_token) {
      req.userData = decodeToken(access_token);
      const user = await User.findByPk(req.userData.id);
      if (!user) {
        return res.status(401).json({ message: "Failed to Authenticate" });
      } else {
        next();
      }
    } else {
      return res.status(401).json({ message: "Failed to Authenticate" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const authorizationPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: UserId } = req.userData;
    const post = await Post.findByPk(id);
    console.log(post.UserId === UserId);
    if (!post) {
      return res.status(404).json({ message: "Invalid Post Id" });
    } else {
      if (UserId === post.UserId) {
        next();
      } else {
        return res.status(403).json({ message: "Not Post owner" });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const authorizationComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: UserId } = req.userData;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: "Invalid Comment Id" });
    } else {
      if (UserId !== comment.UserId) {
        return res.status(403).json({ message: "Not Comment owner" });
      } else {
        next();
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const authorizationLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: UserId } = req.userData;
    const like = await Like.findByPk(id);
    if (!like) {
      return res.status(404).json({ message: "Invalid Like Id" });
    } else {
      if (UserId !== like.UserId) {
        return res.status(403).json({ message: "Forbidden" });
      } else {
        next();
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  authentication,
  authorizationPost,
  authorizationComment,
  authorizationLike,
};
