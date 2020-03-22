const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userFavoriteSchema = new Schema({
    favoriteGolfCourse: {
        type: String,
        trim: true,
        unique: false
    }
});

const userFavorite = mongoose.model("userFavorite", userFavoriteSchema);

module.exports = userFavorite;