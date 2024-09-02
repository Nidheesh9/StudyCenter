import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../services/operations/authAPI"
import Tab from "../Tab"
import { ACCOUNT_TYPE } from "../../utils/constants"

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  const [accountType,setAccountType] = useState("Student");

    // data to pass to Tab component
    const tabData = [
      {
        id: 1,
        tabName: "Student",
        type: ACCOUNT_TYPE.STUDENT,
      },
      {
        id: 2,
        tabName: "Instructor",
        type: ACCOUNT_TYPE.INSTRUCTOR,
      },
    ]

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4 overflow-y-hidden"
    >
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-300">
          Email Address <sup className="text-pink-500">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full rounded-lg bg-gray-800 p-3 text-[16px] leading-[24px] text-gray-100 placeholder:text-gray-400 focus:outline-none"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-300">
          Password <sup className="text-pink-500">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="w-full rounded-lg bg-gray-800 p-3 text-[16px] leading-[24px] text-gray-100 placeholder:text-gray-400 focus:outline-none focus:bg-gray-800 !pr-10"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-400">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-red-600 py-[8px] px-[12px] text-white font-medium"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm
