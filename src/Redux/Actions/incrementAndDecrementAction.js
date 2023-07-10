import { incrementReducer, decrementReducer } from "../Reducers/CartReducer";

// TODO{<---------------General Loading Reducer---------------->}

export const incrementToCartAction =
  (product, quantity, stock) => async (dispatch, getState) => {
    dispatch(incrementReducer(product, quantity, stock));

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const decrementToCartAction =
  (product, quantity, stock) => async (dispatch, getState) => {
    dispatch(decrementReducer(product, quantity, stock));

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
