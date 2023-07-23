import React, { useEffect, useState } from "react";

// *{<---------------------   CSS FILE  ------------------------------->}
import "./products.css";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import CardSkeleton from "../common_components/Skeletons/CardSkeleton/CardSkeleton";
import Card from "../common_components/Card/Card";
import Titles from "../MetaData/MetaData";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// *{<---------------------  ACTIONS  ------------------------------->}
import { getProducts } from "../../Redux/Actions/getProducts";

// *{<---------------------  MATERIAL UI  ------------------------------->}
import { Modal, Pagination, Rating, Slider } from "@mui/material";

const Products = ({ mode }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}
  const dispatch = useDispatch();

  // *{<---------------------------  USESELECTOR   -------------------------->}
  const { products, totalProductsCount, resultPerPage } = useSelector(
    (state) => state.getProducts
  );
  const { bgColors } = useSelector((state) => state.Colors);
  const { generalLoading } = useSelector((state) => state.generalLoading);

  // *{<--------------------    USE STATE   -------------------->}

  const [sliderValue, setSliderValue] = React.useState([0, 50000]);
  const [rating, setRating] = React.useState(0);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(1);
  const [productSearchState, setProductSearchState] = useState(false);
  const [categoryState, setCategoryState] = useState("");

  // *{<------------------------     DECLARING VARIABLES  -------------------------->}

  const category = [
    { cat: "Laptop", link: "laptop" },
    { cat: "Footwear", link: "headPhones" },
    { cat: "Botton", link: "mobile" },
    { cat: "Tops", link: "watches" },
    { cat: "Camera", link: "ram" },
    { cat: "Smartphone", link: "books" },
    { cat: "Headphones", link: "books" },
  ];

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  window.addEventListener("scroll", () => {
    let goup = document.getElementById("goup");

    if (window.scrollY > 100) {
      goup.classList.add("showingGoup");
    } else {
      goup.classList.remove("showingGoup");
    }
  });

  const sliderValueHandler = (e) => {
    setSliderValue(e.target.value);
  };

  const productSearchHandler = (e) => {
    e.preventDefault();
    setProductSearchState(false);
  };

  const resetAllStates = () => {
    setSliderValue([0, 50000]);
    setRating(0);
    setSearch("");
    setCategoryState("");
    window.scroll({
      top: 0,
      begavior: "smooth",
    });
  };

  const paginationHandler = (e, value) => {
    setPagination(value);
  };

  // TODO{<------------------------ USE EFFECT HOOK  --------------------------->}

  useEffect(() => {
    dispatch(
      getProducts(search, sliderValue, rating, pagination, categoryState)
    );
  }, [dispatch, search, sliderValue, rating, pagination, categoryState]);

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <>
      <Titles title={"Products Page"} />
      <div
        className="productsContainer"
        style={{
          backgroundColor: mode ? "#000000" : "#ffffff",
          color: mode ? "#ffffff" : "#000000",
        }}
      >
        <Modal
          className="searchModal"
          onClose={() => setProductSearchState(false)}
          open={productSearchState}
        >
          <form className="search" id="search" onSubmit={productSearchHandler}>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search The Name Of Product"
            />
            <button
              style={{
                backgroundColor: bgColors ? bgColors : "",
                color: bgColors
                  ? "#ffffff"
                  : bgColors === "#81efcb"
                  ? "#000000 !important"
                  : "",
              }}
              type="submit"
            >
              Search
            </button>
          </form>
        </Modal>

        <div className="product_Filters">
          <div className="filters">
            <div>
              <h3>Categories</h3>
              {category.map((item, index) => (
                <NavLink
                  style={{
                    color: bgColors ? bgColors : mode ? "#ffffff" : "#000000",
                  }}
                  onClick={(e) => setCategoryState(e.target.innerText)}
                  key={index}
                >
                  {item.cat}
                </NavLink>
              ))}
            </div>

            <div className="sliderContainer">
              <h3>Price</h3>
              <Slider
                valueLabelDisplay="auto"
                value={sliderValue}
                min={0}
                max={50000}
                onChange={sliderValueHandler}
                size="small"
                sx={{
                  color: bgColors ? bgColors : mode ? "#ffffff" : "#000000",
                }}
              />
              <div>
                <button>${sliderValue[0]}</button>
                <button>${sliderValue[1]}</button>
              </div>
            </div>

            <div>
              <h3>Rating</h3>

              <Rating
                className="ratings"
                size="medium"
                name="size-medium"
                value={Number(rating)}
                onChange={(e) => setRating(e.target.value)}
                sx={{
                  color: bgColors ? bgColors : "#000000",
                }}
              />
            </div>
            <div className="productSearchBtnContainer">
              <button
                style={{
                  backgroundColor: bgColors ? bgColors : "rgb(240,240,240)",
                  outline: mode ? "1px solid white" : "",
                  filter: mode
                    ? "drop-shadow(white 2px 4px 0px)"
                    : "drop-shadow(black 2px 4px 0px)",
                  color: bgColors
                    ? "#ffffff"
                    : bgColors === "#81efcb"
                    ? "#000000 !important"
                    : "",
                }}
                onClick={() => setProductSearchState(true)}
              >
                Search
              </button>
            </div>
          </div>
          <div className="products">
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
              products.map((product) => (
                <Card key={product._id} product={product} bgColors={bgColors} />
              ))
            )}
          </div>
        </div>
        <div className="pagination">
          <div>
            <h3>
              {search && `Searched=${search}`}{" "}
              {rating > 1 && `Rating=${rating}`}
            </h3>
            <button onClick={resetAllStates}>Reset Filters</button>
          </div>

          <Pagination
            onChange={paginationHandler}
            page={pagination}
            sx={{
              ".MuiPaginationItem-root[aria-current='true']": {
                backgroundColor: bgColors ? bgColors : "rgb(237,237,237)",
                color: bgColors ? "white" : "#000000",
              },
            }}
            className="pagination"
            size="medium"
            count={
              totalProductsCount &&
              Math.ceil(totalProductsCount / resultPerPage)
            }
            shape="rounded"
          />
        </div>
      </div>
    </>
  );
};

export default Products;
