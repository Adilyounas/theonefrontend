import React, { Fragment, useEffect, useState } from "react";
// *{<------------------------------- COMPONENT FROM OTHER FILE ------------------------------------->}
import Loader from "../../common_components/Loader/Loader";

// *{<------------------------------- REACT-REDUX ------------------------------------->}
import { useDispatch, useSelector } from "react-redux";

// *{<------------------------------- MATERIAL UI COMPONENT ------------------------------------->}
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

// *{<------------------------------- MATERIAL UI ICONS ------------------------------------->}
import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from "@mui/icons-material/Delete";

// *{<------------------------------- REACT ROUTER DOM ------------------------------------->}
import { NavLink, useNavigate } from "react-router-dom";

// *{<------------------------------- ACTIONS ------------------------------------->}
import { getOrderListAction } from "../../../Redux/Actions/ADMIN/allOrderList";
import { deleteOrder_admin } from "../../../Redux/Actions/ADMIN/deleteOrder";

// *{<------------------------------- PAGE TITLE ------------------------------------->}
import Title from "../../MetaData/MetaData";

// !{<------------------------------- COMPONENT START FROM HERE------------------------------------->}

const Orderlist = ({ mode, loadUserSuccess }) => {
  // *{<--------------- USEDISPATCH, USENAVIGATE, USEPARAMS,------------------->}
  const dispatch = useDispatch();
  const history = useNavigate();

  // *{<--------------- USESELECTOR ------------------->}
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { Orders } = useSelector((state) => state.AllOrderList);
  const { deleteOrder_Success } = useSelector((state) => state.DeleteOrder);

  const { bgColors } = useSelector((state) => state.Colors);


  // *{<--------------------- USE-STATE HOOK---------------------------->}
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  // *{<--------------------- REGULAR FUNCTIONS---------------------------->}

  const yesDelete = () => {
    dispatch(deleteOrder_admin(orderId));
    setOpen(!open);
  };

  const confirmationBox = (id) => {
    setOrderId(id);
    setOpen(!open);
  };

  // *{<--------------------- GRID TEMPLATE DATA IN VARIABLE FORM---------------------------->}

  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      minWidth: 300,
      flex: 1,
      headerClassName: "headerBgColor",
    },
    {
      field: "status",
      headerClassName: "headerBgColor",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },

    {
      field: "itemQty",
      headerClassName: "headerBgColor",
      headerName: "Item Qty",
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
      field: "action",
      headerClassName: "headerBgColor",
      headerName: "Actions",
      type: "number",
      sortable: false,
      minWidth: 150,
      flex: 0.3,

      renderCell: (params) => {
        return (
          <div
            className={"actionIcons"}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <NavLink to={`/admin/updateOrder/${params.row.id}`}>
              <LaunchIcon
                style={{
                  backgroundColor: mode ? "#000000" : "#ffffff",
                  color: mode ? "#ffffff" : "#000000",
                }}
                className="launchIcon"
              />
            </NavLink>
            <DeleteIcon
              style={{
                backgroundColor: mode ? "#000000" : "#ffffff",
                color: mode ? "#ffffff" : "#000000",
              }}
              onClick={() => confirmationBox(params.row.id)}
              className="actiondeleteBtn"
            />
          </div>
        );
      },
    },
  ];

  // *{<--------------------- FOREACH LOOOOOP---------------------------->}

  let rows = [];

  Orders &&
    Orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemQty: item.cartItems.length,
        amount: item.Total,
      });
    });

  // TODO{<-------------------------- USE EFFECT----------------------------------->}

  useEffect(() => {
    if (loadUserSuccess === false) {
      history("/register");
    } else {
      dispatch(getOrderListAction());
    }

    if (deleteOrder_Success===true) {
      dispatch(getOrderListAction());
      
    }
  }, [dispatch, loadUserSuccess, history,deleteOrder_Success]);

  // *{<--------------------- RETURN STATEMENT  ---------------------------->}

  return (
    <Fragment>
      <Title title={"All Orders --admin"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <div
          id="productList"
          style={{ backgroundColor: mode ? "#000000" : "", color: "#ffffff" }}
        >
          <Typography style={{color:bgColors?bgColors:""}}>All Orders</Typography>
          <Dialog open={open} onClose={() => setOpen(!open)}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>Are you sure you want to delete?</DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button color="secondary" onClick={yesDelete}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          {Orders && Orders.length >= 1 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[10]}
              className="productListTable"
              autoHeight
              disableRowSelectionOnClick
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
            />
          ) : (
            <div id="noProductCreated">
              <h1>No Orders</h1>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Orderlist;
