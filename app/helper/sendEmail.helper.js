const nodemailer = require("nodemailer");
const smtpConfig = {
  service: "gmail",
  auth: {
    user: "ahmeedsameh702@gmail.com",
    pass: "htyfzmbcdzxmpbrt",
  },
};
const sendEmail = (userEmail) => {
  try {
    const transporter = nodemailer.createTransport(smtpConfig);
    let mailOptions = {
      from: "session 10",
      to: userEmail,
      subject: "hello",
      text: "hello from my Api I love you To MUCH you do your best to make me better and i know you do anything for me so I love you  ",
    };
    transporter.sendMail(mailOptions);
  } catch (e) {
    console.log("sdsa");
    console.log(e.message);
  }
};

module.exports = sendEmail;
