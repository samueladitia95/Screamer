"use strict";

const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.post("/register", UserController.register); //? to register new user
router.post("/login", UserController.login); //? to login
router.patch("/:id/update", UserController.updateInformation); //? to change full name, bio, location

module.exports = router;
