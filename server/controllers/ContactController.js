const contactData = require("../models/contactData");
const mail = require("../utils/mailSender")

exports.contactData = async(req,res)=>{
    try{
        const {firstname,email,phoneNo,message}=req.body;
        if(!firstname || !email || !phoneNo || !message){
            return res.status(401).json({
                firstname,
                success:false,
                message:"All fields required"
            })
        }
        
        const contact = await contactData.create({firstname,phoneNo,message,email});
        const mailSender = await mail(email,"StudyCenter","Your Contact Message is received");
        return res.status(200).json({
            success:true,
            message:"message sent"
            ,contact
        })
    }catch(e){ 
        console.log("Error in Contacting:-",e)
        return res.status(400).json({
            success:false,
            message:"Error in Contacting"
        })
    }
}