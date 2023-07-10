import React, { Fragment, useEffect, useState } from "react";
// *{<------------------------------- CSS FILE ------------------------------------->}
import "./reviewsAdmin.css";

// *{<------------------------------- IMPORTING FROM OTHER REGULAR LIBRARIES ------------------------------------->}

import { toast } from "react-hot-toast";

// *{<------------------------------- COMPONENT FROM OTHER COMPONENT FILES ------------------------------------->}
import Loader from "../../common_components/Loader/Loader";
import Title from "../../MetaData/MetaData";

// *{<------------------------------- REACT REDUX ------------------------------------->}
import { useDispatch, useSelector } from "react-redux";

// *{<------------------------------- MATERIAL UI ICONS------------------------------------->}
import ReviewsIcon from "@mui/icons-material/Reviews";
import DeleteIcon from "@mui/icons-material/Delete";

// *{<------------------------------- MATERIAL UI ------------------------------------->}
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

// *{<----------------------------- ACTIONS ----------------------------->}
import { getAllReviewListAction_admin } from "../../../Redux/Actions/ADMIN/getAllReviews";
import { deleteReview_admin } from "../../../Redux/Actions/ADMIN/deleteReview";
import { useNavigate } from "react-router-dom";

// !{<----------------------------- COMPONET START FROM HERE ----------------------------->}

const ReviewList = ({ mode, loadUserSuccess }) => {
  // *{<------------------------------- USEDISPATCH, USENAVIGATE, USEPARAMS,------------------------------------->}
  const dispatch = useDispatch();
  const history = useNavigate();

  // *{<------------------------------- USE-SELECTOR  ------------------------------------->}
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { reviews } = useSelector((state) => state.AllReviews);
  const { bgColors } = useSelector((state) => state.Colors);

  // *{<------------------------------- USESTATE HOOOK------------------------------------->}
  const [reviewId, setReviewId] = useState("");
  const [productId, setProductId] = useState("");
  const [open, setOpen] = useState(false);

  // *{<------------------------------- REGULAR FUNTIONS ------------------------------------>}

  const yesDelete = () => {
    setOpen(!open);
    if (reviewId && productId) {
      dispatch(deleteReview_admin(productId, reviewId));
    } else {
      toast.custom("One Id Is Missing");
    }
  };

  const confirmationBox = (id) => {
    setReviewId(id);
    setOpen(!open);
  };

  const reviewFormSubmitHandler = () => {
    dispatch(getAllReviewListAction_admin(productId));
  };

  // *{<------------------------------- CREATING VARIABLES FOR DATA GRID------------------------------------->}

  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      headerClassName: "headerBgColor",
      minWidth: 220,
      flex: 1,
    },
    {
      field: "name",
      headerClassName: "headerBgColor",
      headerName: "Name",
      minWidth: 220,
      flex: 0.8,
    },

    {
      field: "comment",
      headerClassName: "headerBgColor",
      headerName: "Comment",
      minWidth: 400,
      flex: 1.2,
    },
    {
      field: "rating",
      headerClassName: "headerBgColor",
      headerName: "Rating",
      type: "number",
      minWidth: 200,
    },
    {
      field: "action",
      headerClassName: "headerBgColor",
      headerName: "Actions",
      type: "number",
      minWidth: 120,

      sortable: false,
      renderCell: (params) => {
        return (
          <div
            className={"actionIcons"}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <DeleteIcon
              style={{
                backgroundColor: mode ? "#000000" : "#ffffff",
                color: mode ? "#ffffff" : "#000000",
                margin: "0 1.2vmax",
              }}
              className="actiondeleteBtn"
              onClick={() => confirmationBox(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  // *{<------------------------------- FOR EACH LOOOOOOOP------------------------------------->}

  let rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        comment: item.comment,
        rating: item.rating,
      });
    });

  useEffect(() => {
    if (loadUserSuccess === false) {
      history("/register");
    }
  }, [loadUserSuccess, history]);

  // TODO{<------------------------------- RETURN STATEMENT ------------------------------------->}

  return (
    <Fragment>
      <Title title={"All Reviews --admin"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <div
          id="productList"
          style={{
            backgroundColor: mode ? "#000000" : "#ffffff",
            color: mode ? "#ffffff" : "#000000",
          }}
        >
          <Typography style={{color:bgColors?bgColors:""}}>All Reviews</Typography>
          <form onSubmit={reviewFormSubmitHandler} id="reviewFormForAdmin">
            <span>
              <ReviewsIcon />
              <input
                type="text"
                placeholder="Enter Product Id"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </span>
            <button>Search</button>
          </form>
          <Dialog open={open} onClose={() => setOpen(!open)}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>Are you sure you want to delete?</DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button color="secondary" onClick={yesDelete}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          {reviews && reviews.length >= 1 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[10]}
              className="productListTable"
              autoHeight
              disableRowSelectionOnClick
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
            />
          ) : (
            <div id="noProductCreated">
              <h1>No Reviews</h1>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default ReviewList;
