const { Contact } = require("../models/contact");
const { isValidObjectId } = require("mongoose");
const { createError } = require("../helpers");

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isValid = isValidObjectId(id);
    if (!isValid) {
      throw createError(404);
    }
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw createError(404);
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
