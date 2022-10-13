const { createError } = require("../helpers");
const { isValidObjectId } = require("mongoose");

const validateId = (req, res, next) => {
  const { id } = req.params;
  const isValid = isValidObjectId(id);
  if (!isValid) {
    next(createError(404, `Contact with id ${id} not found`));
    return;
  }
  next();
};

module.exports = validateId;
