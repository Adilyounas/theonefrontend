import React, { Fragment, useEffect } from "react";
// *{<---------------------   CSS FILE  ------------------------------->}
import "./myOrders.css";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import Loader from "../../common_components/Loader/Loader";
import Titles from "../../MetaData/MetaData";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

// *{<---------------------  ACTIONS  ------------------------------->}
import { myOrdersAction } from "../../../Redux/Actions/myOrdersAction";

// *{<---------------------  MATERIAL UI ICONS  ------------------------------->}
import LaunchIcon from "@mui/icons-material/Launch";

// *{<---------------------  MATERIAL UI  ------------------------------->}

import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

const MyOrders = ({ loadUserSuccess,mode }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}
  const dispatch = useDispatch();
  const history = useNavigate();

  // *{<---------------------------  USESELECTOR   -------------------------->}
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { myOrders } = useSelector((state) => state.MyOrders);
  const { user } = useSelector((state) => state.User);
  const { bgColors } = useSelector((state) => state.Colors);

  // *{<------------------------     DECLARING VARIABLES FOR DATA GRID -------------------------->}

  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      minWidth: 300,
      flex: 1,
      headerClassName: "headerBgColor",
    },
    {
      field: "Status",
      headerClassName: "headerBgColor",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.Status === "Processing" ? "redColor" : "greenColor";
      },
    },

    {
      field: "itewmQty",
      headerClassName: "headerBgColor",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "amount",
      headerClassName: "headerBgColor",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerClassName: "headerBgColor",
      headerName: "Actions",
      type: "number",
      sortable: false,
      minWidth: 150,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <NavLink className={"actionIcons"} to={`/order/${params.row.id}`}>
            <LaunchIcon style={{color:mode?"white":""}} className="launchIcon" />
          </NavLink>
        );
      },
    },
  ];

  // *{<------------------------     LOOOOP  -------------------------->}

  let rows = [];

  myOrders &&
    myOrders.forEach((item) => {
      rows.push({
        id: item._id,
        Status: item.orderStatus,
        itewmQty: item.cartItems.length,
        amount: item.Total,
      });
    });
  // TODO{<------------------------ USE EFFECT HOOK  --------------------------->}

  useEffect(() => {
    if (loadUserSuccess === false) {
        history("/register");
    }else{
      dispatch(myOrdersAction());

    }

  }, [history, loadUserSuccess, dispatch]);

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <Fragment>
      <Titles title={"My Orders"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage" style={{
            backgroundColor: mode ? "#000000" : "#ffffff",
            color: mode ? "#ffffff" : "#000000"
          }}>
          <Typography id="myOrdersHeading" style={{color:bgColors?bgColors:""}}>{user.name} -- Orders</Typography>

          {myOrders && myOrders.length >= 1 ? (
            <DataGrid
            style={{
            backgroundColor: mode ? "#000000" : "#ffffff",
            color: mode ? "#ffffff" : "#000000"
          }}
              rows={rows}
              columns={columns}
              pageSizeOptions={[10]}
              className="myOrdersTable"
              autoHeight
              disableRowSelectionOnClick
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
            />
          ) : (
            <div id="noOrdersYet">
              <h1>No Orders</h1>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
