import React, { useRef } from "react"
import { useSelector } from "react-redux"

// import "video-react/dist/video-react.css"
import { apiConnector } from "../../services/apiConnector"
import toast from "react-hot-toast"

const VideoDetails = () => {
  const playerRef = useRef(null)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const setComplete = async ()=>{
    try{
      const res=await apiConnector("POST", "http://localhost:4000/api/course/courseProgress",{courseId:courseEntireData._id},{Authorization:`Bearer ${token}`});
      if(!res.data.success){
        throw new Error(res.data.message);
      }
      toast.success("Course Completed",{icon:'✅'})
    } catch(e){
      console.log("Error in setComplete:",e)
      toast.error("Error in Course Completion",{icon:'❌'})
    }
  }

  return (
    <div className="flex flex-col gap-5 text-white">
      
        {!courseEntireData ? (
        <img
          src={`${courseEntireData?.thumbnail}`}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <div className="w-[75vw] flex justify-center items-center">
        <video
          ref={playerRef}
          controls
          aspectRatio="16:9"
          playsInline
          onEnded={() => setComplete()}
          src={courseEntireData?.videoUrl}
          className="text-green-500 bg-zinc-800 w-full"
        >
        </video>
          
        </div>
      )}
      
      <h1 className="mt-4 text-3xl font-semibold text-white">{courseEntireData?.courseName}</h1>
      <p className="pt-2 pb-6">{courseEntireData?.courseDescription}</p>
    </div>
  )
}

export default VideoDetails
// video