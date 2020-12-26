"use strict";

const bcrypt = require("bcrypt");

const encryptPassword = (plainPassword) => {
  const saltRound = 10;
  const salt = bcrypt.genSaltSync(saltRound);
  return bcrypt.hashSync(plainPassword, salt);
};

const comparePassword = (plainPassword, hashPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};

module.exports = {
  encryptPassword,
  comparePassword,
};
