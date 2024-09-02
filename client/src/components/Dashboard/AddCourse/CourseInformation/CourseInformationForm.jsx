import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../services/operations/courseDetailsAPI"

import { setCourse } from "../../../../slices/courseSlice"
// import { COURSE_STATUS } from "../../../../utils/constants"

import IconBtn from "../../../IconBtn"
// import Upload from "../Upload"
// import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementsField"
import { useNavigate } from "react-router-dom"

export default function CourseInformationForm() {
  // const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])
  const [req,setReq] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      // console.log("categories", categories)
      if (categories?.length > 0) {
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editCourse) {
      console.log("One Course:",course)
      setReq(false);
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseBenefits", course.whatYouWillLearn)
      console.log("Tag Name:",course.tag.name);
      setValue("courseCategory", course.tag._id);
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
      setValue("courseVideo", course.videoUrl)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)

    if (editCourse) {
      if (true) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        formData.append("thumbnailImage", false);
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage[0])
        }
        formData.append("courseVideo", false);
        if (currentValues.courseVideo !== course.videoUrl) {
          formData.append("courseVideo", data.courseVideo[0])
        }
        formData.append("name", data.courseTitle)
        formData.append("description", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("whatWillYouLearn", data.courseBenefits)
        console.log("Category:",data.courseCategory);
        formData.append("tag", data.courseCategory)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          // dispatch(setStep(2))
          dispatch(setCourse(result))
          navigate('/dashboard/my-courses');
        }
      }
      return
    }

    const formData = new FormData()
    formData.append("name", data.courseTitle)
    formData.append("description", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("whatWillYouLearn", data.courseBenefits)
    formData.append("tag", data.courseCategory)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("courseVideo", data.courseVideo[0])
    formData.append("thumbnailImage", data.courseImage[0])
    setLoading(true)
    const result = await addCourseDetails(formData, token);
    console.log("Course details:-",result);
    if (result) {
      // dispatch(setStep(2))
      dispatch(setCourse(result))
      navigate('/dashboard/my-courses');
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-gray-700 bg-zinc-800 p-6 w-full"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-white" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="rounded-lg bg-black p-3 text-[16px] leading-[24px] text-gray-100 placeholder:text-gray-400 focus:outline-none w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>

      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-white" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="rounded-lg bg-black p-3 text-[16px] leading-[24px] text-gray-100 placeholder:text-gray-400 focus:outline-none resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>

      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-white" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className=" rounded-lg bg-black p-3 text-[16px] leading-[24px] text-gray-100 placeholder:text-gray-400 focus:outline-none w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-gray-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>

      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-white" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className=" rounded-lg bg-black p-3 text-[16px] leading-[24px] text-gray-100 placeholder:text-gray-400 focus:outline-none w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>

      {/* Course Thumbnail Image */}
      <div className="flex gap-3 flex-col">
              <label className="text-white text-sm" htmlFor="courseImage">Add Thumbnail <span className="text-pink-200">*</span> </label>
              <div className="">
              <input
                type="file"
                placeholder="Add Image"
                // ref={fileInputRef}
                className="rounded-lg bg-black p-3 text-[16px] leading-[24px] text-gray-100
                 placeholder:text-gray-400 focus:outline-none w-full file:bg-zinc-800 file:text-white 
                 file:outline-none file:rounded-md file:border-0 file:mr-[5rem] hover:file:bg-zinc-600 "
                accept=""
                {...register("courseImage",{required:req})}
              />
              {errors.courseImage && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Thumbnail is required
                </span>
              )}
            </div>
      </div>
      

      {/* Add Video */}
      <div className="flex gap-3 flex-col">
              <label className="text-white text-sm">Add Video <span className="text-pink-200">*</span> </label>
              <div className="">
              <input
                type="file"
                // ref={fileInputRef}
                className="rounded-lg bg-black p-3 text-[16px] leading-[24px] text-gray-100
                 placeholder:text-gray-400 focus:outline-none w-full file:bg-zinc-800 file:text-white 
                 file:outline-none file:rounded-md file:border-0 file:mr-[5rem] hover:file:bg-zinc-600 "
                accept=""
                {...register("courseVideo",{required:req})}
              />
              {errors.courseVideo && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Course video is required
                </span>
              )}
            </div>
      </div>

      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-white" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className=" rounded-lg bg-black p-3 text-[16px] leading-[24px] text-gray-100 placeholder:text-gray-400 focus:outline-none resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>

      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {/* {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-gray-300 py-[8px] px-[20px] font-semibold text-gray-900`}
          >
            Continue Wihout Saving
          </button>
        )} */}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Publish" : "Save Changes"} type="submit" 
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}
