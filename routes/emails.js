const nodemailer = require("nodemailer");

// We can call this again from button click for resend email.
exports.sendVerificationEmail = async (recieverEmail, token) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PW
        }
    });

    const mailOptions = {
        from: '"Spota Services" <Verification@Sporta.com>', // sender address
        to: recieverEmail, // list of receivers
        subject: "Verifying Your Email", // Subject line
        text: "hi", // plain text body
        html: '<b>Please click the link to verify your email</b><a href="' + process.env.BASE_URL + "users/verify/" + token + '"> Click ME</a>' // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

