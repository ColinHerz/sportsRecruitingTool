const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let GolfClub = require("./GolfClub");

const GolfBagSchema = new Schema({
        bagName: {
            type: String,
            trim: true,
            unique: false,
        },
        golfClub: [GolfClub.schema]
    // Other Sports equipment goes here
});

const GolfBag = mongoose.model("GolfBag", GolfBagSchema);

module.exports = GolfBag;