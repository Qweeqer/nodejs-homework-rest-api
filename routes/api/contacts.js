const express = require("express");

const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:id", getContactById);

router.post("/", addContact);

router.delete("/:id", deleteContact);

router.put("/:id", updateContact);

router.patch("/:id/favorite", updateStatusContact);

module.exports = router;
