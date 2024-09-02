const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { saveOnCloud } = require("../utils/cloudinary");
require("dotenv").config();
const bcrypt = require('bcrypt');


exports.updateProfile = async (req,res)=>{
    try{
        const {gender="",dateOfBirth="",about="",contactNumber="",firstName="",lastName=""} = req.body;
        const userId = req.user.id;
        if(!gender || !dateOfBirth || !about || !contactNumber || !userId || !firstName || !lastName){
            return res.status(400).json({
                success:false,
                message:"All Fields Required"
            })
        }
        const userDetails = await User.findByIdAndUpdate(userId,{firstName,lastName});
        const updatedUserDetails=await Profile.findByIdAndUpdate({_id:userDetails.additionalDetails},{gender,dateOfBirth,about,contactNumber},{new:true});
        const dataUser = await User.findById(userId).populate('additionalDetails');
        return res.status(200).json({
            success:true,
            message:"Profile Updated",
            updatedUserDetails:dataUser,
        });
    }catch(e){
        console.log('Error in Profile Updation:-',e);
        return res.status(400).json({
            success:false,
            message:"Error in Profile Updation"
        });
    }
}

exports.deleteProfile = async(req,res)=>{
    try{
        const userId = req.user.id;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"ID not found"
            })
        }
        const user = await User.findById(userId);
        await Profile.findByIdAndDelete({_id:user.additionalDetails});
        
        await User.findByIdAndDelete(userId);
        return res.status(200).json({
            success:true,
            message:"Profile Deleted"
        })
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"Error in Profile Deletion"
        });
    }
}

exports.getDetailsOfUser = async (req,res)=>{
    try{
        const userId = req.user.id;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"ID not found"
            })
        }
        const details = await User.findById(userId).populate("additionalDetails").exec();
        return res.status(200).json({
            success:true,
            message:"Profile Details",
            details
        }) 
    } catch (e) {
        console.log("Profile details not fetched:-",e);
        return res.status(400).json({
            success:false,
            message:"Profile details not fetched"
        })
    }
}

exports.updateProfilePicture = async (req,res)=>{
    try{
        const image = req.files.profilePicture;
        const userId = req.user.id;
        const url = await saveOnCloud(image,process.env.CLOUD_FOLDER,1000,1000);
        const update = await User.findByIdAndUpdate({_id:userId},{image:url.secure_url},{new:true});
        return res.status(200).json({
            success:true,
            message:"Profile Picture Updated",
            data:update,
        })
    }catch(e){
        console.log("Error in Profile Updation:",e)
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

exports.getEnrollCourses = async (req,res)=>{
    try{
        const userId = req.user.id;
        const userCourse = await User.findOne({_id:userId}).populate('courses').exec();
        if(!userCourse){
            return res.status(400).json({
                success:false,
                message:"User id not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Enroll Courses found",
            data:userCourse.courses,
        })
    }catch(e){
        console.log("Error in finding enroll courses:-",e);
        return res.status(400).json({
            success:false,
            message:e.message,
        })
    }
}

exports.changePassword = async(req,res)=>{
    try{
        const {oldPassword,newPassword} = req.body;
        if(!oldPassword || !newPassword){
            return res.status(402).json({
                success:false,
                message:"All fields required"
            })
        }
        const userId = req.user.id;
        const user = await User.findOne({_id:userId});
        if(await bcrypt.compare(oldPassword,user.password)){
            const hashedPassword = await bcrypt.hash(newPassword,10);
            const updatedUser = await User.findByIdAndUpdate(user._id,{password:hashedPassword},{new:true});
            return res.status(210).json({
                success:true,
                updatedUser,
                message:"Password Changed"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Wrong Password",
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

exports.instructorDashboard = async (req, res) => {
    try {
      const courseDetails = await Course.find({ instructor: req.user.id })
  
      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.studentEnrolled.length
        const totalAmountGenerated = totalStudentsEnrolled * course.price
  
        // Create a new object with the additional fields
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          // Include other course properties as needed
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
  
        return courseDataWithStats
      })
  
      res.status(200).json({ courses: courseData })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server Error" })
    }
  }