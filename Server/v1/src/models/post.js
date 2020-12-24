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
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      UserId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    },
  );
  return Post;
};
