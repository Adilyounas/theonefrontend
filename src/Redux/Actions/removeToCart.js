import { toast } from "react-hot-toast";
import { deleteItemFromCart } from "../Reducers/CartReducer";

// TODO{<---------------General Loading Reducer---------------->}

export const removeToCartAction = (productId) => async (dispatch, getState) => {
  dispatch(deleteItemFromCart(productId));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  toast.custom("Removed from cart");
};
