const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        trim:true,
    },
    courseDescription:{
        type:String,
        required:true,
        trim:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    // courseSection:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Section"
    // }],
    price:{
        type:Number,
        required:true,
    },
    whatYouWillLearn:{
        type:String,
    },
    ratingAndReview:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    }],
    thumbnail:{
        type:String
    }, 
    tag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    },
    videoUrl:{
        type:String
    },
    duration:{
        type:String
    },
    instructions:[{
        type:String
    }],
    studentEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    ],
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
})

module.exports = mongoose.model("Course",courseSchema);