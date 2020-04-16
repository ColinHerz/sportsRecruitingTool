// post event
// post score to event
// invite more users to event.

const jwt = require('jsonwebtoken');

let GolfEvents = require("../../models/GolfMisc/GolfEvent");
let User = require("../../models/User");

exports.postGolfEvent = async (req, res) => {
    // this endpoint initalizes the event
    const eventName = req.body.eventName;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const course = req.body.course; // course ID
    const players = req.body.players;
    const authToken = req.cookies.session;

    // Adding the data from the request into an object
    const golfEvents = new GolfEvents({
        eventName,
        startDate,
        endDate,
        course
    });

    jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({ "Error": "Invalid Credentials" });
        }
        players.push(user.email);
        GolfEvents.create(golfEvents)
            .then((event) => {
                event.owner = user.id;
                event.players = players;
                event.save().then(() => {
                    console.log(event);
                    return res.status(200).json({ Message: eventName + " created successfully", "event": event.id });
                })
                    .catch(err => res.status(500).json("Error " + err));
            })
            .catch(err => res.status(500).json("Error " + err));
    });
}

exports.postGolfEventScore = async (req, res) => {
    // this endpoint allows a user to post thier score to an event.
    const event = req.body.event; // the id of the event to post to.
    const golfMatchID = req.body.golfMatch; // this is the id of a golf match that you want to post to the event
    const authToken = req.cookies.session;

    jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({ "Error": "Invalid Credentials" });
        }
        const filter = { _id: event };
        GolfEvents.findOne(filter)
            .then(foundEvent => {
                if (!foundEvent) {
                    return res.status(400).json({ warning: "Event Not Found" });
                }
                User.findOne({ _id: user.id })
                    .then(foundUser => {
                        const golfMatch = foundUser.userSports.golf.id(golfMatchID);
                        if (golfMatch.datePlayed > foundEvent.endDate || golfMatch.datePlayed < foundEvent.startDate) {
                            return res.status(400).json({ warning: "This round was not played during the event." });
                        }
                        const score = foundEvent.scores.create({ "userScore": golfMatch, user: user.email, "datePosted": new Date() });

                        // check if user has no posted to event yet
                        const userHasPostedToEvent = foundEvent.scores.some(item => item.user === user.email);
                        if (userHasPostedToEvent) {
                            return res.status(400).json({ warning: "You have already posted a score to this event" });
                        }

                        foundEvent.scores.push(score);
                        foundEvent.save()
                            .then(() => {
                                return res.status(200).json({ score });
                            })
                            .catch(err => res.status(500).json("Error " + err));
                    })
                    .catch(err => res.status(400).json("Error: match not found " + err));
            })
            .catch(err => res.status(500).json("Error" + err));
    });
}

exports.getAllMyEvents = async (req, res) => {
    // returns all of the events where you are a participant.
    const authToken = req.cookies.session;

    jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({ "Error": "Invalid Credentials" });
        }
        const filter = { players: user.email };
        GolfEvents.find(filter)
            .then(events => {
                if (!events) {
                    return res.status(400).json({ warning: "User Not Found" });
                }
                return res.status(200).json(events.reverse());
            })
            .catch(err => res.status(500).json("Error" + err));
    });
}

// return all results of the event  // DO THIS AFTER WE MAKE THE SCORES // maybe when you pst a score is says what place you're in.
exports.getEventResults = async (req, res) => {
    const event = req.params.event; // the id of the event to post to.
    const authToken = req.cookies.session;

    jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({ "Error": "Invalid Credentials" });
        }
        const filter = { _id: event };
        GolfEvents.findOne(filter)
            .then(foundEvent => {
                if (!foundEvent) {
                    return res.status(400).json({ warning: "Event Not Found" });
                }
                foundEvent.scores.sort((a, b) => parseFloat(a.userScore.totalScore) - parseFloat(b.userScore.totalScore));

                // creating the new json with just the name, placement, and scores.
                var placement = 1;
                var resultsString = '{ "results": ['
                for (const element of foundEvent.scores) {
                    if (placement != 1) {
                        resultsString += ",";
                    }
                    resultsString += ('{ "user" : "' + element.user +
                        '", "place" :"' + placement +
                        '", "total" :"' + element.userScore.totalScore
                    );
                    var subTotalCount = 1;
                    for (const subTotal of element.userScore.subTotalScores) {
                        resultsString += '", "' + subTotalCount + '" :"' + subTotal.subTotal;
                        subTotalCount++;
                        console.log("loop");
                    }
                    resultsString += '"}';
                    placement++;
                }

                resultsString += "] }";
                console.log(resultsString);

                try {
                    return res.status(200).json(JSON.parse(resultsString));
                } catch (error) {
                    return res.status(400).json("Error " + err)
                }

            })
            .catch(err => res.status(500).json("Error" + err));
    });
}