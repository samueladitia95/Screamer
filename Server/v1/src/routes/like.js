"use strict";

const router = require("express").Router();
const LikeController = require("../controllers/LikeController");
const { authorizationLike } = require("../middlewares/security");

router.post("/:PostId/add", LikeController.createOne); //? Add like to Post
router.delete("/:id/delete", authorizationLike, LikeController.deleteOne); //? Delete like

module.exports = router;
