import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import { NavbarLinks } from "../data/navbar-links"
import HighlightText from "./Homepage/HighlightText"
import ProfileDropdown from "./Auth/ProfileDropdown"

    function Navbar() {
      const { token } = useSelector((state) => state.auth)
      const { user } = useSelector((state) => state.profile)
      const { totalItems } = useSelector((state) => state.cart)
      const location = useLocation()

      const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
      }

      return (
        <div
          className={`flex items-center justify-center border-b-[1px] border-b-gray-800 ${location.pathname !== "/" ? "bg-black" : "" } transition-all duration-200`}>
          <div className="flex md:h-14 h-40 md:flex-row flex-col w-11/12 max-w-maxContent items-center justify-between">

            {/* Logo */}
            <Link to={'/'} className="md:text-[24px] text-[30px]"><HighlightText text={"StudyCenter"}/></Link>

            {/* Navigation links */}
            <nav className=" md:block">
              <ul className="flex gap-x-6 text-gray-200">
                {NavbarLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link?.path}>
                        <p className={`${matchRoute(link?.path) ? "text-red-500": "text-gray-100"}`}>
                          {link.title}
                        </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Login / Signup / Dashboard */}
            <div className=" items-center gap-x-4 md:flex">
              {user && user?.accountType !== "Instructor" && (
                <Link to="/dashboard/cart" className="relative overflow-hidden h-[30px] w-[30px]">
                  <AiOutlineShoppingCart className="text-2xl text-gray-100" />
                  {totalItems > 0 && (
                    <span className="absolute -bottom-0 -right-0 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-gray-700 text-center text-xs font-bold text-yellow-300">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              {token === null && (
                <Link to="/login">
                  <button className="rounded-[8px] border border-gray-800 bg-red-600 px-[12px] py-[8px] text-gray-300 font-semibold">
                    Log in
                  </button>
                </Link>
              )}
              {token === null && (
                <Link to="/signup">
                  <button className="rounded-[8px] border border-gray-800 bg-gray-400 px-[12px] py-[8px] text-black font-semibold">
                    Sign up
                  </button>
                </Link>
              )}
              {token !== null && <ProfileDropdown/>}

            </div>
            <button className="mr-4 text-white hidden ">
              <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
            </button>
          </div>
        </div>
      )
    }

    export default Navbar;
