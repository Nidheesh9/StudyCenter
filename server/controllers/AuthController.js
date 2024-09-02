const User = require("../models/User");
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mail = require("../utils/mailSender");
require("dotenv").config();
require("cookie-parser");

exports.sendOTP = async (req,res)=>{
    try{
        const {email} = req.body;

        const checkMail = await User.findOne({email});

        if(checkMail){
            return res.status(401).json({
                success:false,
                message:"User Already Exist"
            })
        }

        var otp = otpGenerator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false,
        })

        let otpCheck = await OTP.findOne({otp:otp});
        
        while(otpCheck){
            otp = otpGenerator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false,
            })
        
            otpCheck = await OTP.findOne({otp:otp});
        }

        const otpPayload = await OTP.create({email,otp}); 

        return res.status(200).json({
            success:true,
            message:"OTP Generated Successfully",
            otpPayload
        })

    } catch(e) {
        console.log("Error in OTP Generation",e);
        return res.status(400).json({
            success:false,
            message:"Error in OTP Generation"
        })
    }
}

exports.signUp = async (req,res)=>{
    try {
        const {firstName,lastName,email,accountType,password,confirmPassword,otp} = req.body;
    
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(401).json({
                success:false,
                message:"All Fields are Required",
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp
            })
        }
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User Already Existed"
            })
        }
        
        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password had not Matched"
            })
        }

        const otpCheck = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        if(otpCheck.length == 0){
            return res.status(401).json({
                success:false,
                message:"OTP has not Generated"
            })
        } else if(otp != otpCheck[0].otp){
            return res.status(401).json({
                success:false,
                message:"Invalid OTP",
                otp,
                otpCheck
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const profileBody = await Profile.create({
            gender:null,
            dateOfBirth:null,
            contactNumber:null,
            about:null
        })

        const userBody = await User.create({
            firstName,
            lastName,
            email,
            accountType,
            password:hashedPassword,
            additionalDetails:profileBody._id,
            image:`https://api.dicebear.com/9.x/pixel-art/svg?seed=${firstName}`
        })

        return res.status(200).json({
            success:true,
            message:"Signed Up",
            userBody
        })
        

    } catch(e) {
        console.log("Error in SignUp:-",e);
        return res.status(400).json({
            success:false,
            message:"Error in SignUp"
        })
    }

}

exports.logIn = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields Required" 
            })
        }
        const user = await User.findOne({email}).populate('additionalDetails');
        if(!user){
            return res.status(403).json({
                success:false,
                message:"User Not Exist" 
            })
        }
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                id:user._id,
                role:user.accountType,
                email:user.email
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h"
            });
            user.token = token;
            user.password=undefined;
            const options ={
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }
            return res.cookie("token",token,options).status(200).json({
                success:true,
                message:"Logged In",
                token,
                user
            }) 
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Password is Incorrect"
            })
        }
    } catch(e) {
        console.log("Error in Log in",e);
        return res.status(400).json({
            success:false,
            message:"Error in Log In"
        })
    }
}

exports.changePassword = async(req,res)=>{
    try{
        const {email,oldPassword,newPassword,confirmPassword} = req.body;
        const user = await User.findOne({email});
        if(await bcrypt.compare(oldPassword,user.password)){
            if(newPassword!==confirmPassword){
                return res.status(403).json({
                    success:false,
                    message:"Password and Confirm Password has not matched"
                })
            }
            const hashedPassword = await bcrypt.hash(newPassword,10);
            const updatedUser = await User.findByIdAndUpdate(user._id,{password:hashedPassword},{new:true});
            const mailResponse = mail(email,"Updation for Password from StudyCenter","Password Changed")
            return res.status(210).json({
                success:true,
                updatedUser,
                message:"Password Changed",
                mailResponse
            })
        }
        else{
            return res.status(400).json({
                success:true,
                message:"Wrong Password"
            })
        }
    }catch(e){
        console.log("Error in Changing Password:-",e);
        return res.status(400).json({
            success:false,
            message:"Error in Changing Password"
        })
    }
}