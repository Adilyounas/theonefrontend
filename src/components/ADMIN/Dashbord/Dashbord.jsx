import React, { useEffect, useState } from "react";
// *{<-------------------------------    CSS FILE ------------------------------------->}
import "./dashboard.css";
import "./dashboardSidebar.css";

// *{<-------------------------------    MATERIAL UI ICONS ------------------------------------->}
import GroupIcon from "@mui/icons-material/Group";
import PaidIcon from "@mui/icons-material/Paid";

// *{<-------------------------------    IMPORTING FROM OTHER FILES ------------------------------------->}
import Loader from "../../common_components/Loader/Loader";
import Titles from "../../MetaData/MetaData";
import { ReactComponent as BoxIcon } from "../../../assets/box.svg";
import { ReactComponent as OrdersIon } from "../../../assets/orders.svg";
import DashboardSideBar from "./DashboardSideBar";
import DashboardSideBarForModel from "./DashboardSideBarForModel";

// *{<------------------------------   ACTIONS -- --------------------->}
import { getOrderListAction } from "../../../Redux/Actions/ADMIN/allOrderList";
import { getProductListAction } from "../../../Redux/Actions/ADMIN/allProductList";
import { getUserListAction } from "../../../Redux/Actions/ADMIN/allUsers";

// *{<-------------------------------    REGULAR LIBARARIES  ------------------------------------->}

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PolarArea, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Modal } from "@mui/material";
Chart.register(CategoryScale);

// !{<-------------------------------   COMPONENT START FROM HERE  ------------------------------------->}

const Dashbord = ({ loadUserSuccess, mode }) => {
  // *{<-------------------------------    USEDISPATCH, USENAVIGATE, USEPARAMS,    ------------------------------------->}
  const history = useNavigate();
  const dispatch = useDispatch();

  // *{<-------------------------------   USE SELECTOR    ------------------------------------->}
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { totalAmount, Orders } = useSelector((state) => state.AllOrderList);
  const { products } = useSelector((state) => state.AllProductList);
  const { Users } = useSelector((state) => state.AllUserList);

  // *{<-------------------------------   USE STATE    ------------------------------------->}
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);

  // *{<----------------------    Calculating Stock and out of stock and count of categories    --------------->}
  let stock = 0;
  let outStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock >= 1) {
        stock = stock + 1;
      } else {
        outStock = outStock + 1;
      }
    });

  let Laptop = 0;
  let Footwear = 0;
  let Botton = 0;
  let Tops = 0;
  let Camera = 0;
  let SmartPhone = 0;
  let headphones = 0;

  products &&
    products.forEach((cat) => {
      if (cat.category === "Laptop") {
        Laptop = Laptop + 1;
      }
      if (cat.category === "Footwear") {
        Footwear = Footwear + 1;
      }
      if (cat.category === "Botton") {
        Botton = Botton + 1;
      }

      if (cat.category === "Tops") {
        Tops = Tops + 1;
      }

      if (cat.category === "Camera") {
        Camera = Camera + 1;
      }

      if (cat.category === "Smartphone") {
        SmartPhone = SmartPhone + 1;
      }

      if (cat.category === "Headphones") {
        headphones = headphones + 1;
      }
    });

  const CategoryList = [
    { category: "Laptop", qty: Laptop, color: "#F7D5B1", bgColor: "#2C3950" },
    {
      category: "Footwear",
      qty: Footwear,
      color: "#DDEA90",
      bgColor: "#1D7948",
    },
    { category: "Botton", qty: Botton, color: "#FEA4B9", bgColor: "#614F89" },
    { category: "Tops", qty: Tops, color: "#EC8091", bgColor: "#084227" },
    { category: "Camera", qty: Camera, color: "#0B0E16", bgColor: "#E86E1A" },
    {
      category: "Smartphone",
      qty: SmartPhone,
      color: "#DDEA90",
      bgColor: "#1D7948",
    },
    {
      category: "Headphones",
      qty: headphones,
      color: "#F7D5B1",
      bgColor: "#2C3950",
    },
  ];

  // *{<-------------------------------  VARIABLES TO FEED CHART  ------------------------------------->}

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"], //x-axis labels
    datasets: [
      {
        label: "Total Amount", //label name
        backgroundColor: ["rgb(197,72,49)"],
        hoverBackgroundColor: ["rgb(197,72,49"], //lable and line dots background color
        data: [0, totalAmount && totalAmount], //line graph data on -y axis
      },
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"], //lable name
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"], //lable and part of ring background color
        hoverBackgroundColor: ["#4B5000", "#35014F"], //part of ring background color on hover
        data: [outStock, stock],
      },
    ],
    options: {
      responsive: true,
    },
  };

  // TODO{<-------------------------------   USEEFFECT HOOOOK   ------------------------------------->}

  useEffect(() => {
    if (loadUserSuccess === false) {
      history("/register");
    } else {
      dispatch(getOrderListAction());
      dispatch(getProductListAction());
      dispatch(getUserListAction());
    }
  }, [history, loadUserSuccess, dispatch]);

  // *{<-------------------------------   RETURNING STATEMENT   ------------------------------------->}

  return (
    <>
      <Titles title={"Dashboard --admin"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <div id="dashboard">
          <div
            className="dashboardSidebarContainer"
            style={{
              backgroundColor: mode ? "#000000" : "#ffffff",
              color: mode ? "#ffffff" : "#000000",
            }}
          >
            <Modal open={dashboardModalOpen} id="dashboardSidebarModal">
              <div>
                <DashboardSideBarForModel
                  setDashboardModalOpen={setDashboardModalOpen}
                />
              </div>
            </Modal>
            <DashboardSideBar />
          </div>
          <div className="dashboardMain">
            <div
              id="dashboardnameContainer"
              style={{
                backgroundColor: mode ? "#000000" : "#ffffff",
                color: mode ? "#ffffff" : "#000000",
              }}
            >
              <h1>Dashboard</h1>
            </div>
            <div
              id="dashboardMajor"
              style={{
                backgroundColor: mode ? "#000000" : "#ffffff",
                color: mode ? "#ffffff" : "#000000",
              }}
            >
              <NavLink
                id="dashboardOptionsHideAndShow"
                onClick={() => setDashboardModalOpen(!dashboardModalOpen)}
                style={{
                  backgroundColor: "#2C3950",
                  color: "#F7D5B1",
                }}
              >
                <div>
                  <p>Dashboard Options</p>
                </div>
              </NavLink>

              <NavLink
                to={"/admin/allProducts"}
                style={{
                  backgroundColor: "#1D7948",
                  color: "#DDEA90",
                }}
              >
                <div>
                  <span>Products</span>
                  <p>
                    {products && products.length >= 1 ? products.length : 0}
                  </p>
                </div>
                <BoxIcon id="boxIcon" />
              </NavLink>

              <NavLink
                to={"/admin/allOrders"}
                style={{
                  backgroundColor: "#614F89",
                  color: "#FEA4B9",
                }}
              >
                <div>
                  <span>Orders</span>
                  <p>{Orders && Orders.length >= 1 ? Orders.length : 0}</p>
                </div>
                <OrdersIon id="orderIcon" />
              </NavLink>

              <NavLink
                to={"/admin/allUsers"}
                style={{
                  backgroundColor: "#084227",
                  color: "#EC8091",
                }}
              >
                <div>
                  <span>Users</span>
                  <p>{Users && Users.length >= 1 ? Users.length : 0}</p>
                </div>
                <GroupIcon id="userIcon" />
              </NavLink>

              <NavLink
                style={{
                  backgroundColor: "#E86E1A",
                  color: "#0B0E16",
                }}
              >
                <div>
                  <span>Total Amount</span>
                  <p>{totalAmount && totalAmount}</p>
                </div>
                <PaidIcon id="moneyIcon" />
              </NavLink>
            </div>

            <div
              id="categoryCalculation"
              style={{
                backgroundColor: mode ? "#000000" : "#ffffff",
                color: mode ? "#ffffff" : "#000000",
              }}
            >
              <div className="heading">Categories And There Count In DB</div>
              <div className="items">
                {CategoryList.map((category) => (
                  <span style={{ backgroundColor: category.bgColor }}>
                    <h3 style={{ color: category.color }}>
                      {category.category}
                    </h3>
                    <p style={{ color: category.color }}>{category.qty}</p>
                  </span>
                ))}
              </div>
            </div>

            <div
              id="graphContainer"
              style={{
                backgroundColor: mode ? "#000000" : "#ffffff",
                color: mode ? "#ffffff" : "#000000",
              }}
            >
              <div className="lineChart">
                <Line
                  style={{
                    backgroundColor: mode ? "#ffffff" : "#ffffff",
                    color: mode ? "#ffffff" : "#000000",
                  }}
                  data={lineState}
                />
              </div>
              <br />
              <div className="graphChart">
                <PolarArea
                  style={{
                    backgroundColor: mode ? "#ffffff" : "#ffffff",
                    color: mode ? "#ffffff" : "#000000",
                  }}
                  data={doughnutState}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashbord;
