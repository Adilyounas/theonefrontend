import React, { useState } from "react";

// *{<---------------------   CSS FILE  ------------------------------->}
import "./header.css";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import logo from "../../assets/logo2.svg";
import { setBgColors, setModez } from "../../Redux/Reducers/Theming";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// *{<---------------------  MATERIAL UI ICONS  ------------------------------->}
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import MenuIcon from "@mui/icons-material/Menu";
import FlareRoundedIcon from "@mui/icons-material/FlareRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

// *{<---------------------  MATERIAL UI  ------------------------------->}
import { Badge, Button, Drawer, Modal, Tooltip } from "@mui/material";

// *{<------------------------     DECLARING VARIABLES  -------------------------->}

const bgColorVar = [
  "#ffaa00",
  "#045c6a",
  "#ce5a48",
  "#e8a679",
  "#6d6df2",
  "#ea0a07",
  "#000000",
];

const Header = ({ mode, setMode }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}
  const dispatch = useDispatch();

  // *{<---------------------------  USESELECTOR   -------------------------->}
  const { bgColors } = useSelector((state) => state.Colors);
  const { cartItems } = useSelector((state) => state.cart);

  // *{<--------------------    USE STATE   -------------------->}

  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const closeDrawerHandler = () => {
    setOpenDrawer(false);
  };

  const lightModeHandler = () => {
    setMode(false);
    dispatch(setModez(false));
  };

  const darkModeHandler = () => {
    setMode(true);
    dispatch(setModez(true));
  };

  const colorPickerHandler = (e) => {
    if (e.target.innerText === "#000000") {
      localStorage.removeItem("colors");

      window.location.reload();
      return;
    } else {
      dispatch(setBgColors(e.target.innerText));

      localStorage.setItem("colors", JSON.stringify(e.target.innerText));
      setOpenDrawer(false);
    }
  };

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <div className="headerContainer">
      <Button
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          top: "5%",
          left: "4%",
          zIndex: 10000,
        }}
        startIcon={
          open ? (
            <CloseIcon
              sx={{ color: bgColors ? bgColors : "red" }}
              className="closeIcon"
            />
          ) : (
            <MenuIcon
              className="burgerIcon"
              sx={
                bgColors
                  ? { color: bgColors }
                  : { color: mode ? "#ffffff" : "#000000" }
              }
            />
          )
        }
      />
      <Button
        onClick={() => setOpenDrawer(!openDrawer)}
        sx={{
          position: "fixed",
          top: "5%",
          right: "4%",
          zIndex: 1299,
        }}
        startIcon={
          openDrawer ? (
            ""
          ) : (
            <ArrowCircleLeftIcon
              sx={
                bgColors
                  ? { color: bgColors }
                  : { color: mode ? "#ffffff" : "#000000" }
              }
              className="burgerIcon"
            />
          )
        }
      />

      <Drawer
        sx={{
          zIndex: 10000,
        }}
        anchor="right"
        open={openDrawer}
        onClose={closeDrawerHandler}
      >
        <div className="drawerContainer">
          <div>
            <p>Close</p>
            <Button
              onClick={() => setOpenDrawer(false)}
              startIcon={<CloseIcon />}
            />
          </div>
          {/* second div */}

          <div>
            <p>MODE</p>
            <div>
              <Button
                sx={mode ? { color: "white" } : { color: "black" }}
                onClick={lightModeHandler}
                startIcon={<FlareRoundedIcon />}
              >
                Light
              </Button>
              <span></span>
              <Button
                sx={mode ? { color: "white" } : { color: "black" }}
                onClick={darkModeHandler}
                startIcon={<DarkModeRoundedIcon />}
              >
                Dark
              </Button>
            </div>
          </div>

          {/* 3rd div */}

          <div>
            <p>THEME COLORS</p>
            <div>
              {bgColorVar &&
                bgColorVar.map((color, index) => (
                  <div
                    key={index}
                    onClick={colorPickerHandler}
                    style={{
                      backgroundColor: color,
                      cursor: "pointer",
                    }}
                  >
                    {color}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Drawer>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalContainer">
          <ul>
            <li onClick={() => setOpen(false)}>
              <NavLink to={"/"}>
                <img src={logo} alt="logo" />
              </NavLink>
            </li>

            <li onClick={() => setOpen(false)}>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li onClick={() => setOpen(false)}>
              <NavLink
                style={{
                  '[activeClassName="active"]': {
                    color: bgColors,
                  },
                }}
                to={"/products"}
              >
                Products
              </NavLink>
            </li>
            <li onClick={() => setOpen(false)}>
              <NavLink to={"/aboutUs"}>About Us</NavLink>
            </li>
            <li onClick={() => setOpen(false)}>
              <NavLink to={"contact"}>Contact</NavLink>
            </li>

            <div className="iconContainer">
              <Tooltip title={"Open Cart Page"}>
                <NavLink onClick={() => setOpen(false)} to={"cart"}>
                  <Badge
                    color="secondary"
                    badgeContent={cartItems.length >= 1 && cartItems.length}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </NavLink>
              </Tooltip>

              <Tooltip title={"Open Register Page"}>
                <NavLink to={"/register"} onClick={() => setOpen(false)}>
                  <AccountCircleRoundedIcon />
                </NavLink>
              </Tooltip>
            </div>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
