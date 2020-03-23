const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSportsGolf = require("./UserSportsSubModels/UserSportsGolf");

// Storing each game in an array under its sport
const userSportsSchema = new Schema({
    golf: [UserSportsGolf.schema]
    // Other sports go here.
});

const userSports = mongoose.model("userSports", userSportsSchema);

module.exports = userSports;