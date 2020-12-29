"use strict";

const router = require("express").Router();
const user = require("./user");
const post = require("./post");
const comment = require("./comment");
const like = require("./like");
const { authentication } = require("../middlewares/security");

router.use("/users", user);

router.use(authentication);

router.use("/posts", post);
router.use("/comments", comment);
router.use("/likes", like);

module.exports = router;
