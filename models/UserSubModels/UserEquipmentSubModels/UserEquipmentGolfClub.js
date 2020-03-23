const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserEquipmentGolfClubSchema = new Schema({
    clubType: {
        type: String,
        trim: true,
        unique: false
    }
});

const UserEquipmentGolfClub = mongoose.model("UserEquipmentGolfClub", UserEquipmentGolfClubSchema);

module.exports = UserEquipmentGolfClub;