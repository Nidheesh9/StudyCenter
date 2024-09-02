import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "./../IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    totalNoOfLectures,
    completedLectures,
    courseEntireData,
  } = useSelector((state) => state.viewCourse)

  // useEffect(() => {
  //   ;(() => {
  //     if (!courseSectionData.length) return
  //     const currentSectionIndx = courseSectionData.findIndex(
  //       (data) => data._id === sectionId
  //     )
  //     const currentSubSectionIndx = courseSectionData?.[
  //       currentSectionIndx
  //     ]?.subSection.findIndex((data) => data._id === subSectionId)
  //     const activeSubSectionId =
  //       courseSectionData[currentSectionIndx]?.subSection?.[
  //         currentSubSectionIndx
  //       ]?._id
  //     setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
  //     setVideoBarActive(activeSubSectionId)
  //   })()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[20vw] max-w-[350px] flex-col border-r-[1px] border-r-gray-700 bg-zinc-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-gray-600 py-5 text-lg font-bold text-gray-100">
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-gray-100 p-1 text-gray-900 hover:scale-90 overflow-hidden"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p><br/>
            <p className="text-sm text-gray-500 flex">
              {/* {completedLectures?.length} / {totalNoOfLectures} */}
              <div className="font-light">Description:
                <div className="text-white">{courseEntireData?.courseDescription}</div>
              </div>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
