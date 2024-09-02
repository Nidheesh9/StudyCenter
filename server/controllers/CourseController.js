const Course = require("../models/Course");
const Tag = require("../models/Tag");
const User = require("../models/User");
const { saveOnCloud } = require("../utils/cloudinary");
const mail = require('../utils/mailSender');


exports.createCourse = async (req,res) => {
    try{
        const {name,description,whatWillYouLearn,price,tag,instructions} = req.body;
        const thumbnail = req.files.thumbnailImage;
        const video = req.files.courseVideo;
        if(!name || !description || !whatWillYouLearn || !price || !tag || !instructions){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const instructorId = req.user.id;
        const tagDetail = await Tag.findById(tag);
        if(!tagDetail){
            return res.status(401).json({
                success:false,
                message:"Tag not found"
            })
        }
        const cloudImage = await saveOnCloud(thumbnail,process.env.CLOUD_FOLDER);
        const cloudVideo = await saveOnCloud(video,process.env.CLOUD_FOLDER);
        const newCourse = await Course.create({
            courseName:name,
            courseDescription:description,
            instructor:instructorId,
            price:price,
            whatYouWillLearn:whatWillYouLearn,
            tag:tagDetail._id,
            thumbnail:cloudImage.secure_url,
            videoUrl:cloudVideo.secure_url,
            duration:cloudVideo.duration,
            instructions:JSON.parse(instructions),
            createdAt:Date.now(),
            // status:status,
        })
        await Tag.findByIdAndUpdate({_id:tagDetail._id},{$push:{courses:newCourse._id}},{new:true});
        await User.findByIdAndUpdate({_id:instructorId},{$push:{courses:newCourse._id}},{new:true});
        return res.status(200).json({
            success:true,
            message:"Course has been Created",
            data:newCourse,
            cloudVideo
        })
    }catch(e){
        console.log("Course not Created:-",e)
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

exports.editCourse = async (req,res)=>{
    try{
        const {name="",description="",whatWillYouLearn="",price="",tag="",instructions="",courseId} = req.body;
        const thumbnail = req?.files?.thumbnailImage ?? null;
        const video = req?.files?.courseVideo ?? null;
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Course Id not found"
            })
        }
        const instructorId = req.user.id;
        const course = await Course.findById(courseId);
        const tagDetail = await Tag.findById(tag);
        if(!tagDetail){
            return res.status(401).json({
                success:false,
                message:"Tag not found"
            })
        }
        if(course.tag!==tagDetail._id){
            await Tag.findByIdAndUpdate({_id:course.tag},{$pull:{courses:courseId}},{new:true});
            await Tag.findByIdAndUpdate({_id:tagDetail._id},{$push:{courses:courseId}},{new:true});
        }
        if(thumbnail) {
            const cloudImage = await saveOnCloud(thumbnail,process.env.CLOUD_FOLDER);
            await Course.findByIdAndUpdate({_id:courseId},{thumbnail:cloudImage.secure_url},{new:true});
        }
        if(video) {
            const cloudVideo = await saveOnCloud(video,process.env.CLOUD_FOLDER);
            await Course.findByIdAndUpdate({_id:courseId},{video:cloudVideo.secure_url},{new:true});
        }
        const editedCourse = await Course.findByIdAndUpdate({_id:courseId},{
            courseName:name,
            courseDescription:description,
            instructor:instructorId,
            price:price,
            whatYouWillLearn:whatWillYouLearn,
            tag:tagDetail._id,
            instructions:JSON.parse(instructions),
            // status:status,
        },{new:true});
        return res.status(200).json({
            success:true,
            message:"Course has updated",
            data:editedCourse,
        })
    }catch(e){
        console.log("Error in course Updation:-",e);
        return res.status(400).json({
            success:false,
            message:"Course has not updated",
            req:req.files,
        })
    }
}

exports.getAllCourses = async(req,res)=>{
    try{
        //TODO
        const courses = await Course.find({});
        return res.status(200).json({
            success:true,
            message:"All Courses have Fetched",
            courses
        })
    }catch(e){
        console.log("Error in Fetching All courses:-",e)
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

exports.getOneCourseDetail = async (req,res)=>{
    try{
        const courseId = req.body.courseId;
        if(!courseId){
            return res.status(404).json({
                success:false,
                message:"CourseId not found",
            })
        }
        const courseDetails = await Course.findById(courseId).populate("ratingAndReview").populate("tag").populate({
                                                                                                            path:"instructor",
                                                                                                            populate:{
                                                                                                                path:"additionalDetails"
                                                                                                            }
                                                                                                        })
                                                                                                        .populate('instructions')
                                                                                                        // .populate({
                                                                                                        //     path:"courseSection",
                                                                                                        //     populate:{
                                                                                                        //         path:"subSection"
                                                                                                        //     }
                                                                                                        // })
                                                                                                        .exec();
        if(!courseDetails){
            return res.status(403).json({
                success:false,
                message:"Course details not found",
            })
        }                                                                                                
        return res.status(200).json({
            success:true,
            message:"One Course Details Fetched",
            courseDetails:courseDetails
        })
    }catch(e){
        console.log("Error in Getting One Course Details:",e);
        return res.status(404).json({
            success:false,
            message:"Error in Getting One Course Details:",
        })
    }
}

exports.getInstructorCourses = async(req,res)=>{
    try{
        const instructorId = req.user.id;
        const courses = await Course.find({instructor:instructorId});
        return res.status(200).json({
            success:true,
            message:"Instructor Courses Fetched",
            data:courses,
        }) 
    }catch (e){
        console.log("Error in getting instructor courses:-",e);
        return res.status(404).json({
            success:false,
            message:e.message
        })
    }
}

exports.deleteCourse = async (req,res)=>{
    try{
        const {courseId} = req.body;
        const userId = req.user.id;
        if(!courseId || !userId){
            return res.status(400).json({
                success:false,
                message:"Course Id not found"
            })
        }
        const course = Course.findById({_id:courseId});
        await User.findByIdAndUpdate({_id:userId},{$pull:{courses:courseId}},{new:true});
        for(let student in course.studentEnrolled){
                await User.findByIdAndUpdate({_id:student},{$pull:{courses:courseId}},{new:true});
        }
        await Course.findByIdAndDelete({_id:courseId});
        return res.status(200).json({
            success:true,
            message:"Course has Deleted"
        })
    }catch(e){
        console.log("Error in Deleting Course:-",e)
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

exports.enrollStudent = async (req,res)=>{
    try{
        const {coursesId}=req.body;
        const userId = req.user.id;
        if(coursesId.length==0 || !userId){
            return res.status(403).json({
                success:false,
                message:"All fields required"  
            })
        }
        for(const courseId of coursesId){
            const course = await Course.findById({_id:courseId});
            const user = await User.findById({_id:userId});
            if(!course || !user){
                return res.status(404).json({
                    success:false,
                    message:"Course and User undefined"
                })
                
            }
            if(user.courses.includes(course._id)){
                return res.status(405).json({
                    message:"Already Enrolled",
                    success:false
                } 
                )
            }
            await Course.findByIdAndUpdate(course._id,{$push:{studentEnrolled:user._id}},{new:true});
            await User.findByIdAndUpdate(user._id,{$push:{courses:course._id}},{new:true});
            await mail(user.email,"StudyCenter",`You are enrollerd in ${course.name} course`); 
        }
        return res.status(200).json({
            success:true,
            message:"Student Enrolled"
        })
    }catch(e){
        console.log("Error in enrolling students:",e);
        return res.status(401).json({
            success:false,
            message:e.message
        })
    }
}

exports.courseProgress = async (req,res)=>{
    try{
        const {courseId}=req.body;
        const userId = req.user.id;
        if(!courseId || !userId){
            return res.status(403).json({
                success:false,
                message:"All fields required"  
            })
        }

        await User.findByIdAndUpdate({_id:userId},{$push:{courseProgress:courseId}},{new:true});
        
        return res.status(200).json({
            success:true,
            message:"Course Completed"
        })
    }catch(e){
        console.log("Error in course progress:",e);
        return res.status(401).json({
            success:false,
            message:e.message
        })
    }
}


 

 
 