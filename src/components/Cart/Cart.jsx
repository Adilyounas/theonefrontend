import React from "react";

// *{<---------------------   CSS FILE  ------------------------------->}
import "./cart.css";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import Titles from "../MetaData/MetaData";
import CartItem from "./CartItem.jsx";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

// *{<---------------------  MATERIAL UI ICONS  ------------------------------->}
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const Cart = ({mode}) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}
  const history = useNavigate();

  // *{<---------------------------  USESELECTOR   -------------------------->}

  const { cartItems, tax, subTotal, shippingTax, Total } = useSelector(
    (state) => state.cart
  );

  // *{<--------------------    REGULAR FUNCITONS  -------------------->}

  const checkoutHandler = () => {
    history("/shipping");
    localStorage.setItem(
      "orderSummary",
      JSON.stringify({ tax, subTotal, shippingTax, Total })
    );
  };

  // *{<--------------------    RETURN STATEMENT -------------------->}

  return (
    <div id="cart_Container" style={{backgroundColor:mode?"#000000":"#ffffff",color:mode?"#ffffff":"#000000"}}>
      <Titles title={"Cart Page"} />
      <div className="mainContainer">
        <div className="cartItemBox">
          {cartItems && cartItems.length === 0 ? (
            <div className="notItemAdded">
              <RemoveShoppingCartIcon />
              <h1>No Item Added Yet</h1>
              <NavLink to={"/products"}>View Products</NavLink>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <CartItem key={index} product={item} />
            ))
          )}
        </div>
        <div id="priceDetailContainer">
          <div>
            <div>
              <p>SubTotal</p>
              <span>{subTotal}</span>
            </div>
            <div>
              <p>ShippingTax</p>
              <span>{shippingTax}</span>
            </div>
            <div>
              <p>GST</p>
              <span>{tax}</span>
            </div>
            <div>
              <p>Total</p>
              <span>{Total}</span>
            </div>

            <button onClick={checkoutHandler}>Check Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
