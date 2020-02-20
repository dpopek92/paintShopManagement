const mail = require("nodemailer");

var smtpTransport = mail.createTransport({
 service: "Gmail",
 auth: {
  user: "blowmeble.info@gmail.com",
  pass: "1uoDpNieFIH2tpLLAsva"
 }
});

module.exports = smtpTransport;
