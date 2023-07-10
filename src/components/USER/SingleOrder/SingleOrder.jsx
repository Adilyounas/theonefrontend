import React, { Fragment, useEffect } from "react";
// *{<---------------------   CSS FILE  ------------------------------->}
import "./singleOrder.css";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import MetaData from "../../MetaData/MetaData";
import Loader from "../../common_components/Loader/Loader";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";

// *{<---------------------  ACTIONS  ------------------------------->}
import { singleOrderAction } from "../../../Redux/Actions/myOrdersAction";

// *{<---------------------  MATERIAL UI ICONS  ------------------------------->}
import { Typography } from "@mui/material";

const Order = ({ loadUserSuccess }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}

  const dispatch = useDispatch();
  const history = useNavigate();
  const { orderId } = useParams();

  // *{<---------------------------  USESELECTOR   -------------------------->}

  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { singleOrder } = useSelector((state) => state.SingleOrder);

  // TODO{<------------------------ USE EFFECT HOOK  --------------------------->}

  useEffect(() => {
    if (loadUserSuccess === false) {
      history("/register");
    }else{
      dispatch(singleOrderAction(orderId));

    }

  }, [dispatch, orderId, history, loadUserSuccess]);
  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <Fragment>
      <MetaData title={"Orders Detail"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{singleOrder && singleOrder._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{singleOrder && singleOrder.user && singleOrder.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {singleOrder && singleOrder.shippingInfo && singleOrder.shippingInfo.phone}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {singleOrder && singleOrder.shippingInfo &&
                      `${singleOrder.shippingInfo.address && singleOrder.shippingInfo.address }, ${singleOrder.shippingInfo.city && singleOrder.shippingInfo.city}, ${singleOrder.shippingInfo.state && singleOrder.shippingInfo.state}, ${singleOrder.shippingInfo.pinCode && singleOrder.shippingInfo.pinCode}, ${singleOrder.shippingInfo.country&& singleOrder.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Amount:</p>
                  <span>{singleOrder && singleOrder.Total && singleOrder.Total}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                       singleOrder.orderStatus &&
                      singleOrder.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {singleOrder && singleOrder.orderStatus && singleOrder.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {singleOrder && singleOrder.cartItems &&
                  singleOrder && singleOrder.cartItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <NavLink to={`/singleProduct/${item.product}`}>
                        {item.name}
                      </NavLink>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Order;
