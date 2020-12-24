"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.User, {
        targetKey: "id",
        foreignKey: "UserId",
      });
      Like.belongsTo(models.Post, {
        targetKey: "id",
        foreignKey: "PostId",
      });
    }
  }
  Like.init(
    {
      UserId: DataTypes.STRING,
      PostId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Like",
    },
  );
  return Like;
};
