const nodemailer = require("nodemailer");

const createMailTransporter = () => {
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
        from: 'isuruijs@gmail.com',
        to: '2020uelog@gmail.com',
        subject: 'Hello',
        text: 'Hello World' 
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}
  
module.exports = createMailTransporter;