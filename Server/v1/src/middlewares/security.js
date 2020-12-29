"use strict";

const { User } = require("../models");
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  authentication,
  authorizationPost,
};
