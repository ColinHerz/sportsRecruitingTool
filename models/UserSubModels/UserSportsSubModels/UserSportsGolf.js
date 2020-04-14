const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let GolfCourse = require("../../GolfMisc/GolfCourse");
let GolfSubScore = require("./UserSportsGolfSubModels/UserSportsGolfSubScore");
let GolfBag = require("../GolfBag");

// A golf match consists of an array of hole scores
// two nine hole sub scores and a total score.
const userSportsGolfSchema = new Schema({
    datePlayed: Date,
    golfMatch: [GolfSubScore.schema],
    coursePlayed: GolfCourse.schema,
    GolfBagUsed: Schema.Types.ObjectId,
    frontNineScore: Number,
    backNineScore: Number,
    totalScore: Number
    // Other details can go here
});

const userSportsGolf = mongoose.model("userSportsGolf", userSportsGolfSchema);

module.exports = userSportsGolf;