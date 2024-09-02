const Tag = require("../models/Tag");


exports.createTag = async (req,res)=>{
    try{
        const {name,description} = req.body;
        if(!name || !description){
            return 
        }
        const tag = await Tag.create({name:name,description:description});
        return res.status(200).json({
            success:true,
            message:"Tag Created",
            tag
        })
    } catch(e){
        console.log("Error in TAG:-",e);
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

exports.getAllTags = async (req,res)=>{
    try{
        const allTags = await Tag.find({},{name:true,description:true}).populate({
            path:'courses',
            populate:{
                path:'instructor',
                // path:'ratingAndReview'
            },
        }).populate({
            path:'courses',
            populate:{
                // path:'instructor',
                path:'ratingAndReview'
            },
        });
        return res.status(200).json({
            success:true,
            message:"All Tags",
            data:allTags
        })
    }catch(e){
        console.log("Error in Getting All Tags:",e);
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

exports.tagPageDetail = async (req,res)=>{
    try{
        const {tagId} = req.body;
        const allDetails = await Tag.findById({_id:tagId}).populate("courses").exec();
        const extraDetails = await Tag.find({_id:{$ne:tagId}}).populate("courses").exec();
        // Top selling courses
        return res.status(200).json({
            success:true,
            message:"Page Details Fetched Successfully",
            allDetails,
            extraDetails
        })
    }catch(e){
        console.log("Error in Getting Tag Page:",e);
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}