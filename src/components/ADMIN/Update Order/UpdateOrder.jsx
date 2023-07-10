import React, { useEffect, useState } from "react";

// *{<---------------------   CSS FILE  ------------------------------->}
import "./updateOrder.css";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import Titles from "../../MetaData/MetaData";
import Loader from "../../common_components/Loader/Loader";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// *{<---------------------  ACTIONS  ------------------------------->}
import { getSingleOrder_admin_Action } from "../../../Redux/Actions/ADMIN/getSingleOrder";
import { updateOrderAction_admin } from "../../../Redux/Actions/ADMIN/updateOrder";

const UpdateOrder = ({ mode, loadUserSuccess }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}
  const history = useNavigate();
  const dispatch = useDispatch();
  const { orderId } = useParams();

  // *{<---------------------------  USESELECTOR   -------------------------->}
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { singleOrder } = useSelector((state) => state.SingleOrderAdmin);
  const { bgColors } = useSelector((state) => state.Colors);

  // *{<--------------------    USE STATE   -------------------->}

  const [status, setStatus] = useState();

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const proceedToPaymentHandler = () => {
    const formData = new FormData();
    formData.set("orderStatus", status);
    dispatch(updateOrderAction_admin(orderId, formData));
  };

  // TODO{<------------------------ USE EFFECT HOOK  --------------------------->}

  useEffect(() => {
    if (loadUserSuccess === false) {
      history("/register");
    } else {
      if (singleOrder && singleOrder._id !== orderId) {
        dispatch(getSingleOrder_admin_Action(orderId));
      }
    }
  }, [history, dispatch, orderId, singleOrder, loadUserSuccess]);

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <>
      <Titles title={"Update Order --admin"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <div
          id="confirmOrderContainer"
          style={{
            backgroundColor: mode ? "#000000" : "#ffffff",
            color: mode ? "#ffffff" : "#000000",
          }}
        >
          <div className="mainContainer">
            <div className="orderDetails">
              <div>
                <h2 style={{ color:bgColors?bgColors:mode?"#ffffff": "#000000"}}>Shipping Info</h2>
                <div className="userDetails">
                  <h3>Name:</h3>
                  <p>
                    {singleOrder && singleOrder.user && singleOrder.user.name}
                  </p>
                </div>

                <div className="userDetails">
                  <h3>Phone:</h3>
                  <p>
                    {singleOrder &&
                      singleOrder.shippingInfo &&
                      singleOrder.shippingInfo.phone}
                  </p>
                </div>

                <div className="userDetails">
                  <h3>Address:</h3>
                  <p>
                    {singleOrder &&
                      singleOrder.shippingInfo &&
                      singleOrder.shippingInfo.address}
                  </p>
                </div>
              </div>

              {/*  */}
              <div className="userCartDetails">
                <h2 style={{ color:bgColors?bgColors:mode?"#ffffff": "#000000"}}>Your Cart Items</h2>

                {singleOrder &&
                  singleOrder.cartItems &&
                  singleOrder.cartItems.map((item) => (
                    <div key={item.product}>
                      <div className="box1">
                        <img
                          style={{ borderRadius: "4px" }}
                          width={60}
                          src={item.image}
                          alt={`imageName ${item}`}
                        />
                        <span>{item.name}</span>
                      </div>
                      <div className="box2">
                        <span>
                          {item.quantity}X ${item.price} = $
                          {item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="orderSummary">
              <h2 style={{ color:bgColors?bgColors:mode?"#ffffff": "#000000"}}>Order Summary</h2>
              <div>
                <h3>Subtotal:</h3>
                <p>${singleOrder.subTotal}</p>
              </div>
              <div>
                <h3>ShippingTax:</h3>
                <p>${singleOrder.shippingTax}</p>
              </div>

              <div>
                <h3>GST:</h3>
                <p>${singleOrder.tax}</p>
              </div>

              <div>
                <h3>Total:</h3>
                <p>${singleOrder.Total}</p>
              </div>
              <span>
                <select
                  id="updateOrderSelect"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {singleOrder &&
                  singleOrder.orderStatus &&
                  singleOrder.orderStatus === "Delivered" ? (
                    <option value="Order is Delevered">
                      Order is Delevered
                    </option>
                  ) : (
                    <option>Select a Action</option>
                  )}
                  {singleOrder && singleOrder.orderStatus === "Processing" && (
                    <option value="Shipped">Shipped</option>
                  )}

                  {singleOrder && singleOrder.orderStatus === "Shipped" && (
                    <option value="Delivered">Delivered</option>
                  )}
                </select>
              </span>
              <button
                style={{
                  display:
                    singleOrder &&
                    singleOrder.orderStatus &&
                    singleOrder.orderStatus === "Delivered"
                      ? "none"
                      : "block",
                }}
                onClick={proceedToPaymentHandler}
              >
                Update Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateOrder;
