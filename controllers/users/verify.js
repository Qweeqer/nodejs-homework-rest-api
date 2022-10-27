const { User } = require("../../models/user");
const { BadRequest } = require("http-errors");
const { sendEmail } = require("../../helpers");

const verify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const { verificationToken, verify } = user;
  if (!user) {
    throw new BadRequest(400, "Missing required field email");
  }
  if (verify) {
    throw new BadRequest(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Confirm email",
    html: `<a target="_blank" href="https://localhost:3000/api/users/verify/${verificationToken}">Click to confirm email</a>`,
  };
  await sendEmail(mail);

  res.json({
    message: "Verification email send",
  });
};

module.exports = verify;
