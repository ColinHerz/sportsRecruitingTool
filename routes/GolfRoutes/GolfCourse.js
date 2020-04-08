const jwt = require('jsonwebtoken');

let GolfCourse = require("../../models/GolfMisc/GolfCourse");

// These calls will need to add data as we add columns to course

exports.postGolfCourse = async (req, res) => {
    const courseName = req.body.courseName;
    const authToken = req.cookies.session;

    jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
        if (err) {
            res.status(401).json({ "Error": "Invalid Credentials" });
        }
        GolfCourse.findOne({ courseName })
            .then(doesCourseExist => {
                if (doesCourseExist)
                    return res.status(400).json({ warning: "This course is already in our system" });

                const golfCourse = new GolfCourse({
                    courseName
                });
                golfCourse.save()
                    .then(golfCourse => {
                        res.status(200).json({ Message: golfCourse.courseName + " is added to our system" });
                    })
                    .catch(err => res.status(500).json("Error" + err));
            })
            .catch(err => res.status(500).json("Error" + err));
    });
}

exports.getGolfCourse = async (req, res) => {
    const courseName = req.body.courseName;
    const authToken = req.cookies.session;

    jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
        if (err) {
            res.status(401).json({ "Error": "Invalid Credentials" });
        }
        GolfCourse.findOne({ courseName })
            .then(golfCourse => {
                if (!golfCourse)
                    return res.status(400).json({ warning: "This course is not in our system" });
                res.status(200).json(golfCourse);
            });
    });
}
