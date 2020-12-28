"use strict";

const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = err.message;

  switch (err.name) {
    case "SequelizeValidationError":
      status = 400;
      break;
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
    case "BadRequest":
      status = 400;
      break;
    case "Unauthorized":
      status = 401;
      break;
    case "JsonWebTokenError":
      staus = 401;
      message = "Failed to Authenticate";
      break;
    case "Forbidden":
      status = 403;
      break;
    case "NotFound":
      status = 404;
      break;
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;
