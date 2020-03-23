const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserEquipmentGolfClub = require("./UserEquipmentSubModels/UserEquipmentGolfClub");

const userEquipmentSchema = new Schema({
    userEquipmentGolf: {
        golfBag: {
            type: String,
            trim: true,
            unique: false,
        },
        userEquipmentGolfClub: [UserEquipmentGolfClub.schema]
    }
    // Other Sports equipment goes here
});

const UserEquipment = mongoose.model("UserEquipment", userEquipmentSchema);

module.exports = UserEquipment;