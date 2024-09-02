const express = require("express");
const { auth, isInstructor, isAdmin, isStudent } = require("../middlewares/auth");
const { createCourse, getAllCourses, getOneCourseDetail, getInstructorCourses, deleteCourse, editCourse, enrollStudent, courseProgress } = require("../controllers/CourseController");
const { createSection, updateSection, deleteSection } = require("../controllers/SectionController");
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/SubSectionController");
const { createTag, tagPageDetail, getAllTags } = require("../controllers/TagController");
const { createRatingAndReview, getAllRating, getAverageRating } = require("../controllers/RatingAndReviewController");
const router = express.Router();

router.post("/createCourse",auth,isInstructor,createCourse);
router.get("/getAllCourses",getAllCourses);
router.post("/getFullCourseDetails",getOneCourseDetail);
router.post("/editCourse",auth,isInstructor,editCourse)
router.delete("/deleteCourse",auth,isInstructor,deleteCourse);

router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses);

router.post("/enrollStudent",auth,isStudent,enrollStudent);

router.post("/courseProgress",auth,isStudent,courseProgress);

router.post("/addSection",auth,isInstructor,createSection);
router.put("/updateSection",auth,isInstructor,updateSection);
router.delete("/deleteSection",auth,isInstructor,deleteSection);

router.post("/addSubSection",auth,isInstructor,createSubSection);
router.put("/updateSubSection",auth,isInstructor,updateSubSection);
router.delete("/deleteSubSection",auth,isInstructor,deleteSubSection);

router.post("/createTag",auth,isAdmin,createTag);
router.post("/tagPageDetailds",tagPageDetail);
router.get("/getAllTags",getAllTags);

router.post("/createRating",auth,isStudent,createRatingAndReview);
router.get("/getReviews",getAllRating);
router.get("/getAverageRating",getAverageRating)

module.exports = router;

