"use strict";

const router = require("express").Router();
const PostController = require("../controllers/PostController");

router.get("/", PostController.getAll); //? Get all Posts
router.get("/:id/detail", PostController.getOne); //? Get one Post
router.post("/", PostController.createOne); //? Create one Post
//! Post authorization
router.patch("/:id/update", PostController.updateOne); //? Update Post title and content 
router.delete("/:id/delete", PostController.deleteOne); //? Delete one Post

module.exports = router;
