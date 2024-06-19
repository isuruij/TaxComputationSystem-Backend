const nodemailer = require("nodemailer");

const sendMail = (name, email, document) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Tax Computation System" <isuruijs@gmail.com>',
    to: `${email}`,
    subject: "Upload Document...",
    html: `<p>
    <br>
    hello ${name} please submit your document ${document}</p>
        `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;
