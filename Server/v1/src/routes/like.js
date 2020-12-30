"use strict";

const router = require("express").Router();
const LikeController = require("../controllers/LikeController");

router.post("/:PostId/add", LikeController.createOne); //? Add like to Post
router.delete("/:id/delete", LikeController.deleteOne); //? Delete like

module.exports = router;
