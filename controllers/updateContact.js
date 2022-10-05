const { Contact, schemas } = require("../models/contact");
const { isValidObjectId } = require("mongoose");
const { createError } = require("../helpers");

const updateContact = async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }
    const { id } = req.params;
    const isValid = isValidObjectId(id);
    if (!isValid) {
      throw createError(404);
    }
    const result = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
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

module.exports = updateContact;
