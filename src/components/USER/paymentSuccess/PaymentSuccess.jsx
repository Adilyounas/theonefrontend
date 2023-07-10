import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./paymentSuccess.css";
import Titles from "../../MetaData/MetaData";

const PaymentSuccess = ({ loadUserSuccess }) => {
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (loadUserSuccess === false) {
      history("/register");
    }
  }, [loadUserSuccess, history]);

  return (
    <>
      <Titles title={"Payment Success"} />
      <div className="success_Main_div">
        <div>Reference Number: {id}</div>
      </div>
    </>
  );
};

export default PaymentSuccess;
