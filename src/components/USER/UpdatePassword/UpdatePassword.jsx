import React, { useEffect, useState } from "react";
// *{<---------------------   CSS FILE  ------------------------------->}

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import Loader from "../../common_components/Loader/Loader";
import Titles from "../../MetaData/MetaData";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// *{<---------------------  ACTIONS  ------------------------------->}
import { updatePassword } from "../../../Redux/Actions/updatePassword";
import { updatePasswordResetStates } from "../../../Redux/Reducers/updatePassword";

// *{<---------------------  MATERIAL UI ICONS  ------------------------------->}
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";

// !{<---------------------  COMPONET START FROM HERE ------------------------------->}

const UpdatePassword = ({ loadUserSuccess,mode }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}
  const history = useNavigate();
  const dispatch = useDispatch();

  // *{<---------------------------  USESELECTOR   -------------------------->}

  const { success } = useSelector((state) => state.updatePassword);
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { bgColors } = useSelector((state) => state.Colors);

  // *{<--------------------    USE STATE   -------------------->}
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const updatePasswordFormSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(formData));

    setOldPassword("");
    setPassword("");
    setConfirmPassword("");
  };

  const showPasswordHandler = () => {
    const password = document.getElementById("updateOldPassword");
    if (password.type === "password") {
      password.type = "text";
      setShowOldPassword(!showOldPassword);
    } else {
      password.type = "password";
      setShowOldPassword(!showOldPassword);
    }
  };

  const showPasswordHandler2 = () => {
    const password = document.getElementById("updatepassword");
    if (password.type === "password") {
      password.type = "text";
      setShowPassword(!showPassword);
    } else {
      password.type = "password";
      setShowPassword(!showPassword);
    }
  };

  const showPasswordHandler3 = () => {
    const password = document.getElementById("updateConfirmPassword");
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
      history("/myProfile");
      dispatch(updatePasswordResetStates());
    }

    if (loadUserSuccess === false) {
      history("/register");
    }
  }, [dispatch, history, success, loadUserSuccess]);

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <>
      <Titles title={"Update Password"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <div id="loginFormContainer" style={{
            backgroundColor: mode ? "#000000" : "#ffffff",
            color: mode ? "#ffffff" : "#000000"
          }}>
          <form onSubmit={updatePasswordFormSubmitHandler}>
            <h1 style={{color:bgColors?bgColors:mode?"#ffffff":"#000000" }}>Update Password</h1>

            <span>
              <input
                id="updateOldPassword"
                type="password"
                name="oldPassword"
                required
                placeholder="Enter your Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <span onClick={showPasswordHandler}>
                {showOldPassword ? (
                  <VisibilityOffTwoToneIcon />
                ) : (
                  <RemoveRedEyeTwoToneIcon />
                )}
              </span>
            </span>

            <span>
              <input
                id="updatepassword"
                type="password"
                name="password"
                required
                placeholder="Enter your Password"
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
                id="updateConfirmPassword"
                type="password"
                name="confirmPassword"
                required
                placeholder="Enter your Confirm Password"
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

            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;
