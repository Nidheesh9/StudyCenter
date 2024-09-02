import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { logout } from "../../services/operations/authAPI"
import { useState } from "react"
import ConfirmationModal from "../ConfirmationModal"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const [confirmationModal,setConfirmationModal]=useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // if (!user) return null

  return (
    <button className="group group-hover:flex ">
      <div className="flex items-center gap-x-1 group">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-gray-100" />
      </div>
        <div
          className="hidden group-hover:block absolute top-10 z-[1000] divide-gray-800 overflow-hidden rounded-md border-[1px] border-gray-800 bg-zinc-900"
          // ref={ref}
        >
          <Link to="/dashboard/my-profile">
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-gray-300 hover:bg-zinc-600">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
           onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-gray-300 hover:bg-zinc-600"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </button>
  )
}
