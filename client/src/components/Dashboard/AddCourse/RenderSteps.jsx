
// import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
// import PublishCourse from "./PublishCourse"

export default function RenderSteps() {

  return (
    <>
      <div className="relative flex w-full justify-center">
        
      {<CourseInformationForm />}
      {/* Render specific component based on current step */}
      {/* {step === 2 && <CourseBuilderForm />} */}
      {/* {step === 3 && <PublishCourse />} */}
      </div>
    </>
  )
}
