const express = require("express");
const { updateProfile, getDetailsOfUser, deleteProfile, updateProfilePicture, getEnrollCourses, changePassword, instructorDashboard } = require("../controllers/ProfileController");
const { auth, isInstructor } = require("../middlewares/auth");
const router = express.Router();

router.put("/updateProfile",auth,updateProfile);
router.get("/getUserProfile",auth,getDetailsOfUser);
router.delete("/deleteProfile",auth,deleteProfile);
router.put("/updateDisplayPicture",auth,updateProfilePicture);
router.get("/getEnrolledCourses",auth,getEnrollCourses);
router.post("/changePassword",auth,changePassword);
router.get("/instructorDashboard",auth,isInstructor,instructorDashboard);


module.exports = router;