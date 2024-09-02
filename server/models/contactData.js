const mongoose = require("mongoose");

const contactDataSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
    },
    phoneNo:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("contactData",contactDataSchema);