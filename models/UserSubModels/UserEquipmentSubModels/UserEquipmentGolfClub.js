const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userEquipmentGolfClubSchema = new Schema({
    clubType: {
        type: String,
        trim: true,
        unique: false
    }
});

const userEquipmentGolfClub = mongoose.model("userEquipmentGolfClub", userEquipmentGolfClubSchema);

module.exports = userEquipmentGolfClub;