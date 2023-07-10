import React, { useEffect } from "react";

// *{<---------------------   CSS FILE  ------------------------------->}
import "./account.css";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import Loader from "../../common_components/Loader/Loader";
import Titles from "../../MetaData/MetaData";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const Account = ({ mode, loadUserSuccess }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}

  const history = useNavigate();
  const dispatch = useDispatch();

  // *{<---------------------------  USESELECTOR   -------------------------->}
  const { user } = useSelector((state) => state.User);
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { bgColors } = useSelector((state) => state.Colors);

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  function accountPageGoUpFunction() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }

  // TODO{<------------------------ USE EFFECT HOOK  --------------------------->}

  useEffect(() => {
    if (loadUserSuccess === false) {
      history("/register");
    }
  }, [dispatch, loadUserSuccess, history]);

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <>
      <Titles title={"Account Setting"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <div
          id="account"
          style={{
            backgroundColor: mode ? "#000000" : "#ffffff",
            color: mode ? "#ffffff" : "#000000"
          }}
        >
          <div className="box1">
            <img src={user && user.cover && user.cover.url} alt="cover" />
          </div>
          <span>
            <img src={user && user.avatar &&user.avatar.url} alt="profiile" />
          </span>
          <div className="box2">
            <div>
              <h4
                style={{
                  color: bgColors ? bgColors : mode ? "#ffffff" : "#000000",
                }}
              >
                Full name
              </h4>
              <p>{user && user.name}</p>
            </div>

            <div>
              <h4
                style={{
                  color: bgColors ? bgColors : mode ? "#ffffff" : "#000000",
                }}
              >
                Email
              </h4>
              <p>{user && user.email}</p>
            </div>

            <div>
              <h4
                style={{
                  color: bgColors ? bgColors : mode ? "#ffffff" : "#000000",
                }}
              >
                Joined On
              </h4>
              <p>{String(user&& user.createdAt).substring(0, 10)}</p>
            </div>

            <NavLink
              onClick={accountPageGoUpFunction}
              to={"/updateProfile"}
              style={{
                backgroundColor: mode ? "white" : "black",
                color: mode ? "black" : "white",
              }}
            >
              Update Profile
            </NavLink>
            <NavLink
              onClick={accountPageGoUpFunction}
              to={"/updatePassword"}
              style={{
                backgroundColor: mode ? "white" : "black",
                color: mode ? "black" : "white",
              }}
            >
              Update Password
            </NavLink>
            <NavLink
              onClick={accountPageGoUpFunction}
              to={"/myOrders"}
              style={{
                backgroundColor: mode ? "white" : "black",
                color: mode ? "black" : "white",
              }}
            >
              My Orders
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
