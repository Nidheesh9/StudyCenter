const Course = require("../models/Course");
const Section = require("../models/Section");


exports.createSection = async (req,res)=>{
    try{
        const {name,courseId} = req.body;
        if(!name || !courseId){
            return res.status(500).json({
                success:false,
                message:"All fields required"
            })
        }
        const section = await Section.create({name});
        await Course.findByIdAndUpdate(courseId,{$push:{courseSection:section._id}},{new:true});
        return res.status(200).json({
            success:true,
            message:"Section Created"
        })
    } catch (e) {
        console.log("Error in Section Creation:-",e);
        return res.status(401).json({
            success:false,
            message:"Error in Section Creation"
        })
    }
}

exports.updateSection = async(req,res)=>{
    try{
        const {name,sectionId} = req.body;
        if(!name || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields required"
            })
        }
        await Section.findByIdAndUpdate(sectionId,{name},{new:true});
        return res.status(200).json({
            success:true,
            message:"Section Updated"
        })
    }catch(e){
        console.log("Section not updatded:-",e)
        return res.status(400).json({
            success:false,
            message:"Section not updated"
        })
    }
}

exports.deleteSection=async(req,res)=>{
    try{
        const {courseId,sectionId} = req.body;
        if(!courseId || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields Required"
            })
        }
        await Section.findByIdAndDelete(sectionId);
        const course=await Course.findByIdAndUpdate(courseId,{$pull:{courseSection:sectionId}},{new:true});
        return res.status(200).json({
            success:true,
            message:"Section Deleted",
            course
        })
    } catch (e) {
        console.log("Section not deleted:-",e)
        return res.status(400).json({
            success:false,
            message:"Section not deleted"
        })
    }
}