const { Schema, model } = require("mongoose");
const Joi = require("joi");

const regexpPhone = /^\(\d{3}\)\s\d{3}-\d{4}$/;
const regexpEMAIL = /^\S+@\S+\.\S+$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "User email required"],
      match: [regexpEMAIL],
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "User phone number required"],
      match: [regexpPhone, "Must be in format (000) 000-0000"],
      unique: true,
      trim: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(regexpEMAIL).required(),
  phone: Joi.string().pattern(regexpPhone, "numbers").required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas: {
    add: addContactSchema,
    updateFavorite: updateFavoriteSchema,
  },
};
