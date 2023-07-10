import React, { useState } from "react";

// *{<---------------------   CSS FILE  ------------------------------->}
import "./card.css";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";

// *{<---------------------  ACTIONS  ------------------------------->}
import { putLikeAndDislike } from "../../../Redux/Actions/putLikeAndDislike";
import { addToCartAction } from "../../../Redux/Actions/addToCart";

// *{<---------------------  MATERIAL UI ICONS  ------------------------------->}
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// *{<---------------------  MATERIAL UI  ------------------------------->}
import { Checkbox, Rating, Tooltip, Typography } from "@mui/material";

const Card = ({ product, bgColors, mode }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}
  const dispatch = useDispatch();

  // *{<--------------------    USE STATE   -------------------->}
  const [likeAndDislike, setLikeAndDislike] = useState(true);
  const [normalheart] = useState(<FavoriteBorderIcon />);
  const [fillHeart, setFillheart] = useState(<FavoriteIcon />);

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const likeAndDislikeHandler = (id) => {
    //this condition is for disliking
    if (likeAndDislike === false) {
      dispatch(putLikeAndDislike(product._id, likeAndDislike));
      setLikeAndDislike(!likeAndDislike);
      setFillheart(<FavoriteBorderIcon />);
    } else {
      dispatch(putLikeAndDislike(product._id, likeAndDislike));
      setLikeAndDislike(!likeAndDislike);
      setFillheart(<FavoriteIcon />);
    }
  };

  const cardGoUp = () => {
    window.scroll({
      top: 0,
      bahavior: "smooth",
    });
  };

  const addToCartHandler = (product) => {
    const quantity = 1;
    dispatch(addToCartAction(product._id, quantity));
    toast.success("Added to cart");
  };

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}
  // style={{backgroundColor:mode?"#000000":"#ffffff",color:mode?"#ffffff":"#000000"}}
  return (
    <div
      id="card"
     
    >
      <NavLink onClick={cardGoUp} to={`/singleProduct/${product._id}`}>
        <img src={product.images[0].url} alt={`${product.images[0]}`} />
      </NavLink>

      <div>
        <div >
          <div>
            <h5>{product.name}</h5>
            <span>${product.price}</span>
          </div>
          <Typography>{product.description}</Typography>
          <Rating
         style={{color:bgColors?bgColors:"#000000"}}
            name="half-rating-read"
            value={product.ratings}
            precision={0.5}
            readOnly
          />
          <div className="cartPageAddToCart">
            <button onClick={() => addToCartHandler(product)}>
              Add To Cart
            </button>
            <Tooltip title="Like" placement="top">
              <Checkbox
                style={{
                  color: bgColors ? bgColors : "#000000",
                }}
                icon={normalheart}
                checkedIcon={fillHeart}
                onClick={() => likeAndDislikeHandler(product._id)}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
