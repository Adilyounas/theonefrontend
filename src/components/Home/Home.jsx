import React, { useEffect } from "react";
import { Box } from "@mui/material";

// *{<---------------------   CSS FILE  ------------------------------->}
import "./home.css";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import CardSkeleton from "../common_components/Skeletons/CardSkeleton/CardSkeleton";
import homeg from "./homeg.avif";
import HeadlineComponent from "../common_components/Headline/HeadlineComponent";
import Card from "../common_components/Card/Card";
import Titles from "../MetaData/MetaData";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// *{<---------------------  ACTIONS  ------------------------------->}
import { getFeatureProducts } from "../../Redux/Actions/getFeatureProducts";

const Home = ({ mode }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}
  const dispatch = useDispatch();

  // *{<---------------------------  USESELECTOR   -------------------------->}

  const { bgColors } = useSelector((state) => state.Colors);
  const { products } = useSelector((state) => state.getFeatureProducts);

  const { generalLoading } = useSelector((state) => state.generalLoading);

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const toTheTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  // TODO{<------------------------ USE EFFECT HOOK  --------------------------->}

  useEffect(() => {
    dispatch(getFeatureProducts());
  }, [dispatch]);

  return (
    <>
      <Titles title={"Home Page"} />
      <div
        className="home"
        style={{
          backgroundColor: mode ? "#000000" : "#ffffff",
        }}
      >
        <Box id="box1">
          <img src={homeg} alt="shopping girl" />
          <div
            style={{
              backgroundColor: bgColors ? bgColors : "rgb(253, 246, 238)",
            }}
          ></div>
        </Box>

        <div
          id="box2"
          style={{
            color: mode ? "#ffffff" : "#000000",
          }}
        >
          <h1
            style={{
              filter: mode
                ? "drop-shadow(3px 1px 0px black)"
                : "drop-shadow(3px 1px 0px white)",
            }}
          >
            Pick Any Product, which satisfy you!
          </h1>
          <p
            style={{
              filter: mode
                ? "drop-shadow(3px 1px 0px black)"
                : "drop-shadow(3px 1px 0px white)",
            }}
          >
            Shop and discover the world
          </p>

          <a
            style={{
              color: bgColors
                ? "#ffffff"
                : bgColors === "#81efcb"
                ? "#000000 !important"
                : "",
              backgroundColor: bgColors ? bgColors : "rgb(240,240,240)",
              outline: mode ? "1px solid white" : "",
              filter: mode
                ? "drop-shadow(white 2px 4px 0px)"
                : "drop-shadow(black 2px 4px 0px)",
            }}
            href="#featureproducts"
          >
            {" "}
            Feature Products
          </a>
        </div>
      </div>

      {/* {<-----------------Features products----------------->} */}
      <div
        className="featureProducts"
        style={{
          backgroundColor: mode ? "#000000" : "#ffffff",
          color: mode ? "#ffffff" : "#000000",
        }}
      >
        <HeadlineComponent
          mode={mode}
          bgColors={bgColors}
          heading={"Feature Products"}
        />

        <div id="featureproducts">
          {generalLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            products &&
            products.map((item) => (
              <Card
                key={item._id}
                mode={mode}
                bgColors={bgColors}
                product={item}
              />
            ))
          )}
        </div>
      </div>

      {/* {<-----------------More button----------------->} */}
      <div
        className="morebtn"
        style={{
          backgroundColor: mode ? "#000000" : "#ffffff",
        }}
      >
        <NavLink
          onClick={toTheTop}
          to={"products"}
          style={{
            backgroundColor: bgColors ? bgColors : "rgb(240,240,240)",
            outline: mode ? "1px solid white" : "",
            filter: mode
              ? "drop-shadow(white 2px 4px 0px)"
              : "drop-shadow(black 2px 4px 0px)",
            color: bgColors
              ? "#ffffff"
              : bgColors === "#81efcb"
              ? "#000000"
              : "",
          }}
        >
          More Products
        </NavLink>
      </div>
    </>
  );
};

export default Home;
