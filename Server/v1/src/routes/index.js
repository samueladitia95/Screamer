"use strict";

const router = require("express").Router();
const user = require("./user");
const post = require("./post");
const comment = require("./comment");
const like = require("./like");

router.use("/users", user);

//! authencation here

router.use("/posts", post);
router.use("/comments", comment);
router.use("/likes", like);

module.exports = router;
