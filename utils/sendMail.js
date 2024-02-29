const nodemailer = require("nodemailer");

const sendMail = (name,email,emailToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587, 
        secure: false, 
        auth: {
          user: "isuruijs@gmail.com",
          pass: "vahglsggdpidutpb",
        },
    });

    const mailOptions = {
        from: '"Tax Computation System" <isuruijs@gmail.com>',
        to: `${email}`,
        subject: 'Please verify your email...',
        html:`<p>Hello ${name}, verify your email address by clicking on this</p>
        <br>
        <p>${emailToken}</p>
        <br>
        <a href="http://localhost:5173/verify-email?emailToken=${emailToken}">Click here to verify</a>
        `
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}
  
module.exports = sendMail;