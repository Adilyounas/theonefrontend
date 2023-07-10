import { configureStore } from "@reduxjs/toolkit";
import themingColors from "./Redux/Reducers/Theming";

// {<------------For Admin------------->}
import createProduct from "./Redux/Reducers/createproduct";

// {<------------For user------------->}
import login from "./Redux/Reducers/login";
import getProducts from "./Redux/Reducers/getProducts";
import getFeatureProducts from "./Redux/Reducers/getFeatureProducts";
import likeAndDislike from "./Redux/Reducers/putLikeAndDislike";
import generalLoading from "./Redux/Reducers/generalLoading";
import SingleProduct from "./Redux/Reducers/SingleProduct";
import loadUser from "./Redux/Reducers/loadUser";
import updateProfile from "./Redux/Reducers/updateProfile";
import updatePassword from "./Redux/Reducers/updatePassword";
import forgotPassword from "./Redux/Reducers/forgotPassword";
import resetpassword from "./Redux/Reducers/resetpassword";
import cartSlice from "./Redux/Reducers/CartReducer";
import ShippingInfo from "./Redux/Reducers/shippingInfoReducer";
import MyOrders from "./Redux/Reducers/myOrders";
import SingleOrder from "./Redux/Reducers/singleOrder";
import Reviews from "./Redux/Reducers/Reviews";

import AllProductList from "./Redux/Reducers/Admin/productList";
import DeleteProduct from "./Redux/Reducers/Admin/deleteProduct";

import AllUserList from "./Redux/Reducers/Admin/userList";
import AllOrderList from "./Redux/Reducers/Admin/ordersList";
import DeleteOrder from "./Redux/Reducers/Admin/deleteOrder";

import DeleteUser from "./Redux/Reducers/Admin/deleteUser";

import SingleOrderAdmin from "./Redux/Reducers/Admin/singleOrder";
import SingleUser from "./Redux/Reducers/Admin/getSingleUser";
import AllReviews from "./Redux/Reducers/Admin/ReviewsList";
import AddReview from "./Redux/Reducers/addReviews";

const store = configureStore({
  reducer: {
    Colors: themingColors,
    createProduct,
    login,
    getProducts,
    getFeatureProducts,
    likeAndDislike,
    generalLoading,
    SingleProduct,
    User: loadUser,
    updateProfile,
    updatePassword,
    forgotPassword,
    resetpassword,
    cart: cartSlice,
    ShippingInfo,
    MyOrders,
    SingleOrder,
    Reviews,
    AllProductList,
    DeleteProduct,
    AllUserList,
    DeleteUser,
    AllOrderList,
    DeleteOrder,
    SingleOrderAdmin,
    SingleUser,
    AllReviews,
    AddReview,
  },
});

export default store;
