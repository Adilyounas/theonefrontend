import React, { Fragment, useEffect, useState } from "react";
// *{<------------------------------- CSS FILE ------------------------------------->}
import "./allProductList.css";

// *{<------------------------------- IMPORTING COMPONENTS FROM OTHER FILE ------------------------------------->}
import Loader from "../../common_components/Loader/Loader";
import Title from "../../MetaData/MetaData";

// *{<------------------------------- MATERIAL UI ------------------------------------->}
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// *{<------------------------------- MATERIAL UI ICONS------------------------------------->}
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";

// *{<------------------------------- REACT REDUX------------------------------------->}
import { useDispatch, useSelector } from "react-redux";

// *{<------------------------------- REACT ROUTER DOM------------------------------------->}
import { NavLink, useNavigate } from "react-router-dom";

// *{<------------------------------- ACTIONS ------------------------------------->}

import { getProductListAction } from "../../../Redux/Actions/ADMIN/allProductList";
import { deleteProduct_admin } from "../../../Redux/Actions/ADMIN/deleteProduct";

// !{<------------------------------- COMPONET START FROM HERE------------------------------------->}

const ProductList = ({ mode, loadUserSuccess }) => {
  // *{<------------------------------- USEDISPATCH, USENAVIGATE, USEPARAMS,------------------------------------->}
  const dispatch = useDispatch();
  const history = useNavigate();

  // *{<------------------------------- USE SELECTOR ------------------------------------->}
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { products } = useSelector((state) => state.AllProductList);
  const { deleteProduct_Success } = useSelector((state) => state.DeleteProduct);

  const { bgColors } = useSelector((state) => state.Colors);

  // *{<------------------------------- USE-STATE------------------------------------->}
  const [productId, setProductId] = useState("");
  const [open, setOpen] = useState(false);

  // *{<------------------------------- REGULAR FUNCTION ------------------------------------->}

  const yesDelete = () => {
    dispatch(deleteProduct_admin(productId));
    setOpen(!open);
  };

  const confirmationBox = (id) => {
    setProductId(id);
    setOpen(!open);
  };

  // *{<-------------------------------CREATING DATA FOR DATA GRID ------------------------------------->}

  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      headerClassName: "headerBgColor",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "name",
      headerClassName: "headerBgColor",
      headerName: "Name",
      flex: 1,
      minWidth: 200,
    },

    {
      field: "stock",
      headerClassName: "headerBgColor",
      headerName: "Stock",
      minWidth: 200,
      flex:0.5,
    },
    {
      field: "price",
      headerClassName: "headerBgColor",
      headerName: "Single Product Price",
      type: "number",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "action",
      headerClassName: "headerBgColor",
      headerName: "Actions",
      type: "number",
      flex: 0.5,
      minWidth: 170,

      sortable: false,
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
            <NavLink to={`/admin/updateProduct/${params.row.id}`}>
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
              className="actiondeleteBtn"
              onClick={() => confirmationBox(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  // *{<------------------------------- FOREACH LOOOOOOOP ------------------------------------->}

  let rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        stock: item.stock,
        price: item.price,
      });
    });

  // TODO{<------------------------------- USE EFFECT HOOOK ------------------------------------->}

  useEffect(() => {
    if (loadUserSuccess === false) {
      history("/register");
    } else {
      dispatch(getProductListAction());
    }

    if (deleteProduct_Success===true) {
      dispatch(getProductListAction());
      
    }
  }, [dispatch, loadUserSuccess, history,deleteProduct_Success]);

  return (
    <Fragment>
      <Title title={"All Products --admin"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <div
          id="productList"
          style={{ backgroundColor: mode ? "#000000" : "", color: "#ffffff" }}
        >
          <Typography style={{color:bgColors?bgColors:mode?"#ffffff":"#000000"}} >All Products</Typography>
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
          {products && products.length >= 1 ? (
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
              <h1>No Products</h1>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default ProductList;
