const express = require("express");

const router = express.Router();

const User = require("../models/user.js");

const passport = require("passport");

const wrapAsync = require("../utils/wrapAsycn.js");

const { saveRedirectUrl } = require("../middleware.js");

const usersController = require("../controllers/users.js");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(usersController.signup));

router.get("/login", usersController.renderLoginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  usersController.login,
);

router.get("/logout", usersController.logout);

module.exports = router;
