import React from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'
import Button from './Button'
import HighlightText from './HighlightText'
import Instructor from '../../assets/Images/Instructor.png'

const InstructorSection = () => {
  return (
    <div>
      <div className="flex flex-col-reverse lg:flex-row gap-20 items-center justify-evenly ">
          <div className="lg:w-[50%] shadow-white shadow-[-20px_-20px_0_0] sm:mt-10 sm:ml-10">
            <img
              src={Instructor}
              alt=""
              className="shadow-white shadow-[-20px_-20px_0_0]"
            />
          </div>
          <div className="lg:w-[45%] flex gap-10 flex-col w-[55vw]">
            <h1 className="lg:w-[50%] text-4xl font-semibold ">
              Become an
              <HighlightText text={"instructor"} />
            </h1>

            <p className="font-medium text-[16px] text-justify w-[90%] text-gray-300">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>

            <div className="w-fit">
              <Button bool={true} link={"/signup"}>
                <div className="flex items-center gap-3">
                  Start Teaching Today
                  <FaArrowCircleRight />
                </div>
              </Button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default InstructorSection;
