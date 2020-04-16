const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSportsGolf = require("../UserSubModels/UserSportsSubModels/UserSportsGolf");

const userEntrySchema = new Schema({
    user: String, // store the user email
    userScore: UserSportsGolf.schema,
    datePosted: Date
});

const GolfEventSchema = new Schema({
    owner: Schema.Types.ObjectId, // id of the user who owns the event
    eventName: String,
    startDate: Date,
    endDate: Date,
    scores: [userEntrySchema],
    players: [String],
    course: String
});

const golfEvent = mongoose.model("golfEvent", GolfEventSchema);

module.exports = golfEvent;
