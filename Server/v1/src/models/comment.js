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
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Comment Content is Required" },
          notNull: { msg: "Comment Content is Required" },
        },
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Comment User ID is Required" },
          notNull: { msg: "Comment User ID is Required" },
        },
      },
      PostId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Comment Post ID is Required" },
          notNull: { msg: "Comment Post ID is Required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
    },
  );
  return Comment;
};
