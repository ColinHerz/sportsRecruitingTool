const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserEquipmentGolfClub = require("./GolfClub");
let GolfCourse = require("../GolfMisc/GolfCourse");

const userFavoriteSchema = new Schema({
    userFavoriteGolf: {
        favoriteGolfCourse: GolfCourse.schema,
        favoriteGolfClub: UserEquipmentGolfClub.schema
    }
    // Other Sports favorites go here
});

const userFavorite = mongoose.model("userFavorite", userFavoriteSchema);

module.exports = userFavorite;