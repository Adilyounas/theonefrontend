import React from "react";
import "./loader.css";
import { useSelector } from "react-redux";

const Loader = () => {
  const { modez } = useSelector((state) => state.Colors);

  return (
    <div id="loaderContaienr" style={{ backgroundColor: modez ? "black" : "" }}>
      <div className="loadercontainer" style={{ backgroundColor: modez ? "transparent" : "" }}>
        <span class="loader" style={{ backgroundColor: modez ? "transparent" : "",color:modez?"#ffffff":"#000000" }}>Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
