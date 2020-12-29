"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        targetKey: "id",
        foreignKey: "UserId",
      });
      Post.hasMany(models.Comment, {
        sourceKey: "id",
        foreignKey: "PostId",
      });
      Post.hasMany(models.Like, {
        sourceKey: "id",
        foreignKey: "PostId",
      });
    }
  }
  Post.init(
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Post Title is Required" },
          notNull: { msg: "Post Title is Required" },
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Post Content is Required" },
          notNull: { msg: "Post COntent is Required" },
        },
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Post User ID is Required" },
          notNull: { msg: "Post User ID is Required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
    },
  );
  return Post;
};
