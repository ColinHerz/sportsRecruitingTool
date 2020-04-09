const nodemailer = require("nodemailer");

exports.resendVerificationEmail = async (req, res) => {
    console.log(req.body.recieverEmail);
    this.sendVerificationEmail(req.body.recieverEmail, req.body.token)
        .then(() => res.status(200).json({ success: true }))
        .catch(err => res.status(400).json("Error" + err));
}

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
        from: '"Sporta Services" <Verification@Sporta.com>', // sender address
        to: recieverEmail, // list of receivers
        subject: "Verifying Your Email", // Subject line
        text: "hi", // plain text body
        html: '<b>Please click the link to verify your email</b><a href="' + process.env.BASE_URL + "/api/users/verify/" + token + '"> Click ME</a>' // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

