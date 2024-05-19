const express = require("express");
const authController = require("../controllers/authController");
const validate = require("../util/validate");
const userRegistrationSchema = require("../util/userRegistrationSchema");
const router = express.Router();

router
  .route("/signup")
  .post(userRegistrationSchema, validate, authController.signUp);
router.route("/login").post(authController.login);

module.exports = router;
