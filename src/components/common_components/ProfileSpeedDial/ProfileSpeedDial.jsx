import React, { useEffect, useState } from "react";
// *{<---------------------   CSS FILE  ------------------------------->}
import "./ProfileSpeedDial.css";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// *{<---------------------  ACTIONS  ------------------------------->}
import { logOutUser } from "../../../Redux/Actions/logOut";

// *{<---------------------  MATERIAL UI ICONS  ------------------------------->}
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContentCutIcon from "@mui/icons-material/ContentCut";

// *{<---------------------  MATERIAL UI  ------------------------------->}
import { Backdrop, Badge, SpeedDial, SpeedDialAction } from "@mui/material";

const ProfileSpeedDial = ({ mode }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  // *{<---------------------------  USESELECTOR   -------------------------->}
  const { user, success } = useSelector((state) => state.User);
  const { cartItems } = useSelector((state) => state.cart);

  // *{<--------------------    USE STATE   -------------------->

  const [speedDialCondition, setSpeedDialCondition] = useState(false);

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const cartPage = () => {
    setSpeedDialCondition(false);
    Navigate("/cart");
  };

  const myorders = () => {
    setSpeedDialCondition(false);
    Navigate("/myOrders");
  };

  const myProfile = () => {
    setSpeedDialCondition(false);
    Navigate("/myProfile");
  };
  const dashbord = () => {
    setSpeedDialCondition(false);
    Navigate("/admin/dashboard");
  };

  const cropImage = () => {
    setSpeedDialCondition(false);
    Navigate("/admin/cropImage");
  };

  const logOut = () => {
    setSpeedDialCondition(false);
    dispatch(logOutUser());
    Navigate("/register");
  };

  // *{<------------------------     DECLARING VARIABLES  -------------------------->}

  const actions = [
    {
      icon: (
        <Badge
          color="secondary"
          badgeContent={cartItems.length >= 1 && cartItems.length}
          showZero
        >
          <ShoppingCartIcon style={{ color: "black" }} />
        </Badge>
      ),
      name: "Cart",
      fun: cartPage,
    },
    { icon: <PlaylistAddCheckIcon />, name: "Orders", fun: myorders },
    { icon: <ManageAccountsIcon />, name: "Account", fun: myProfile },
    { icon: <LogoutIcon />, name: "LogOut", fun: logOut },
  ];

  if (user.role === "admin") {
    actions.unshift(
      { icon: <DashboardIcon />, name: "Dashbord", fun: dashbord },
      { icon: <ContentCutIcon />, name: "Crop", fun: cropImage }
    );
  }
  // TODO{<------------------------ USE EFFECT HOOK  --------------------------->}

  useEffect(() => {
    if (success === false) {
      return () => {
        Navigate("/register");
      };
    }
  }, [Navigate, success]);

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <div className="ProfileSpeedDial">
      <Backdrop open={speedDialCondition} />
      <SpeedDial
        ariaLabel="SpeedDial User Profile"
        direction="down"
        sx={{
          position: "fixed",
          top: "15%",
          right: "5%",
          ".MuiSpeedDial-fab": {
            boxShadow: mode
              ? "0px 0px 10px white"
              : "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
          },
        }}
        icon={
          <img
            style={{ borderRadius: "50%" }}
            src={user.avatar.url}
            id="speedDialImage"
            alt="Avatar"
          />
        }
        onClose={() => setSpeedDialCondition(false)}
        onClick={() => setSpeedDialCondition(!speedDialCondition)}
        open={speedDialCondition}
        onMouseOver={() => setSpeedDialCondition(true)}
      >
        {actions &&
          actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={action.fun}
            />
          ))}
      </SpeedDial>
    </div>
  );
};

export default ProfileSpeedDial;
