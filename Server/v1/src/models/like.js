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
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Like User ID is Required" },
          notNull: { msg: "Like User ID is Required" },
        },
      },
      PostId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Like User ID is Required" },
          notNull: { msg: "Like User ID is Required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Like",
    },
  );
  return Like;
};
