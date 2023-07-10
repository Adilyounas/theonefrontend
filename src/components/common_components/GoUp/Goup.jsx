import React from "react";
// *{<---------------------   CSS FILE  ------------------------------->}

import "./goup.css";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useSelector } from "react-redux";

// *{<---------------------  MATERIAL UI ICONS  ------------------------------->}
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Goup = ({ mode }) => {
  // *{<---------------------------  USESELECTOR   -------------------------->}
  const { bgColors } = useSelector((state) => state.Colors);

  // *{<--------------------    REGULAR FUNCTIONS   -------------------->}

  const goingUpHandler = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{
        backgroundColor: mode ? "white" : "",
        borderRadius: "50%",
      }}
      id="goup"
      className="goup"
      onClick={goingUpHandler}
    >
      <KeyboardArrowUpIcon
        style={{
          color: bgColors ? bgColors : "",
        }}
      />
    </div>
  );
};

export default Goup;
