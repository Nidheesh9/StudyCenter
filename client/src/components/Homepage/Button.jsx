import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children,bool,link}) => {
  return (
    <Link to={link}>
        <div>
            <button className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
                                ${bool?"bg-red-600":"bg-gray-400 text-black"} hover:scale-95 transition-all duration-200`}>
                {children}
            </button>
        </div>
    </Link>
  )
}

export default Button
