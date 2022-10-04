const { Contact } = require("../models/contact");
const { createError } = require("../helpers");
const { isValidObjectId } = require("mongoose");

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isValid = isValidObjectId(id);
    if (!isValid) {
      throw createError(404);
    }
    const result = await Contact.findById(id, "-createdAt -updatedAt");
    if (!result) {
      throw createError(404);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
