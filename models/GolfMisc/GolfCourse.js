const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GolfCourseSchema = new Schema({
    courseName: {
        type:String,
        required: true,
    },
    par:[{type:Number}]
});

const GolfCourse = mongoose.model("GolfCourse", GolfCourseSchema);

module.exports = GolfCourse;