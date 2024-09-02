import React from "react";

const HighlightText = ({text}) => {
  return (
    <span className="bg-gradient-to-b from-[#d579a2] via-[#e33a49] to-[#7b1e1e] text-transparent bg-clip-text font-bold">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;