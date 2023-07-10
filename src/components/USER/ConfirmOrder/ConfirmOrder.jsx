import React, { useEffect } from "react";
// *{<---------------------   CSS FILE  ------------------------------->}
import "./confirmOrder.css";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import StepperComponent from "../../common_components/StepperComponent/Stepper";
import Titles from "../../MetaData/MetaData";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// *{<---------------------  LOCAL STORAGE  ------------------------------->}

const orderSummary = JSON.parse(localStorage.getItem("orderSummary"));

const ConfirmOrder = ({ loadUserSuccess, mode }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}
  const history = useNavigate();

  // *{<---------------------------  USESELECTOR   -------------------------->}
  const { shippingInfo } = useSelector((state) => state.ShippingInfo);
  const { user } = useSelector((state) => state.User);
  const { cartItems } = useSelector((state) => state.cart);
  const { bgColors } = useSelector((state) => state.Colors);

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const proceedToPaymentHandler = () => {
    history("/payment");
  };

  // TODO{<------------------------ USE EFFECT HOOK  --------------------------->}

  useEffect(() => {
    if (loadUserSuccess === false) {
      history("/register");
    }
  }, [loadUserSuccess, history]);

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <>
      <Titles title={"Confirm Order"} />
      <div
        id="confirmOrderContainer"
        style={{
          backgroundColor: mode ? "#000000" : "#ffffff",
          color: mode ? "#ffffff" : "#000000",
        }}
      >
        <StepperComponent mode={mode} activeStep={1} />
        <div className="mainContainer">
          <div className="orderDetails">
            <div>
              <h2  style={{color:bgColors?bgColors:""}}>Shipping Info</h2>
              <div className="userDetails">
                <h3>Name:</h3>
                <p>{user && user.name}</p>
              </div>

              <div className="userDetails">
                <h3>Phone:</h3>
                <p>{shippingInfo && shippingInfo.phone}</p>
              </div>

              <div className="userDetails">
                <h3>Address:</h3>
                <p>{shippingInfo && shippingInfo.address}</p>
              </div>
            </div>

            {/*  */}
            <div className="userCartDetails">
              <h2 style={{color:bgColors?bgColors:""}}>Your Cart Items</h2>

              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <div className="box1">
                      <img
                        style={{ borderRadius: "4px" }}
                        width={60}
                        src={item.image}
                        alt={`imageName ${item.name}`}
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
            <h2>Order Summary</h2>
            {cartItems &&
              cartItems.map((item) => (
                <>
                  <div>
                    <h3>Subtotal:</h3>
                    <p>${item.price * item.quantity}</p>
                  </div>
                  <div>
                    <h3>ShippingTax:</h3>
                    <p>${orderSummary && orderSummary.shippingTax}</p>
                  </div>

                  <div>
                    <h3>GST:</h3>
                    <p>${orderSummary && orderSummary.tax}</p>
                  </div>

                  <div>
                    <h3>Total:</h3>
                    <p>${orderSummary && orderSummary.Total}</p>
                  </div>
                </>
              ))}

            <button onClick={proceedToPaymentHandler}>
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
