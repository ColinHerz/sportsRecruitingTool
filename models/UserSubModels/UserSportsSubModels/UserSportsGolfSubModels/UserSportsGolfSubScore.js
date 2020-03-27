const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userEquipmentGolfClub = require("../../UserEquipmentSubModels/UserEquipmentGolfClub");

// Storing each game in an array under its sport
const UserSportsGolfSubScoreSchema = new Schema({
    score:{
        type: Number,
        required: true
    },
    club: [userEquipmentGolfClub.schema]
    // Other sports go here.
});

const UserSportsGolfSubScore = mongoose.model("UserSportsGolfSubScore", UserSportsGolfSubScoreSchema);

module.exports = UserSportsGolfSubScore;