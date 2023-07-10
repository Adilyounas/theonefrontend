import React, { Fragment, useEffect, useState } from "react";
// *{<--------------------------- FILE CSS------------------------------------->}
import "./userList.css";

// *{<------------------------------- COMPONENT IMPORTING FROM OTHER FILE ------------------------------------->}
import Loader from "../../common_components/Loader/Loader";
import Title from "../../MetaData/MetaData";

// *{<------------------------------- COMPONENT IMPORTING FROM REGULAR LIBARARIES ------------------------------------->}
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// *{<------------------------------- MATERIAL UI ICONS------------------------------------->}
import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from "@mui/icons-material/Delete";

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

// *{<-------------------------------ACTIONS ------------------------------------->}

import { getUserListAction } from "../../../Redux/Actions/ADMIN/allUsers";
import { deleteUser_admin } from "../../../Redux/Actions/ADMIN/deleteUser";

// !{<------------------------------- COMPONET START FROM HERE ------------------------------------->}

const UserList = ({ mode, loadUserSuccess }) => {
  // *{<------------------------------- USEDISPATCH, USENAVIGATE, USEPARAMS,------------------------------------->}
  const dispatch = useDispatch();
  const history = useNavigate();

  // *{<------------------------------- USE SELECTOR ------------------------------------->}

  const { generalLoading } = useSelector(
    (state) => state.generalLoading
  );

  const { Users } = useSelector((state) => state.AllUserList);
  const { bgColors } = useSelector((state) => state.Colors);
  const { deleteUser_Success } = useSelector((state) => state.DeleteUser);


  // *{<------------------------------- USESTATE ------------------------------------->}
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);

  // *{<------------------------------- REGULAR FUNCTIONS ------------------------------------->}

  const yesDelete = () => {
    dispatch(deleteUser_admin(userId));
    setOpen(!open);
  };

  const confirmationBox = (id) => {
    setUserId(id);
    setOpen(!open);
  };

  // *{<------------------------------- CREATING VARIABLES TO FEED DATA GRID  ------------------------------------->}

  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      minWidth: 300,
      headerClassName: "headerBgColor",
    },
    {
      field: "email",
      headerClassName: "headerBgColor",
      headerName: "Email",
      minWidth: 330,
    },

    {
      field: "name",
      headerClassName: "headerBgColor",
      headerName: "Name",
      type: "text",
      minWidth: 150,
    },
    {
      field: "role",
      headerClassName: "headerBgColor",
      headerName: "Role",
      type: "number",
      minWidth: 160,
      cellClassName: (params) => {
        return params.row.role === "admin" ? "adminRed" : "";
      },
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
            <NavLink to={`/admin/updateUser/${params.row.id}`}>
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

  // *{<------------------------------- FOR EACH LOOP ------------------------------------->}

  let rows = [];

  Users &&
    Users.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.email,
        name: item.name,
        role: item.role,
      });
    });

  // TODO{<------------------------------- USEEFFECT HOOK ------------------------------------->}

  useEffect(() => {
    if (loadUserSuccess === false) {
      history("/register");
    } else {
      if (deleteUser_Success === true) {
        dispatch(getUserListAction());
      }
      dispatch(getUserListAction());
    }
  }, [dispatch, loadUserSuccess, history,deleteUser_Success]);

  // *{<------------------------------- RETURN STATEMENET ------------------------------------->}

  return (
    <Fragment>
      <Title title={"All Users --admin"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <div
          id="productList"
          style={{
            backgroundColor: mode ? "#000000" : "#ffffff",
            color: mode ? "#ffffff" : "#000000",
          }}
        >
          <Typography style={{ color: bgColors ? bgColors : "" }}>
            All Users
          </Typography>
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
          {Users && Users.length >= 1 ? (
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

export default UserList;
