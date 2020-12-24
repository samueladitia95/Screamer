"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        targetKey: "id",
        foreignKey: "UserId",
      });
      Comment.belongsTo(models.Post, {
        targetKey: "id",
        foreignKey: "PostId",
      });
    }
  }
  Comment.init(
    {
      content: DataTypes.STRING,
      UserId: DataTypes.STRING,
      PostId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    },
  );
  return Comment;
};
