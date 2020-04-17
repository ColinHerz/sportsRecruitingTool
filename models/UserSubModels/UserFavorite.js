const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserEquipmentGolfClub = require("./GolfClub");

const userFavoriteSchema = new Schema({
    userFavoriteGolf: {
        favoriteGolfClub: UserEquipmentGolfClub.schema
    }
    // Other Sports favorites go here
});

const userFavorite = mongoose.model("userFavorite", userFavoriteSchema);

module.exports = userFavorite;
