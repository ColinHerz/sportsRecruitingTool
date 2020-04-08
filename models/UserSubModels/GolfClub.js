const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GolfClubSchema = new Schema({
    // 1 is wood, 2 is iron, 3 is wedge, 4 is putter
    clubType: {
        type: Number 
    },
    clubName: {
        type: String,
        trim: true,
        unique: false
    }
});

const GolfClub = mongoose.model("GolfClub", GolfClubSchema);

module.exports = GolfClub;