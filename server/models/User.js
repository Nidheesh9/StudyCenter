const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    accountType:{
        type:String,
        enum:["Student","Instructor","Admin"],
        required:true
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    password:{
        type:String,
        required:true,
        trim:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    image:{
        type:String,
    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    token:{
        type:String
    },
    resetTime:{
        type:Date
    }
});

module.exports = mongoose.model("User",userSchema);