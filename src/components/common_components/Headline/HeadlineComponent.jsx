import React from "react";
import "./headlineComponent.css";

const HeadlineComponent = ({ heading, mode }) => {
  return (
    <div className="featureBox" >
      <span
        style={ mode?{backgroundColor: "white"}:{backgroundColor: "black"}  }
      ></span>
      <div>
      <h2>{heading}</h2>

      </div>
      <span
      style={ mode?{backgroundColor: "white"}:{backgroundColor: "black"}  }
      ></span>
    </div>
  );
};

export default HeadlineComponent;
