const nodemailer = require("nodemailer");

const sendMail = (id, email, token) => {
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
    subject: "Reset Password...",
    html: `<p>Hello, reset your password by clicking on this</p>
        <br>
        <a href="${process.env.FRONTEND_BASE_URL}/resetpassword?id=${id}&token=${token}">Click here to verify</a>
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
