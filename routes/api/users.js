const express = require("express");

const { schemas } = require("../../models/user");

const { ctrlWrapper, auth, validation } = require("../../middlewares");

const {
  register,
  login,
  currentUser,
  logout,
  updateSubscription,
} = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(schemas.register), ctrlWrapper(register));
router.post("/login", validation(schemas.login), ctrlWrapper(login));
router.get("/current", auth, ctrlWrapper(currentUser));
router.get("/logout", auth, ctrlWrapper(logout));
router.patch(
  "/:id/subscription",
  auth,
  validation(schemas.subscription),
  ctrlWrapper(updateSubscription)
);

module.exports = router;
