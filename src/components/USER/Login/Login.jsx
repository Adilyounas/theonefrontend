import React, { useEffect, useState } from "react";

// *{<---------------------   CSS FILE  ------------------------------->}
import "./login.css";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import Loader from "../../common_components/Loader/Loader";
import Titles from "../../MetaData/MetaData";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// *{<---------------------  ACTIONS  ------------------------------->}
import { loginUser } from "../../../Redux/Actions/login";

// *{<---------------------  MATERIAL UI ICONS  ------------------------------->}
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";

const Login = ({ loadUserSuccess,mode }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}

  // *{<---------------------------  USESELECTOR   -------------------------->}
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { bgColors } = useSelector((state) => state.Colors);

  // *{<--------------------    USE STATE   -------------------->}
  const [showPasswordState, setShowPasswordState] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const showPassword = () => {
    const password = document.getElementById("login-password");
    if (password.type === "password") {
      password.type = "text";
      setShowPasswordState(!showPasswordState);
    } else {
      password.type = "password";
      setShowPasswordState(!showPasswordState);
    }
  };

  const loginFormSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("password", password);
    formData.set("email", email);
    dispatch(loginUser(formData));

    setPassword("");
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
      <Titles title={"Login Page"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <div id="loginFormContainer" style={{
            backgroundColor: mode ? "#000000" : "#ffffff",
            color: mode ? "#ffffff" : "#000000"
          }}>
          <form onSubmit={loginFormSubmitHandler}>
            <h1 style={{color:bgColors?bgColors:"" }}  >Login</h1>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>
              <input
                id="login-password"
                type="password"
                name="password"
                required
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={showPassword}>
                {showPasswordState ? (
                  <VisibilityOffTwoToneIcon />
                ) : (
                  <RemoveRedEyeTwoToneIcon />
                )}
              </span>
            </span>

            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
