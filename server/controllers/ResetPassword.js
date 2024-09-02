const User = require("../models/User");
const mail = require("../utils/mailSender");
const bcrypt = require("bcrypt");


exports.resetPasswordToken = async (req,res)=>{
    try{
        const email = req.body.email;
        const validEmail = await User.findOne({email:email});
        if(!validEmail){
            return res.status(400).json({
                success:false,
                message:"No Email Found"
            })
        }
        const token = crypto.randomUUID();
        const user = await User.findOneAndUpdate({email:email},{token:token,resetTime:Date.now()+(5*60*1000)},{new:true});
        const url = `http://localhost:3000/reset-password/${token}`;
        await mail(email,"Password Reset",`Password Reset Link :- ${url}`);
        return res.status(200).json({
            success:true,
            message:"Email Sent Successfully",
            user
        })


    } catch(e){
        console.log("Error in Reset Password Token:-",e)
        return res.status(500).json({
            success:false,
            message:"Reset Token not Generated"
        })
    }
}

exports.resetPassword = async (req,res)=>{
    try{
        const {password,confirmPassword,token} = req.body;
        const userToken = await User.findOne({token:token});
        if(!userToken){
            return res.status(400).json({
                success:false,
                message:"Token is Invalid"
            })
        }
        if(Date.now()>userToken.resetTime){
            return res.status(401).json({
                success:false,
                message:"Token is Expired"
            })
        }
        if(password!==confirmPassword){
            return res.status(402).json({
                success:false,
                message:"Password and Confirm Password is not matching"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});
        return res.status(200).json({
            success:true,
            message:"Password Reset Successfully"
        })
    }catch(e){
        console.log("Error in Reseting Password:-",e)
        return res.status(403).json({
            success:false,
            message:"Error in Reseting Password"
        })
    }
}