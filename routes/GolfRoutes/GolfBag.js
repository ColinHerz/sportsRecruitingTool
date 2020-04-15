const jwt = require('jsonwebtoken');

let User = require("../../models/User");
let GolfBag = require("../../models/UserSubModels/GolfBag");
let GolfClub = require("../../models/UserSubModels/GolfClub");


exports.postGolfBag = async (req, res) => {
    const bagName = req.body.bagName;
    const authToken = req.cookies.session;

    // Adding the data from the request into an object
    const golfBag = new GolfBag({
        bagName
    });

    jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({ "Error": "Invalid Credentials" });
        }

        // Looking for a user with the given user id.
        const filter = { _id: user.id };
        User.findOne(filter)
            .then(user => {
                if (!user) {
                    return res.status(400).json({ warning: "User Not Found" });
                }
                // Found the user, now making a golfBag instance and adding it to the array
                const bag = user.golfBags.create(golfBag);
                user.golfBags.push(bag);
                user.save()
                    .then(() => {
                        return res.status(200).json({ "golfBag": bag.id });
                    })
                    .catch(err => res.status(500).json("Error" + err));
            })
            .catch(err => res.status(500).json("Error" + err));
    });
}

exports.postGolfBagDelete = async (req, res) => {
    const golfBag = req.body.golfBag;
    const authToken = req.cookies.session;

    jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({ "Error": "Invalid Credentials" });
        }

        // Looking for a user with the given user id.
        const filter = { _id: user.id };
        User.findOne(filter)
            .then(user => {
                if (!user) {
                    return res.status(400).json({ warning: "User Not Found" });
                }

                user.golfBags.id(golfBag).remove();
                user.save()
                    .then(() => {
                        return res.status(200).json({ Message: "Bag removed" });
                    })
                    .catch(err => res.status(500).json("Error" + err));
            })
            .catch(err => res.status(500).json("Error" + err));
    });
}

exports.getGolfBag = async (req, res) => {
    const golfBag = req.body.golfBag;
    const authToken = req.cookies.session;

    jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({ "Error": "Invalid Credentials" });
        }

        // Looking for a user with the given user id.
        const filter = { _id: user.id };
        User.findOne(filter)
            .then(user => {
                if (!user) {
                    return res.status(400).json({ warning: "User Not Found" });
                }
                return res.status(200).json(user.golfBags.id(golfBag));
            })
            .catch(err => res.status(500).json("Error" + err));
    });
}

exports.getAllGolfBags = async (req, res) => {
    const authToken = req.cookies.session;

    jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({ "Error": "Invalid Credentials" });
        }

        // Looking for a user with the given user id.
        const filter = { _id: user.id };
        User.findOne(filter)
            .then(user => {
                if (!user) {
                    return res.status(400).json({ warning: "User Not Found" });
                }
                return res.status(200).json(user.golfBags);
            })
            .catch(err => res.status(500).json("Error" + err));
    });
}

exports.postGolfClubAdd = async (req, res) => {
    const clubType = req.body.clubType;
    const clubName = req.body.clubName;
    const golfBag = req.body.golfBag;
    const authToken = req.cookies.session;
    // Adding the data from the request into an object
    const golfClub = new GolfClub({
        clubType,
        clubName
    });

    jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({ "Error": "Invalid Credentials" });
        }

        // Looking for a user with the given user id.
        const filter = { _id: user.id };
        User.findOne(filter)
            .then(user => {
                if (!user) {
                    return res.status(400).json({ warning: "User Not Found" });
                }
                // Found the user, now making a golfBag instance and adding it to the array
                const club = user.golfBags.id(golfBag).golfClub.create(golfClub);
                user.golfBags.id(golfBag).golfClub.push(club);
                user.save()
                    .then(() => {
                        return res.status(200).json({ "golfClub": club.id });
                    })
                    .catch(err => res.status(500).json("Error" + err));
            })
            .catch(err => res.status(500).json("Error" + err));
    });
}

exports.postGolfClubDelete = async (req, res) => {
    const golfClub = req.body.golfClub;
    const golfBag = req.body.golfBag;
    const authToken = req.cookies.session;

    jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({ "Error": "Invalid Credentials" });
        }

        // Looking for a user with the given user id.
        const filter = { _id: user.id };
        User.findOne(filter)
            .then(user => {
                if (!user) {
                    return res.status(400).json({ warning: "User Not Found" });
                }
                user.golfBags.id(golfBag).golfClub.id(golfClub).remove();
                user.save()
                    .then(() => {
                        return res.status(200).json({ Message: "Club removed" });
                    })
                    .catch(err => res.status(500).json("Error" + err));
            })
            .catch(err => res.status(500).json("Error" + err));
    });
}

// use this to clubs used on each hole
exports.getGolfClub = async (req, res) => {
    const golfClub = req.params.golfClub;
    const golfBag = req.params.golfBag;
    const authToken = req.cookies.session;

    jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({ "Error": "Invalid Credentials" });
        }

        // Looking for a user with the given user id.
        const filter = { _id: user.id };
        User.findOne(filter)
            .then(user => {
                if (!user) {
                    return res.status(400).json({ warning: "User Not Found" });
                }
                const club = user.golfBags.id(golfBag).golfClub.id(golfClub);
                return res.status(200).json(club);
            })
            .catch(err => res.status(500).json("Error" + err));
    });
}
