const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");

const { Conflict } = require("http-errors");

const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const avatarURL = gravatar.url(email);
  if (user) {
    throw new Conflict(409, "Email in use");
  }
  const verificationToken = nanoid();
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Confirm email",
    html: `<a href="http://localhost:3000/api/users/verify/:${verificationToken}" target="_blank">Press to confirm email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email,
      subscription: result.subscription,
      avatarURL,
      verificationToken: result.verificationToken,
    },
  });
};

module.exports = register;
