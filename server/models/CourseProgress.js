const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
    courseId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    completed:{
        type:Boolean,
        default:false,
    }
});

module.exports = mongoose.model("CourseProgress",courseProgressSchema);