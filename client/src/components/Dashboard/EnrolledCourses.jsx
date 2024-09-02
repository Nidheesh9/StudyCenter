import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../services/operations/profileAPI"
import { apiConnector } from "../../services/apiConnector"
import toast from "react-hot-toast"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserEnrolledCourses(token); // Getting all the published and the drafted courses

        // console.log("Enrolled:",enrolledCourses)
        // Filtering the published course out
        const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
        // console.log(
        //   "Viewing all the couse that is Published",
        //   filterPublishCourse
        // )
        setEnrolledCourses(filterPublishCourse)
      } catch (error) {
        console.log("Could not fetch enrolled courses.")
      }
    })();
    userDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const userDetail = async ()=>{
    try{
      const res = await apiConnector("GET","https://studycenter-backend.onrender.com/api/profile/getUserProfile",null,{Authorization:`Bearer ${token}`});
      if(!res.data.success){
        throw new Error(res.data.message);
      }
      setProgress(res.data.details.courseProgress);
    }catch(e){
      toast.error("Error in finding user details",{icon:'❌'})
    }
  }
  
  return (
    <>
      <div className="text-3xl text-gray-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-gray-100">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8 text-white">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-zinc-700 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Completed</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
          
            <div
              className={`flex items-center border border-gray-700 bg-slate-950 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-gray-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course?.duration}s</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>
                {progress.includes(course._id)?("Yes"):("No")}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
