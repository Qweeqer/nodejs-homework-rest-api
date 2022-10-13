const express = require("express");
const { schemas } = require("../../models/contact");
const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers");

const {
  ctrlWrapper,
  validateId,
  auth,
  validation,
} = require("../../middlewares");

const router = express.Router();

router.get("/", auth, ctrlWrapper(getAllContacts));

router.get("/:id", validateId, ctrlWrapper(getContactById));

router.post("/", auth, validation(schemas.add), ctrlWrapper(addContact));

router.delete("/:id", validateId, ctrlWrapper(deleteContact));

router.put(
  "/:id",
  validateId,
  validation(schemas.add),
  ctrlWrapper(updateContact)
);

router.patch(
  "/:id/favorite",
  validation(schemas.updateFavorite),
  validateId,
  ctrlWrapper(updateStatusContact)
);

module.exports = router;
