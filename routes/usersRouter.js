const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/").get(userController.getAllUsers);

router.route("/:id").get().put().delete();

module.exports = router;
