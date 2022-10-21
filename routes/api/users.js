const express = require("express");

const { schemas } = require("../../models/user");

const { ctrlWrapper, auth, validation, upload } = require("../../middlewares");

const {
  register,
  login,
  currentUser,
  logout,
  updateSubscription,
  updateAvatar,
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
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

module.exports = router;
