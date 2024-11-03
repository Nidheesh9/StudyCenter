const cors = require("cors");
const express = require("express");
const db = require("./config/database");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const fileUpload = require("express-fileupload");
const {cloudinary} = require("./config/cloudinary");
const courseRoute = require("./routes/courseRoute");
const profileRoute = require("./routes/profileRoute");
const { contactData } = require("./controllers/ContactController");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;
db.connect();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:"https://studycenter-frontend.onrender.com",
    credentials:true,
}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))
cloudinary();

app.use("/api/user",userRoute);
app.use("/api/profile",profileRoute);
app.use("/api/course",courseRoute);
app.use("/api/contact",contactData);

app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"Your server is running"
    })
})
app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`)
})
