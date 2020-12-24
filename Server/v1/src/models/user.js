"use strict";
const { Model } = require("sequelize");

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
      id: DataTypes.UUIDV4,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      full_name: DataTypes.STRING,
      bio: DataTypes.STRING,
      location: DataTypes.STRING,
      profile_pic: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
