import React from "react";
import { Skeleton } from "@mui/material";
import "./cardSkeleton.css";

const CardSkeleton = () => {
  return (
    <div id="cardSkeleton">
      <div>
        <span>
          <Skeleton animation="wave" width={260} height={400} />{" "}
        </span>
      </div>

      <div>
        <div>
          <h5>
            <Skeleton animation="wave" width={130} height={40}/>
          </h5>
          <span><Skeleton animation="wave" width={80} height={30}/></span>
        </div>

        <h3><Skeleton animation="wave" variant="text" width={160} /></h3>
        <p> <Skeleton animation="wave" width={130} height={30}/></p>
        <span><Skeleton animation="wave" width={100} height={60}/></span>
      </div>
    </div>
  );
};

export default CardSkeleton;
