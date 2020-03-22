const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserEquipmentGolfClub = require("./UserEquipmentSubModels/UserEquipmentGolfClub");
//console.log("ahh" + UserEquipmentGolfClub.Schema);
const userEquipmentSchema = new Schema({
    golfBag: {
        type: String,
        trim: true,
        unique: false,
    },
    userEquipmentGolfClub: [UserEquipmentGolfClub.schema]
});

const UserEquipment = mongoose.model("UserEquipment", userEquipmentSchema);

module.exports = UserEquipment;