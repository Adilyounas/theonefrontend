import React, { useEffect } from "react";

// *{<---------------------   CSS FILE  ------------------------------->}
import "./cartItem.css";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useDispatch } from "react-redux";

// *{<---------------------  ACTIONS  ------------------------------->}
import { removeToCartAction } from "../../Redux/Actions/removeToCart";
import {
  incrementToCartAction,
  decrementToCartAction,
} from "../../Redux/Actions/incrementAndDecrementAction";

// *{<---------------------  REDUCERS ------------------------------->}
import { calculate } from "../../Redux/Reducers/CartReducer";

// *{<---------------------  MATERIAL UI ICONS  ------------------------------->}
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ product }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}
  const dispatch = useDispatch();

  // *{<---------------------------  REGULAR FUNCTIONS   -------------------------->}
  const cartIncrement = (productId, quantity, stock) => {
    dispatch(incrementToCartAction(productId, quantity, stock));
    console.log(productId);
    dispatch(calculate());
  };

  const cartDecrement = (productId, quantity) => {
    console.log(productId);

    dispatch(decrementToCartAction(productId, quantity));
    dispatch(calculate());
  };

  const deleteItem = (productId) => {
    dispatch(removeToCartAction(productId));
    dispatch(calculate());
  };

  // TODO{<---------------------------  USEEFFECT  -------------------------->}

  useEffect(() => {
    dispatch(calculate());
  }, [dispatch]);

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <div id="item">
      <div>
        <img src={product.image} alt={`${product.name} /img`} />
        <div className="details_div">
          <h3>{product.name}</h3>
          <span>${product.price}</span>
        </div>
      </div>

      {/* nth:child(2) */}
      <div>
        <button
          onClick={() =>
            cartDecrement(product.product, product.quantity, product.stock)
          }
        >
          -
        </button>
        <span>{product.quantity}</span>
        <button
          onClick={() =>
            cartIncrement(product.product, product.quantity, product.stock)
          }
        >
          +
        </button>
        <div className="icon_div">
          <DeleteIcon
            className="deleteIcon"
            onClick={() => deleteItem(product.product)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
