const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  const { id } = req.params;
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
};

module.exports = getContactById;
