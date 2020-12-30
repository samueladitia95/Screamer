"use strict";

const router = require("express").Router();
const CommentController = require("../controllers/CommentController");
const { authorizationComment } = require("../middlewares/security");

router.get("/:PostId/all", CommentController.getAll); //? Get all Comment in the Post
router.post("/:PostId/add", CommentController.createOne); //? Add one Comment in the Post
router.patch("/:id/update", authorizationComment, CommentController.updateOne); //? Update one Comment
router.delete("/:id/delete", authorizationComment, CommentController.deleteOne); //? Delete one Post

module.exports = router;
