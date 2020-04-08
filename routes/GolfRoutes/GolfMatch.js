const jwt = require('jsonwebtoken');

let User = require("../../models/User");
let UserSportsGolf = require("../../models/UserSubModels/UserSportsSubModels/UserSportsGolf");
let GolfCourse = require("../../models/GolfMisc/GolfCourse");


exports.postGolfMatch = async (req, res) => {
    // takes user selected golf course, equipment and user cookie, then makes a match, then sends its id
    const coursePlayed = req.body.coursePlayed; // Course name which will be used to search for course data
    const equipmentUsed = req.body.equipmentUsed; // id that matches up to a bag of clubs 
    const datePlayed = req.body.datePlayed;
    const authToken = req.cookies.session;

    // Adding the data from the request into an object
    const userSportsGolf = new UserSportsGolf({
        coursePlayed,
        equipmentUsed,
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
    const golfMatch = req.body.golfMatch;
    const authToken = req.cookies.session;

    jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({ "Error": "Invalid Credentials" });
        }
        const filter = { _id: user.id };
        User.findOne(filter)
            .then(user => {
                const roundOfGolf = user.userSports.golf.id(golfMatch)
                // would call get name for coursePlayed
                // call get for equipmentUsed
                // call get subscores
                // compile those with the equipment object the course name and the date played and the subscores
                return res.status(200).json({ "succ": roundOfGolf.datePlayed }); // this 
            })
            .catch()
    });
}