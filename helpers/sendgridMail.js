// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { META_EMAIL, GMAIL_EMAIL, SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const mail = {
  to: GMAIL_EMAIL, // Change to your recipient
  from: META_EMAIL, // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail
  .send(mail)
  .then(() => {
    console.log("Email send success");
  })
  .catch((error) => {
    console.error(error.message);
  });
