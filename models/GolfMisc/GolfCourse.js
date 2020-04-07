const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GolfCourseSchema = new Schema({
    courseName: {
        type:String,
        unique:true,
        required: true,
    }
    // Course details go here.
});

const GolfCourse = mongoose.model("GolfCourse", GolfCourseSchema);

module.exports = GolfCourse;