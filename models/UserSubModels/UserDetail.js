const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDetailSchema = new Schema({
    age: {
        type: Number,
        trim: true,
        unique: false
    },
    height: {
        type: Number,
        trim: true,
        unique: false
    },
    weight: {
        type: Number,
        trim: true,
        unique: false
    }
});

const userDetail = mongoose.model("userDetail", userDetailSchema);

module.exports = userDetail;