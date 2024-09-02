const mongoose = require("mongoose");
require("dotenv").config();
exports.connect = ()=>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("DB Connected"))
    .catch((e)=>{
        console.log("Erron in DB:-",e);
        process.exit(1);
    })
}