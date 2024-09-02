import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import GetAvgRating from "../../utils/avgRating"
import RatingStars from "../RatingStars"

function Course_Card({ course, Height }) {
  // const avgReviewCount = GetAvgRating(course.ratingAndReviews)
  // console.log(course.ratingAndReviews)
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReview)
    setAvgReviewCount(count);
  }, [course])
  // console.log("count............", avgReviewCount)

  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className=" bg-zinc-700 rounded-lg  border-2 border-red-800">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-white">{course?.courseName}</p>
            <p className="text-sm text-red-50">Instructor: {" "}
              { course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-100">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-gray-400">
                {course?.ratingAndReview?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-yellow-400">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Course_Card
