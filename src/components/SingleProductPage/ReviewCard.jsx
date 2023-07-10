import React from "react";
import { Rating } from "@mui/material";
import "./reviewCard.css";
import { useSelector } from "react-redux";

const ReviewCard = ({ review, mode }) => {
  const { bgColors } = useSelector((state) => state.Colors);

  return (
    <div className="reviewCard">
      <img src={review.image} alt={`avatar ${review.image}`} />
      <p
        style={{
          color: bgColors ? bgColors : mode ? "#ffffff" : "#000000",
        }}
      >
        {review.name}
      </p>
      <Rating
      style={{
          color: bgColors ? bgColors : mode ? "#ffffff" : "#000000",
        }}
        size="medium"
        name="half-rating-read"
        value={review.rating >= 1 ? review.rating : 0}
        precision={0.5}
        readOnly
        className="rating"
      />
      <span className="comment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
