import React, { Fragment, useEffect, useRef } from "react";
// *{<---------------------   CSS FILE  ------------------------------->}
import "./payment.css";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import StepperComponent from "../../common_components/StepperComponent/Stepper";
import Titles from "../../MetaData/MetaData";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";

// *{<---------------------  MATERIAL UI  ------------------------------->}
import { Typography } from "@mui/material";

// *{<--------------------   LOCAL STORAGE  -------------------->}

const orderSummary = JSON.parse(localStorage.getItem("orderSummary"));
const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
const cartItems = JSON.parse(localStorage.getItem("cartItems"));

const Payment = ({ loadUserSuccess, mode }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}
  const history = useNavigate();
  const payBtn = useRef();

  // *{<---------------------------  USESELECTOR   -------------------------->}
  const { user } = useSelector((state) => state.User);

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const amount = Number(orderSummary.Total * 100);

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const protocol = window.location.protocol;
      const host = process.env.REACT_APP_BACKEND_PORT;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      //type 1 data demand fullfilling

      const {
        data: { API_KEY, RAZORPAY_SECRET_KEY },
      } = await axios.get("/api/v1/razorApiKey");
      //type 2 data demand fullfilling

      const {
        data: { order },
      } = await axios.post("/api/v1/payment/process", { amount }, config);

      const options = {
        API_KEY,
        amount: order.amount,
        currency: "PKR",
        name: user && user.name,
        description: "Tutorial of RazorPay",
        image: user && user.avatar.url,
        order_id: order.id,
        handler: async function (response) {
          const razorpay_order_id = response.razorpay_order_id;
          const razorpay_payment_id = response.razorpay_payment_id;
          const razorpay_signature = response.razorpay_signature;

          const body = razorpay_order_id + "|" + razorpay_payment_id;
          const expectedSignature = CryptoJS.HmacSHA256(
            body.toString(),
            RAZORPAY_SECRET_KEY
          ).toString();

          //     console.log("sig received ", response.razorpay_signature);
          // console.log("sig generated ", expectedSignature);
          const Authenticated = razorpay_signature === expectedSignature;
          try {
            if (Authenticated) {
              const { data } = await axios.post(
                `${protocol}//${host}/api/v1/paymentVerification`,
                {
                  orderSummary,
                  shippingInfo,
                  cartItems,
                  razorpay_order_id,
                  razorpay_payment_id,
                  razorpay_signature,
                  user,
                },
                config
              );
              window.confirm(
                `✅ Payment Successfully Your reference id is ${data.message}`
              );
            }
          } catch (error) {
            console.log(error.message);
          }
        },
        prefill: {
          name: user && user.name,
          email: user && user.email,
          contact: shippingInfo && shippingInfo.phone,
        },
        notes: {
          address: shippingInfo && shippingInfo.address,
        },
        theme: {
          color: "#121212",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error.response.data);
    }
  };

  // TODO{<------------------------ USE EFFECT HOOK  --------------------------->}

  useEffect(() => {
    if (loadUserSuccess === false) {
      history("/register");
    }
  }, [loadUserSuccess, history]);

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <Fragment>
      <Titles title={"Confirm Payment"} />
      <StepperComponent mode={mode} activeStep={2} />
      <div
        id="paymentContainer"
        style={{
          backgroundColor: mode ? "#000000" : "#ffffff",
          color: mode ? "#ffffff" : "#000000",
        }}
      >
        <form className="paymentForm" onSubmit={submitHandler}>
          <Typography></Typography>

          <input
            type="submit"
            value={`Pay - $ ${orderSummary && orderSummary.Total}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
