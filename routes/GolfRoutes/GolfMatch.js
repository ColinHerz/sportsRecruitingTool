const jwt = require('jsonwebtoken');

let User = require("../../models/User");
let UserSportsGolf = require("../../models/UserSubModels/UserSportsSubModels/UserSportsGolf");
let UserSportsGolfSubScore = require("../../models/UserSubModels/UserSportsSubModels/UserSportsGolfSubModels/UserSportsGolfSubScore");
let GolfCourse = require("../../models/GolfMisc/GolfCourse");


exports.postGolfMatch = async (req, res) => {
    // takes user selected golf course, equipment and user cookie, then makes a match, then sends its id
    const coursePlayed = req.body.coursePlayed; // Course name which will be used to search for course data
    const GolfBagUsed = req.body.GolfBagUsed; // id that matches up to a bag of clubs 
    const datePlayed = req.body.datePlayed;
    const authToken = req.cookies.session;

    // Adding the data from the request into an object
    const userSportsGolf = new UserSportsGolf({
        coursePlayed,
        GolfBagUsed,
        datePlayed
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
                // Found the user, now making a golfMatch instance and adding it to the array
                const roundOfGolf = user.userSports.golf.create(userSportsGolf);
                user.userSports.golf.push(roundOfGolf);
                user.save()
                    .then(() => {
                        return res.status(200).json({ "golf": roundOfGolf.id })
                    })
                    .catch(err => res.status(500).json("Error" + err));
            })
            .catch(err => res.status(500).json("Error" + err));
    });
}

exports.getGolfMatch = async (req, res) => {
    const golfMatch = req.params.golfMatch;
    const authToken = req.cookies.session;

    jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({ "Error": "Invalid Credentials" });
        }
        const filter = { _id: user.id };
        User.findOne(filter)
            .then(user => {
                const roundOfGolf = user.userSports.golf.id(golfMatch);
                return res.status(200).json(roundOfGolf);
            })
            .catch(err => res.status(500).json("Error" + err));
    });
}

exports.postGolfHoleScore = async (req, res) => {
    const golfMatch = req.body.golfMatch; // just the id of the match to post the score into
    const score = req.body.score;
    const clubsUsed = req.body.clubsUsed;
    const numberOfPutts = req.body.numberOfPutts;
    const fairwayHit = req.body.fairwaysHit;
    const greenInRegulation = req.body.greenInRegulation;
    const authToken = req.cookies.session;

    
    // Adding the data from the request into an object
    const userSportsGolfSubScore = new UserSportsGolfSubScore({
        score,
        clubsUsed,
        numberOfPutts,
        fairwayHit,
        greenInRegulation
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
                const hole = user.userSports.golf.id(golfMatch).golfMatch.create(userSportsGolfSubScore);
                user.userSports.golf.id(golfMatch).golfMatch.push(hole);
                user.save()
                    .then(() => {
                        return res.status(200).json({ "hole": hole.score })
                    })
                    .catch(err => res.status(500).json("Error" + err));
            })
            .catch(err => res.status(500).json("Error" + err));
    });
}

// TODO : MAKE THIS WORK THEN MAke a change name and pw and whatnot
exports.postGolfHoleScoreUpdate = async (req, res) => {
    const hole = req.body.hole; // this is the hole to update
    const golfMatch = req.body.golfMatch; // just the id of the match to post the score into
    const score = req.body.score;
    const clubsUsed = req.body.clubsUsed;
    const numberOfPutts = req.body.numberOfPutts;
    const fairwayHit = req.body.fairwaysHit;
    const greenInRegulation = req.body.greenInRegulation;
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
                const foundHole = user.userSports.golf.id(golfMatch).golfMatch.id(hole)
                foundHole.score = score;
                foundHole.clubsUsed = clubsUsed;
                foundHole.numberOfPutts = numberOfPutts;
                foundHole.fairwayHit = fairwayHit;
                foundHole.greenInRegulation = greenInRegulation;
                user.save()
                    .then(() => {
                        return res.status(200).json({ Message : "hole updated" })
                    })
                    .catch(err => res.status(500).json("Error" + err));
            })
            .catch(err => res.status(500).json("Error" + err));
    });
}

exports.getGolfHole = async (req, res) => {
    const hole = req.params.hole;
    const match = req.params.match;
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
                return res.status(200).json(user.userSports.golf.id(match).golfMatch.id(hole));
            })
            .catch(err => res.status(500).json("Error" + err));
    });
}