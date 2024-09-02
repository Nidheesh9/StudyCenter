import React from 'react'
import Button from './Button';
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";

const CodeBlock = ({position,heading,subheading,btn1,btn2,codeblock,backgroundGradient,codeColor}) => {
  return (
    <div className={` ${position} mt-10 justify-between sm:gap-10 gap-5 w-[80vw] sm:flex`}>

      <div className="w-[90%] lg:w-[45%] flex flex-col gap-8">
        {heading}

        <div className="text-gray-300 text-base font-bold w-[85%] -mt-3">
          {subheading}
        </div>

        <div className="flex gap-7 my-7">
          <Button bool={btn1.bool} link={btn1.link}>
            <div className="flex items-center gap-2">
              {btn1.btnText}
              <FaArrowRight />
            </div>
          </Button>
          <Button bool={btn2.bool} link={btn2.link}>
            {btn2.btnText}
          </Button>
        </div>
      </div>

      <div className="h-fit flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] bg-opacity-10 bg-white">
        {backgroundGradient}

        <div className="text-center flex flex-col w-[10%] select-none text-gray-200 font-inter font-bold z-10">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1 z-10`}>
          <TypeAnimation sequence={[codeblock, 1000, ""]} cursor={true} repeat={Infinity} 
            style={{ whiteSpace: "pre-line", display: "block",}} omitDeletionAnimation={true}/>
        </div>
      </div>

    </div>
  )
}

export default CodeBlock;
