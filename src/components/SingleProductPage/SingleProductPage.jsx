import React, { useEffect, useState } from "react";
// *{<---------------------   CSS FILE  ------------------------------->}
import "./SingleProductPage.css";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import Item from "./Item";
import ReviewCard from "./ReviewCard.jsx";
import Headline from "../common_components/Headline/HeadlineComponent";
import Titles from "../MetaData/MetaData";
import Loader from "../common_components/Loader/Loader";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

// *{<---------------------  ACTIONS  ------------------------------->}
import { getReviews } from "../../Redux/Actions/getSingleProduct";

import { addToCartAction } from "../../Redux/Actions/addToCart";
import {
  getSingleProduct,
  addReview,
} from "../../Redux/Actions/getSingleProduct";

// *{<---------------------  MATERIAL UI  ------------------------------->}
import { Modal, Rating } from "@mui/material";

// !{<---------------------  COMPONENT START FROM HERE ------------------------------->}

const SingleProductPage = ({ mode }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}
  const dispatch = useDispatch();
  const { productId } = useParams();

  // *{<---------------------------  USESELECTOR   -------------------------->}

  const { bgColors } = useSelector((state) => state.Colors);
  const { product } = useSelector((state) => state.SingleProduct);
  const { reviews } = useSelector((state) => state.Reviews);
  const { addReviewsSuccess } = useSelector((state) => state.AddReview);

  const { generalLoading } = useSelector((state) => state.generalLoading);

  // *{<--------------------    USE STATE   -------------------->}
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const [reviewSubmited, setReviewSubmited] = useState(false);

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  // const goup = () => {
  //   window.scroll({
  //     top: 700,
  //     behavior: "smooth",
  //   });
  // };
  const modalSubmitReviewFormHandler = (e) => {
    e.preventDefault();
    setReviewModalOpen(false);
    const formData = new FormData();
    formData.set("productId", productId);
    formData.set("rating", rating);
    formData.set("comment", comment);
    dispatch(addReview(formData));
    setReviewSubmited(!reviewSubmited);
    // goup();
  };

  const incrementHandler = () => {
    if (product.stock <= quantity) {
      toast.error("Stock Limit", { duration: 700 });
      return;
    }
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decrementHandler = () => {
    if (quantity < 2) {
      toast.error("Minimum 1 Product", { duration: 700 });
      return;
    }

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addToCartAction(productId, quantity));

    toast.success("Add To Cart");
  };
  // TODO{<------------------------ USE EFFECT HOOK  --------------------------->}

  useEffect(() => {
    if (addReviewsSuccess === true) {
      dispatch(getSingleProduct(productId));
      dispatch(getReviews(productId));
    }
    dispatch(getReviews(productId));

    dispatch(getSingleProduct(productId));
  }, [dispatch, productId, addReviewsSuccess]);

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}
  return (
    <>
      <Titles title={"Single Product Page"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <div
          id="SingleProductPage"
          style={{
            backgroundColor: mode ? "#000000" : "#ffffff",
            color: mode ? "#ffffff" : "#000000",
          }}
        >
          <div className="box01">
            <div className="SingleProductImages">
              <Carousel
                autoPlay={true}
                stopAutoPlayOnHover={true}
                interval={3000}
                animation={"slide"}
                swipe={true}
              >
                {product.images?.map((item) => (
                  <Item key={item._id} item={item} />
                ))}
              </Carousel>
            </div>

            <div className="SingleProductDetails">
              <div>
                <h1>{product.name}</h1>
                <span className="productId">Prouduct #{product._id}</span>
                <Rating
                  style={{
                    color: bgColors ? bgColors : "",
                  }}
                  size="medium"
                  name="half-rating-read"
                  value={product.ratings >= 1 ? product.ratings : 0}
                  precision={0.5}
                  readOnly
                  className="rating"
                />
                <span className="reviews">({`${product.likes} Likes`})</span>
                <span className="reviews">
                  ({`${product.reviews ? product.reviews.length : ""} Reviews`})
                </span>
              </div>
              <div>
                <h2>${product.price}</h2>
              </div>
              <div className="status">
                <p>
                  Status:{" "}
                  <span id={product.stock < 1 ? "outStock" : "instock"}>
                    {product.stock < 1 ? "Out Stock" : "In Stock"}{" "}
                  </span>
                </p>
              </div>
              <div id="onlyleftdiv">
                <div
                  className="increment_decrement"
                  style={{
                    color: mode ? "#000000" : "",
                  }}
                >
                  <span
                    onClick={() => decrementHandler(product._id)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    -
                  </span>
                  <span>{quantity}</span>
                  <span
                    onClick={() => incrementHandler(product._id)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    +
                  </span>
                </div>
                <div className="productLeft">
                  <p>
                    Only{" "}
                    <span
                      style={{
                        color: bgColors
                          ? bgColors
                          : mode
                          ? "#ffffff"
                          : "#000000",
                      }}
                    >
                      {product.stock} Items
                    </span>{" "}
                    Left
                  </p>
                </div>
              </div>
              <div className="addtocart">
                <button
                  onClick={addToCartHandler}
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
                >
                  Add To Cart
                </button>
              </div>
              <div>
                <h3
                  style={{
                    color: bgColors ? bgColors : mode ? "#ffffff" : "#000000",
                  }}
                >
                  Description
                </h3>
                <h4>{product.description}</h4>
              </div>
            </div>
          </div>

          <Headline bgColors={bgColors} mode={mode} heading={"Testimonials"} />
          <div id="addReview">
            <button
              onClick={() => setReviewModalOpen(true)}
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
            >
              Add Review
            </button>
            <Modal
              open={reviewModalOpen}
              onClose={() => setReviewModalOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="addReviewModal"
            >
              <div>
                <form onSubmit={modalSubmitReviewFormHandler}>
                  <p>Add Review</p>
                  <Rating
                    required
                    size="large"
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <textarea
                    required
                    onChange={(e) => setComment(e.target.value)}
                    name="comment"
                    cols="30"
                    rows="10"
                  />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </Modal>
          </div>

          {reviews && reviews[0] ? (
            <div className="reviewsContainer">
              {reviews &&
                reviews.map((review, index) => (
                  <ReviewCard mode={mode} key={index} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </div>
      )}
    </>
  );
};

export default SingleProductPage;
