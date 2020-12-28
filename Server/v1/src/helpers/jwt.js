"use strict";

const jwt = require("jsonwebtoken");
const secret = "My Secret";

const createToken = (obj) => {
  return jwt.sign(obj, secret);
};

const decodeToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = {
  createToken,
  decodeToken,
};
