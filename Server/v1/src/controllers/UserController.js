"use strict";

const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const randomNumber = Math.floor(Math.random() * 1000000) + 50000;

      const userData = {
        email,
        password,
        profile_pic: `https://avatars.dicebear.com/4.5/api/bottts/${randomNumber}.svg`,
      };

      const newUser = await User.create(userData, {
        returning: false,
      });

      const sentUserData = {
        status: 201,
        data: {
          email: newUser.email,
          profile_pic: newUser.profile_pic,
        },
      };
      return res.status(201).json(sentUserData);
    } catch (err) {
      return next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });
      if (!user || !comparePassword(password, user.password || "")) {
        return next({
          statusCode: 401,
          name: "UnauthorizedError",
          message: "Wrong Email/Password",
        });
      }

      const foundUser = {
        email: user.email,
        full_name: user.full_name,
        bio: user.bio,
        location: user.location,
        profile_pic: user.profile_pic,
      };
      const access_token = createToken({ ...foundUser, id: user.id });

      const sentUserData = {
        status: 201,
        access_token,
        data: { ...foundUser },
      };
      return res.status(201).json(sentUserData);
    } catch (err) {
      return next(err);
    }
  }

  static async updateInformation(req, res, next) {
    try {
      const { full_name, bio, location } = req.body;
      const { id } = req.params;
      const updatedUserDetail = {
        full_name,
        bio,
        location,
      };
      const updatedUser = await User.update(updatedUserDetail, { where: { id } });
      return updatedUser[0]
        ? res.status(200).json({ status: 200, message: "Update Detail Successful" })
        : next({
            statusCode: 400,
            name: "NotFoundError",
            message: "User not Found",
          });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
