import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
let localStorageInitialState = JSON.parse(localStorage.getItem("cartItems"));


let initialState = {
  cartItems: localStorage.getItem("cartItems") ? localStorageInitialState : [],
  tax: 0,
  subTotal: 0,
  shippingTax: 0,
  Total: 0,
  presentSomeThing: false,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, name, price, stock, quantity, image } = action.payload;
      const isExist = state.cartItems.find(
        (i) => i.product.toString() === product.toString()
      );

      if (isExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isExist.product
              ? { product, name, price, stock, quantity, image }
              : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            { product, name, price, stock, quantity, image },
          ],
        };
      }
    },


    incrementReducer: (state, action) => {
      const product = action.payload;

      const isExist = state.cartItems.find((item) => item.product === product);
      if (isExist) {
        state.cartItems.forEach((item) => {
          if (item.product === product) {
            if (item.stock <= item.quantity) {
              toast.error("Stock Limit", { duration: 1000 });
            } else {
              item.quantity++;
            }
          }
        });
      }
    },

    decrementReducer: (state, action) => {
      const product = action.payload;

      const isExist = state.cartItems.find((item) => item.product === product);
      if (isExist) {
        state.cartItems.forEach((item) => {
          if (item.product === product) {
            if (1 >= item.quantity) {
              toast.error("Minimum 1 Product", { duration: 1000 });
            } else {
              item.quantity--;
            }
          }
        });
      }
    },

    deleteItemFromCart: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    },
    calculate: (state, action) => {
      let sum = 0;

      state.cartItems.forEach((item) => {
        sum += item.price * item.quantity;
      });
      state.subTotal = sum;
      state.shippingTax =
        state.subTotal > 2000 ? 0 : state.subTotal === 0 ? 0 : 150;
      state.tax = +(state.subTotal * 0.18).toFixed(); //important coz to fix give you string

      state.Total = state.subTotal + state.shippingTax + state.tax;
    },
  },
});

export default cartSlice.reducer;

export const {
  addToCart,
  incrementReducer,
  decrementReducer,
  getAllProductsAllRequest,
  deleteItemFromCart,
  calculate,
} = cartSlice.actions;
