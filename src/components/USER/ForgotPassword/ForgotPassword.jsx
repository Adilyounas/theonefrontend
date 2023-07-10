import React, { useEffect, useState } from "react";
// *{<---------------------   CSS FILE  ------------------------------->}
import "./forgotPassword.css";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}

import Loader from "../../common_components/Loader/Loader";
import Titles from "../../MetaData/MetaData";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// *{<---------------------  ACTIONS  ------------------------------->}
import { forgotPassword } from "../../../Redux/Actions/forgotPassword";

const ForgotPassword = ({ mode, loadUserSuccess }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}

  const history = useNavigate();
  const dispatch = useDispatch();

  // *{<---------------------------  USESELECTOR   -------------------------->}
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { bgColors } = useSelector((state) => state.Colors);


  // *{<--------------------    USE STATE   -------------------->}
  const [email, setEmail] = useState("");

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const forgotPasswordFormSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    dispatch(forgotPassword(formData));
    setEmail("");
  };

  // TODO{<------------------------ USE EFFECT HOOK  --------------------------->}

  useEffect(() => {
    if (loadUserSuccess === true) {
      history("/myProfile");
    }
  }, [history, loadUserSuccess]);

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <>
      <Titles title={"Forgot Password"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <div
          id="forgotPasswordFormContainer"
          style={{
            backgroundColor: mode ? "black" : "white",
            color: mode ? "white" : "black",
          }}
        >
          <form onSubmit={forgotPasswordFormSubmitHandler}>
            <h1 style={{color:bgColors?bgColors:""}}>Forgot Password</h1>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
             style={{backgroundColor:mode?"white":"black",color:mode?"#000000":"#ffffff"}}
              type="submit"
            >
              Send Email
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
