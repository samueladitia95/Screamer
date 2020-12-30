"use strict";

const router = require("express").Router();
const PostController = require("../controllers/PostController");
const { authorizationPost } = require("../middlewares/security");

router.get("/", PostController.getAll); //? Get all Posts
router.get("/:id/detail", PostController.getOne); //? Get one Post
router.post("/", PostController.createOne); //? Create one Post
router.patch("/:id/update", authorizationPost, PostController.updateOne); //? Update Post title and content
router.delete("/:id/delete", authorizationPost, PostController.deleteOne); //? Delete one Post

module.exports = router;
