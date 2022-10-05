const { Contact, schemas } = require("../models/contact");
const { isValidObjectId } = require("mongoose");
const { createError } = require("../helpers");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = schemas.updateFavorite.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }

    const { id } = req.params;
    const isValid = isValidObjectId(id);
    if (!isValid) {
      throw createError(404);
    }
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      {
        new: true,
      }
    );
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

module.exports = updateStatusContact;
