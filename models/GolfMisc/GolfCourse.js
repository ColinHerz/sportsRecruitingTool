const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GolfCourseSchema = new Schema({
    coursePlayed: {
        type:String,
        unique:false,
        required: true,
    }
    // Course details go here.
});

const GolfCourse = mongoose.model("GolfCourse", GolfCourseSchema);

module.exports = GolfCourse;