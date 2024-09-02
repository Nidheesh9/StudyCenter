const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req,res,next)=>{
    try{
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","") ;
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token is missing"
            })
        }
        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            req.user=payload;
        }catch(e){
            console.log("Error in JWT:-",e);
            return res.status(400).json({
                success:false,
                message:"Error in JWT"
            })
        }
        next(); 

    }catch(e){
        console.log("Token is Not Working",e);
        return res.status(400).json({
            success:false,
            message:"Token is Not Working"
        })
    } 
}

exports.isStudent = async(req,res,next)=>{
    try{
        if(req.user.role!=="Student"){
            return res.status(400).json({
                success:false,
                message:"U r not Student"
            })
        }
        next();
    }catch(e){
        console.log("user Role cannot Verified")
        return res.status(400).json({
            success:false,
            message:"User Role cannot Verified"
        })
    }
}

exports.isInstructor = async(req,res,next)=>{
    try{
        if(req.user.role!=="Instructor"){
            return res.status(400).json({
                success:false,
                message:"U r not Instructor"
            })
        }
        next();
    }catch(e){
        console.log("user Role cannot Verified")
        return res.status(400).json({
            success:false,
            message:"User Role cannot Verified"
        })
    }
}

exports.isAdmin = async(req,res,next)=>{
    try{
        if(req.user.role!=="Admin"){
            return res.status(400).json({
                success:false,
                message:"U r not Admin"
            })
        }
        next();
    }catch(e){
        console.log("user Role cannot Verified")
        return res.status(400).json({
            success:false,
            message:"User Role cannot Verified"
        })
    }
}