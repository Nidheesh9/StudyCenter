import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchInstructorCourses } from "../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../services/operations/profileAPI"
import InstructorChart from "./InstructorDashboard/InstructorChart"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      console.log(instructorApiData)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  )

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  )

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-blue-800">
          Hi {user?.firstName} 👋
        </h1>
        <p className="font-medium text-gray-200">
          Let's start something new
        </p>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div>
          <div className="my-4 flex h-[450px] space-x-4 justify-between">
            {/* Render chart / graph */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <div className="w-full h-full"><InstructorChart courses={instructorData} /></div>
            ) : (
              <div className="flex-1 rounded-md bg-zinc-800 p-6">
                <p className="text-lg font-bold text-pink-600">Visualize</p>
                <p className="mt-4 text-xl font-medium text-pink-600">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
            {/* Total Statistics */}
            <div className="flex min-w-[250px] flex-col rounded-md bg-zinc-800 p-6">
              <p className="text-lg font-bold text-pink-600">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-gray-200">Total Courses</p>
                  <p className="text-3xl font-semibold text-pink-600">
                    {courses.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-gray-200">Total Students</p>
                  <p className="text-3xl font-semibold text-pink-600">
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-gray-200">Total Income</p>
                  <p className="text-3xl font-semibold text-pink-600">
                    Rs. {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-gray-800 p-6 py-20">
          <p className="text-center text-2xl font-bold text-pink-600">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}
