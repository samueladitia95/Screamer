"use strict";
const { Model } = require("sequelize");
const { encryptPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        sourceKey: "id",
        foreignKey: "UserId",
      });
      User.hasMany(models.Comment, {
        sourceKey: "id",
        foreignKey: "UserId",
      });
      User.hasMany(models.Like, {
        sourceKey: "id",
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate: {
          notEmpty: { msg: "id is Required" },
          notNull: { msg: "id is Required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Email is Required" },
          notNull: { msg: "Email is Required" },
          isEmail: { msg: "Email is Invalid" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is Required" },
          notNull: { msg: "Password is Required" },
        },
      },
      full_name: DataTypes.STRING,
      bio: DataTypes.STRING,
      location: DataTypes.STRING,
      profile_pic: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Profile Picture is Required" },
          notNull: { msg: "Profile Picture is Required" },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.password = encryptPassword(user.password);
        },
      },
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
