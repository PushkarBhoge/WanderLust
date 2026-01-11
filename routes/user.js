const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// Root route redirect
router.get("/", (req, res) => {
  res.redirect("/listing");
});

router
  .route("/signup")
  .get(wrapAsync(userController.renderSignupForm))
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(wrapAsync(userController.renderLoginForm))
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userController.login)
  );


router.get("/logout", wrapAsync(userController.logout));

module.exports = router;
