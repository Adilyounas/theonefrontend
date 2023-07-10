// *{<------------------ Simple IMPORTS ------------------->}
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// *{<------------------CSS File------------------->}
import "./App.css";

// *{<------------------      LIBARARIES      ------------------->}
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

// *{<------------------     ACTION    ------------------->}
import { loadUser } from "./Redux/Actions/loadUser";

// *{<------------------    IMPORT COMPONENTS FROM OTHER FILE   ------------------->}
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import AboutUs from "./components/About Us/AboutUs";
import ContactUs from "./components/Contact Us/ContactUs";
import ProfileSpeedDial from "./components/common_components/ProfileSpeedDial/ProfileSpeedDial.jsx";
import Goup from "./components/common_components/GoUp/Goup";
import AccountSetting from "./components/USER/AccountSetting/Account";
import PageNotFound from "./components/404/PageNotFound";
import SingleProductPage from "./components/SingleProductPage/SingleProductPage";
import Cart from "./components/Cart/Cart";
import Register from "./components/USER/Register/Register";
import Login from "./components/USER/Login/Login";
import ForgotPassword from "./components/USER/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/USER/ResetPassword/ResetPassword";
import MyOrders from "./components/USER/MyOrders/MyOrders";
import Shipping from "./components/USER/Shipping/Shipping";
import ConfirmOrder from "./components/USER/ConfirmOrder/ConfirmOrder";
import SingleOrder from "./components/USER/SingleOrder/SingleOrder";
import UpdateProfile from "./components/USER/UpdateProfile/UpdateProfile";
import UpdatePassword from "./components/USER/UpdatePassword/UpdatePassword";
import Payment from "./components/USER/Payment/Payment";
import PaymentSuccess from "./components/USER/paymentSuccess/PaymentSuccess";

// *{<------------------IMPORT ADMIN COMPONENTS------------------->}
import CropImage from "./components/ADMIN/CropImage/CropImage";
import Dashbord from "./components/ADMIN/Dashbord/Dashbord";
import CeateProduct from "./components/ADMIN/CeateProduct/CeateProduct";
import OrderList from "./components/ADMIN/All Orders/OrderList";
import ProductList from "./components/ADMIN/All Products/ProductList";
import ReviewList from "./components/ADMIN/All Reviews/ReviewList";
import UserList from "./components/ADMIN/All Users/UserList";
import UpdateProduct from "./components/ADMIN/Update Product/UpdateProduct";
import UpdateOrder from "./components/ADMIN/Update Order/UpdateOrder";
import UpdateUser from "./components/ADMIN/Update User/UpdateUser.jsx";

//TODO *{<------------------APP COMPONENT START FROM HERE------------------->}
function App() {
  const [mode, setMode] = useState(false);
  const dispatch = useDispatch();
  const { loadUserSuccess } = useSelector((state) => state.User);

  const customTheme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Header mode={mode} setMode={setMode} />
        {loadUserSuccess === true && (
          <ProfileSpeedDial mode={mode} setMode={setMode} />
        )}
        <Routes>
          {/* //TODO{<--------------Main web app Pages------------->} */}

          <Route path="/" element={<Home mode={mode} />} />
          <Route path="/products" element={<Products mode={mode} />} />
          <Route path="/aboutUs" element={<AboutUs mode={mode} />} />
          <Route path="/contact" element={<ContactUs mode={mode} />} />

          {/* //TODO{<-------------- Sub Pages------------->} */}

          <Route
            path="/singleProduct/:productId"
            element={<SingleProductPage mode={mode} />}
          />

          <Route path="*" element={<PageNotFound mode={mode} />} />
          <Route path="/cart" element={<Cart mode={mode} />} />

          {/* //TODO{<--------------Pages for Users------------->} */}


          <Route
            path="/register"
            element={<Register loadUserSuccess={loadUserSuccess} mode={mode} />}
          />

          <Route
            path="/login"
            element={<Login loadUserSuccess={loadUserSuccess} mode={mode} />}
          />

          <Route
            path="/forgotPassword"
            element={
              <ForgotPassword loadUserSuccess={loadUserSuccess} mode={mode} />
            }
          />
          <Route
            path="/api/v1/resetPassword/:token"
            element={
              <ResetPassword loadUserSuccess={loadUserSuccess} mode={mode} />
            }
          />




          {/* //TODO{<--------------   LOGIN USER     ------------->} */}
          <Route
            path="/myProfile"
            element={
              <AccountSetting loadUserSuccess={loadUserSuccess} mode={mode} />
            }
          />


          <Route
            path="/updateProfile"
            element={
              <UpdateProfile loadUserSuccess={loadUserSuccess} mode={mode} />
            }
          />

          <Route
            path="/updatePassword"
            element={
              <UpdatePassword loadUserSuccess={loadUserSuccess} mode={mode} />
            }
          />

          <Route
            path="/myOrders"
            element={<MyOrders loadUserSuccess={loadUserSuccess} mode={mode} />}
          />

          <Route
            path="/shipping"
            element={<Shipping loadUserSuccess={loadUserSuccess} mode={mode} />}
          />

          <Route
            path="/order/confirm"
            element={
              <ConfirmOrder loadUserSuccess={loadUserSuccess} mode={mode} />
            }
          />

          <Route
            path="/payment"
            element={<Payment loadUserSuccess={loadUserSuccess} mode={mode} />}
          />

          <Route
            path="/paymentSuccess/:id"
            element={
              <PaymentSuccess loadUserSuccess={loadUserSuccess} mode={mode} />
            }
          />

          <Route
            path="/order/:orderId"
            element={
              <SingleOrder loadUserSuccess={loadUserSuccess} mode={mode} />
            }
          />

          {/* //TODO{<--------------Routes for Admin------------->} */}
          <Route
            path="/admin/dashboard"
            element={<Dashbord loadUserSuccess={loadUserSuccess} mode={mode} />}
          />

          <Route
            path="/admin/cropImage"
            element={
              <CropImage loadUserSuccess={loadUserSuccess} mode={mode} />
            }
          />

          <Route
            path="/admin/createProduct"
            element={
              <CeateProduct loadUserSuccess={loadUserSuccess} mode={mode} />
            }
          />

          <Route
            path="/admin/updateProduct/:productId"
            element={
              <UpdateProduct loadUserSuccess={loadUserSuccess} mode={mode} />
            }
          />

          <Route
            path="/admin/allProducts"
            element={
              <ProductList loadUserSuccess={loadUserSuccess} mode={mode} />
            }
          />

          <Route
            path="/admin/allOrders"
            element={
              <OrderList loadUserSuccess={loadUserSuccess} mode={mode} />
            }
          />

          <Route
            path="/admin/updateOrder/:orderId"
            element={
              <UpdateOrder loadUserSuccess={loadUserSuccess} mode={mode} />
            }
          />

          <Route
            path="/admin/allUsers"
            element={<UserList loadUserSuccess={loadUserSuccess} mode={mode} />}
          />

          <Route
            path="/admin/updateUser/:userId"
            element={
              <UpdateUser loadUserSuccess={loadUserSuccess} mode={mode} />
            }
          />

          <Route
            path="/admin/allReviews"
            element={
              <ReviewList loadUserSuccess={loadUserSuccess} mode={mode} />
            }
          />
        </Routes>
        <Goup mode={mode} setMode={setMode} />
        <Footer mode={mode} setMode={setMode} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
