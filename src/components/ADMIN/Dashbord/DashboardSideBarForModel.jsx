import React from "react";

// *{<-------------------------------    CSS FILE  ------------------------------------->}
import "./DashboardSideBarForModel.css";

// *{<-------------------------------   IMPORTING FROM OTHER REGULAR LIBRARIES  ------------------------------------->}
import { NavLink } from "react-router-dom";

// *{<-------------------------------    MATERIAL UI ICONS ------------------------------------->}
import CreateIcon from "@mui/icons-material/Create";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CommentIcon from "@mui/icons-material/Comment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReorderIcon from "@mui/icons-material/Reorder";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

// !{<-------------------------------    MATERIAL UI  ------------------------------------->}

const DashboardSideBarForModel = ({ setDashboardModalOpen }) => {
  return (
    <div id="DashboardSideBarForModel">
      <span onClick={() => setDashboardModalOpen(false)}>
        <CloseRoundedIcon />
      </span>

      <div>
        <NavLink to={"/admin/allProducts"}>
          <ReorderIcon />
          <p>Products</p>
        </NavLink>

        <NavLink to={"/admin/createProduct"}>
          <CreateIcon />
          <p>Create Product</p>
        </NavLink>

        <NavLink to={"/admin/allOrders"}>
          <FormatListBulletedIcon />
          <p>Orders</p>
        </NavLink>

        <NavLink to={"/admin/allUsers"}>
          <PeopleAltIcon />
          <p>Users</p>
        </NavLink>

        <NavLink to={"/admin/allReviews"}>
          <CommentIcon />
          <p>Reviews</p>
        </NavLink>
      </div>
    </div>
  );
};

export default DashboardSideBarForModel;
