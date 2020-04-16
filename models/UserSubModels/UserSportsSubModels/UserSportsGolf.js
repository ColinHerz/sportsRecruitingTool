const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let GolfCourse = require("../../GolfMisc/GolfCourse");
let GolfSubScore = require("./UserSportsGolfSubModels/UserSportsGolfSubScore");
let GolfBag = require("../GolfBag");

// A golf match consists of an array of hole scores
// two nine hole sub scores and a total score.
const subTotSchema = new Schema({
    subTotal:{
        type:Number
    }
})

const userSportsGolfSchema = new Schema({
    datePlayed:  {
        type: Date,
        required: true
    },
    golfMatch: [GolfSubScore.schema],
    nameOfRound: String,
    coursePlayed:  {
        type: String
    },
    GolfBagUsed: Schema.Types.ObjectId,
    subTotalScores: [subTotSchema],
    totalScore: {
        type: Number
    }
    // Other details can go here
});

const userSportsGolf = mongoose.model("userSportsGolf", userSportsGolfSchema);

module.exports = userSportsGolf;