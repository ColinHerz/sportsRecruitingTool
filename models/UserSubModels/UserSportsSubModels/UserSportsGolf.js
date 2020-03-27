const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let GolfCourse = require("../../GolfMisc/GolfCourse");
let GolfSubScore = require("./UserSportsGolfSubModels/UserSportsGolfSubScore");
let UserEquipment = require("../UserEquipment");

// A golf match consists of an array of hole scores
// two nine hole sub scores and a total score.
const userSportsGolfSchema = new Schema({
    golfMatch: [GolfSubScore.schema],
    coursePlayed: GolfCourse.schema,
    equipmentUsed: UserEquipment.schema
    // Other details can go here
});

const userSportsGolf = mongoose.model("userSportsGolf", userSportsGolfSchema);

module.exports = userSportsGolf;