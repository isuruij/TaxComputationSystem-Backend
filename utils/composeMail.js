const nodemailer = require("nodemailer");

const sendMail = (to, subject, body) => {
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
    to: `${to}`,
    subject: `${subject}`,
    html: `<p>
    <br>
    ${body}</p>
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