const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


let User = require("../models/User");
let UserSports = require("../models/UserSubModels/UserSports");
let EmailRoutes = require("./emails");



function validateName(name) {
    var isValidName = true;
    if (/[!@#$%^&*(),.?":{}|<>]/g.test(name) || /\d+/g.test(name)) {
        isValidName = false;
    }
    return isValidName;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateLogin(data) {
    var errors = {};

    if (data.email) {
        errors.email = "Email required";
    }
    else if (!validateEmail(data.email)) {
        errors.email = "Invalid email";
    }

    if (data.password) {
        errors.password = 'Password required';
    }

    return { errors, valid: errors };
}
exports.getUserLogin = async (req, res) => {
    const valid = validateLogin(req.body);
    const email = req.body.email;
    const password = req.body.password;
    if (valid.valid) {
        User.findOne({ email })
            .then(user => {
                if (!user)
                    return res.status(400).json({ warning: "Incorrect Credentials" });

                bcrypt.compare(password, user.password)
                    .then(same => {
                        if (!same) {
                            return res.status(400).json({ warning: "Incorrect Credentials" });
                        }

                        const payload = {
                            id: user.id,
                            email: user.email,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            isVerified: user.isVerified
                        };

                        jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 7200 }, function (err, token) {
                            return res.status(200)
                                .cookie('session', token, { httpOnly: true, expires: 0 })
                                .json({ success: true });
                        });
                    })
                    .catch(err => res.status(400).json("Error" + err));
            })
            .catch(err => res.status(500).json("Error" + err));
    }
    else {
        res.status(400).json("Error Validation")
    }
}

exports.postUserRegister = async (req, res) => {

    const firstname = req.body.firstname.toLowerCase();
    const lastname = req.body.lastname.toLowerCase();
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const isVerified = false;
    const userSports = new UserSports();

    User.findOne({ email })
        .then(doesUserExist => {
            if (doesUserExist)
                return res.status(400).json({ warning: "User name taken" });

            if (!validateName(firstname) || !validateName(lastname))
                return res.status(400).json({ warning: "Invalid character used" });

            const user = new User({
                firstname,
                lastname,
                email,
                password,
                isVerified,
                userSports
            });

            bcrypt.genSalt(10)
                .then(salt => {
                    bcrypt.hash(user.password, salt)
                        .then(hash => {
                            user.password = hash;
                            user.save()
                                .then(user => {
                                    // Payload for the jwt coming for the email end point
                                    const payload = {
                                        id: user.id,
                                        email: user.email,
                                        firstname: user.firstname,
                                        lastname: user.lastname
                                    };

                                    jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 7200 }, function (err, token) {
                                        if (err) {
                                            console.log("Error " + err);
                                        }
                                        // Calling the email gererator and sender
                                        EmailRoutes.sendVerificationEmail(user.email, token)
                                            .catch(err => res.status(500).json("Error sending email " + err));
                                    });

                                    return res.json({
                                        Message: user.email + " is now registered."
                                    });
                                })
                                .catch(err => res.status(400).json("Error saving to db " + err));
                        })
                        .catch(err => res.status(400).json("Error bcrpyt hash " + err));
                })
                .catch(err => res.status(400).json("Error bcrpyt salt " + err));
        })
        .catch((err => res.status(400).json("Error checking if username is valid. " + err)));

};

exports.getUserVerify = async (req, res) => {
    token = req.params.token;
    jwt.verify(token, process.env.JWT_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({ "Error": "Invalid Credentials" });
        }
        email = user.email;
        User.findOne({ email }).then(foundUser => {
            if (foundUser) {
                foundUser.isVerified = true;
                foundUser
                    .save()
                    .then(res.redirect(process.env.BASE_URL))
                    .catch(err => res.status(400).json("Error " + err));
            }
            else {
                return res.status(400).json({ warning: "This user does not exist. " + id });
            }
        });
    });
};

exports.getUser = async (req, res) => {
    const authToken = req.cookies.session;
    jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({ "Error": "Invalid Credentials" });
        }
        const filter = { _id: user.id };
        User.findOne(filter).then(foundUser => {
            if (!foundUser) {
                return res.status(400).json({ warning: "User Not Found" });
            }
            else {
                res.status(200).json(
                    {
                        "firstname": foundUser.firstname,
                        "lastname": foundUser.lastname,
                        "email": foundUser.email
                    });
            }
        }).catch(err => res.status(500).json("Error" + err));
    });
}
