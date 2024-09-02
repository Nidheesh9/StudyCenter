import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div
      className={`w-[360px] lg:w-[30%] ${
        currentCard === cardData?.heading
          ? "bg-white shadow-[12px_12px_10px_0px] shadow-yellow-200"
          : "bg-gray-900 text-white"
      } z-[39   ] text-gray-25 h-[300px] box-border cursor-pointer`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className="border-b-[2px] border-gray-500 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div
          className={` ${
            currentCard === cardData?.heading && "text-gray-900"
          } font-semibold text-[20px]`}
        >
          {cardData?.heading}
        </div>

        <div className="text-gray-500">{cardData?.description}</div>
      </div>

      <div
        className={`flex justify-between ${
          currentCard === cardData?.heading ? "text-blue-400" : "text-gray-400"
        } px-6 py-3 font-medium`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px] z-40">
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
