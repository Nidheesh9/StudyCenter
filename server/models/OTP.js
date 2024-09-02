const mongoose = require("mongoose");
const mail = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
})

async function sendVerificationMail(email,otp){
    try{
        const mailResponse = mail(email,"Verification For StudyCenter Login",otp);
        console.log("Email Sent Successfully:-",mailResponse);
    } catch(e){
        console.log("Verification Error:-",e);
        throw e;
    }
}

OTPSchema.pre("save",async function(next){
    await sendVerificationMail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",OTPSchema);