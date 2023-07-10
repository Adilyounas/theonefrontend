import React, { useEffect, useState } from "react";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import Loader from "../../common_components/Loader/Loader";
import Titles from "../../MetaData/MetaData";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// *{<---------------------  ACTIONS  ------------------------------->}
import { resetPassword } from "../../../Redux/Actions/resetPassword";
import { loadUser } from "../../../Redux/Actions/loadUser";

// *{<---------------------  MATERIAL UI ICONS  ------------------------------->}
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";

const ResetPassword = ({ loadUserSuccess,mode }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}
  const history = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();

  // *{<---------------------------  USESELECTOR   -------------------------->}

  const { success } = useSelector((state) => state.resetpassword);
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { bgColors } = useSelector((state) => state.Colors);

  // *{<--------------------    USE STATE   -------------------->}
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const updatePasswordFormSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(formData, token));

    setPassword("");
    setConfirmPassword("");
  };

  const showPasswordHandler2 = () => {
    const password = document.getElementById("resetPassword");
    if (password.type === "password") {
      password.type = "text";
      setShowPassword(!showPassword);
    } else {
      password.type = "password";
      setShowPassword(!showPassword);
    }
  };

  const showPasswordHandler3 = () => {
    const password = document.getElementById("resetConfirmPassword");
    if (password.type === "password") {
      password.type = "text";
      setShowConfirmPassword(!showConfirmPassword);
    } else {
      password.type = "password";
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  // TODO{<------------------------ USE EFFECT HOOK  --------------------------->}

  useEffect(() => {
    if (success === true) {
      dispatch(loadUser());
      history("/myProfile");
    }

    if (loadUserSuccess === true) {
      history("/myProfile");
    }
  }, [dispatch, history, success, loadUserSuccess]);
  
  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <>
      <Titles title={"Reset Password"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <div id="loginFormContainer" style={{
            backgroundColor: mode ? "#000000" : "#ffffff",
            color: mode ? "#ffffff" : "#000000"
          }}>
          <form onSubmit={updatePasswordFormSubmitHandler}>
            <h1 style={{color:bgColors?bgColors:mode?"#ffffff":"#000000"}}>Reset Password</h1>

            <span>
              <input
                id="resetPassword"
                type="password"
                name="password"
                required
                placeholder="Enter New Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={showPasswordHandler2}>
                {showPassword ? (
                  <VisibilityOffTwoToneIcon />
                ) : (
                  <RemoveRedEyeTwoToneIcon />
                )}
              </span>
            </span>

            <span>
              <input
                id="resetConfirmPassword"
                type="password"
                name="confirmPassword"
                required
                placeholder="Enter Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span onClick={showPasswordHandler3}>
                {showConfirmPassword ? (
                  <VisibilityOffTwoToneIcon />
                ) : (
                  <RemoveRedEyeTwoToneIcon />
                )}
              </span>
            </span>

            <button type="submit">Reset</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
