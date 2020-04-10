const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let GolfClub = require("../../GolfClub");

const GolfAnalyticsSchema = new Schema({
    clubUsed: GolfClub.schema
    // any other analytics that are once per swing
});

// Storing each game in an array under its sport
const UserSportsGolfSubScoreSchema = new Schema({
    score: {
        type: Number,
        required: true
    },
    numberOfPutts: {
        type: Number
    },
    fairwayHit: {
        type: Boolean
    },
    greenInRegulation: {
        type: Boolean,
    },
    clubsUsed: [{type: Schema.Types.ObjectId}]
    // any other analytics that are once per hole
});

const UserSportsGolfSubScore = mongoose.model("UserSportsGolfSubScore", UserSportsGolfSubScoreSchema);

module.exports = UserSportsGolfSubScore;