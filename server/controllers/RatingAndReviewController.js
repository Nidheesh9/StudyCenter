const mongoose = require("mongoose");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");
const User = require("../models/User");


exports.createRatingAndReview = async(req,res)=>{
    try{
        const userId = req.user.id;
        const {rating,review,courseId}=req.body;
        console.log("Before")
        if(!rating||!review||!courseId){
            return res.json({
                success:false,
                message:"All fields required"
            })
        }
        console.log("mid")
        const course = await Course.findOne({_id:courseId,studentEnrolled:{$elemMatch:{$eq:userId}}});
        if(!course){
            return res.status(400).json({
                success:false,
                message:"Student not enrolled"
            })
        }
        const alreadyGiven = await RatingAndReview.find({user:userId,course:courseId});
        console.log("after")
        if(alreadyGiven.length!=0){
            return res.status(400).json({
                success:false,
                message:"Review and Rating already given"
            }) 
        }

        const ratingDetails = await RatingAndReview.create({user:userId,course:courseId,rating,review});

        await Course.findByIdAndUpdate({_id:courseId},{$push:{ratingAndReview:ratingDetails._id}});

        return res.status(200).json({
            success:true,
            message:"Rating and Review given",
            ratingDetails
        })

    }catch(e){
        console.log("Rating not Created:-",e)
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

exports.getAverageRating = async(req,res)=>{
    try{
        const {courseId} = req.body;
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Course Id not found",
            })
        }
        const result = await RatingAndReview.aggregate([
                                                {
                                                    $match:{
                                                        course: new mongoose.Types.ObjectId(courseId),
                                                    }
                                                },
                                                {
                                                    $group:{
                                                        _id:null,
                                                        averageRating:{$avg:"$rating"}
                                                    }
                                                }
                                            ]);
        if(result.length()>0){
            return res.status(200).json({
                success:true,
                message:"Average Rating",
                averageRating:result[0].averageRating,
            })
        }
        return res.status(200).json({
            success:true,
            message:"Average Rating is 0"
        })
    }catch(e){
        console.log("Error in Average rating:",e)
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

exports.getAllRating = async (req,res)=>{
    try{
        const allRating = await RatingAndReview.find({}).sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstName lastName email image"
        }).populate({
            path:"course",
            select:"courseName"
        }).exec();
        
        return res.status(200).json({
            success:true,
            message:"All rating",
            data:allRating
        })
    }catch(e){
        console.log("Error in all ratings:",e)
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}