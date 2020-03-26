const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userEquipmentGolfClub = require("../../UserEquipmentSubModels/UserEquipmentGolfClub");

// Storing each game in an array under its sport
const UserSportsGolfSubScoreSchema = new Schema({
    score: {
        type: Number,
        required: true
    },
    greenInRegulation: {
        type: Boolean,
    },
    holeSubAnalytics: [GolfAnalyticsSchema]
    // any other analytics that are once per hole
});

const GolfAnalyticsSchema = new Schema({
    fairwayHit: {
        type: Boolean
    },
    clubUsed: userEquipmentGolfClub.schema
    // any other analytics that are once per swing
});


const UserSportsGolfSubScore = mongoose.model("UserSportsGolfSubScore", UserSportsGolfSubScoreSchema);

module.exports = UserSportsGolfSubScore;