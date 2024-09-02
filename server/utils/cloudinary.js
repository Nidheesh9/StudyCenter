const cloudinary = require("cloudinary").v2;

exports.saveOnCloud = async(file,folder,height,quality)=>{
    const option = {folder};
    if(height){
        option.height = height;
    }
    if(quality){
        option.height = height;
    }
    option.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,option);
}

