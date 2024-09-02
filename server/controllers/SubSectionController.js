const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { saveOnCloud } = require("../utils/cloudinary");

exports.createSubSection = async (req,res)=>{
    try{
        const {title,description,sectionId} = req.body;
        const video = req.files.video;
        if(!title || !description || !video || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields required"
            })
        }
        const videoLink = await saveOnCloud(video,process.env.CLOUD_FOLDER);
        const timeDuration=videoLink.duration;
        const subsection = await SubSection.create({title,timeDuration,description,videoUrl:videoLink.secure_url});
        await Section.findByIdAndUpdate(sectionId,{$push:{subSection:subsection._id}},{new:true});
        return res.status(200).json({
            success:true,
            message:"Subsection Created",
            subsection,
        })
        
    }catch(e){
        console.log("Subsection not created:-",e);
        return res.status(400).json({
            success:false,
            message:"Subsection not created"
        })
    }
}

exports.updateSubSection = async(req,res)=>{
    try{
        const {title="",description="",subSectionId} = req.body;
        const video = req.files.video;
        if(!subSectionId || !video){
            return res.status(400).json({
                success:false,
                message:"All fields required"
            })
        }
        const videoLink = await saveOnCloud(video,process.env.CLOUD_FOLDER);
        await SubSection.findByIdAndUpdate(subSectionId,{title,timeDuration:videoLink.duration,description,videoUrl:videoLink.secure_url},{new:true});
        return res.status(200).json({
            success:true,
            message:"SubSection Updated"
        })
    }catch(e){
        console.log("SubSection not updatded:-",e)
        return res.status(400).json({
            success:false,
            message:"SubSection not updated"
        })
    }
}

exports.deleteSubSection=async(req,res)=>{
    try{
        const {sectionId,subSectionIdsectionId} = req.params;
        if(!courseId || !subSectionIdsectionId){
            return res.status(400).json({
                success:false,
                message:"All fields Required"
            })
        }
        await SubSection.findByIdAndDelete(subSectionIdsectionId);
        const section=await Section.findByIdAndUpdate(sectionId,{$pull:{subSection:subSectionIdsectionId}},{new:true});
        return res.status(200).json({
            success:true,
            message:"SubSection Deleted",
            section
        })
    } catch (e) {
        console.log("SubSection not deleted:-",e)
        return res.status(400).json({
            success:false,
            message:"SubSection not deleted"
        })
    }
}