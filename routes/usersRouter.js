const express = require("express");
const { check, validationResult } = require("express-validator");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/").get(userController.getAllUsers);

router.route("/:id").get(userController.getSingleUser).put().delete();

module.exports = router;
