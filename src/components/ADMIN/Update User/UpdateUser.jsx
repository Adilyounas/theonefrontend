import React, { useEffect, useState } from "react";

// *{<---------------------   MATERIAL UI ICONS  ------------------------------->}
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import Titles from "../../MetaData/MetaData";
import Loader from "../../common_components/Loader/Loader";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// *{<---------------------  ACTIONS  ------------------------------->}
import { getSingleUser_admin_Action } from "../../../Redux/Actions/ADMIN/getSingleUser";
import { updateUserAction_admin } from "../../../Redux/Actions/ADMIN/updateUser";

const CeateProduct = ({ mode, loadUserSuccess }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}
  const dispatch = useDispatch();
  const { userId } = useParams();
  const history = useNavigate();

  // *{<---------------------------  USESELECTOR   -------------------------->}

  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { singleUser } = useSelector((state) => state.SingleUser);
  const { bgColors } = useSelector((state) => state.Colors);

  // *{<--------------------    USE STATE   -------------------->}

  const [name, setName] = useState(singleUser && singleUser.name);
  const [email, setEmail] = useState(singleUser && singleUser.email);
  const [userRole, setUserRole] = useState(singleUser && singleUser.role);

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const updateUserRoleFormSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", userRole);
    dispatch(updateUserAction_admin(userId, formData));
  };

  // TODO{<------------------------ USE EFFECT HOOK  --------------------------->}

  useEffect(() => {
    if (loadUserSuccess === false) {
      history("/register");
    } else {
      dispatch(getSingleUser_admin_Action(userId));
    }
  }, [userId, dispatch, loadUserSuccess, history]);

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <>
      <Titles title={"Update User --admin"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <div
          id="createNewProduct"
          style={{
            backgroundColor: mode ? "#000000" : "#ffffff",
            color: mode ? "#ffffff" : "#000000",
          }}
        >
          <form
            style={{
              backgroundColor: mode ? "#000000" : "#ffffff",
              color: mode ? "#ffffff" : "#000000",
              height: "60vh",
              padding: "0vmax 3vmax",
              paddingBottom: "1.5vmax",
            }}
            onSubmit={updateUserRoleFormSubmitHandler}
            className="createProductForm"
          >
            <h1
              style={{
                backgroundColor: mode ? "#000000" : "#ffffff",
                color:bgColors?bgColors:mode?"#ffffff": "#000000",
                padding: "20px 0",
              }}
            >
              Update User
            </h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                name="name"
                placeholder="Enter User Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div>
              <AlternateEmailIcon />
              <input
                style={{
                  textTransform: "lowercase",
                }}
                type="email"
                name="email"
                placeholder="Enter User Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div>
              <VerifiedUserIcon />
              <select onChange={(e) => setUserRole(e.target.value)}>
                <option>Select Role</option>
                <option value={"admin"}>admin</option>
                <option value={"user"}>user</option>
              </select>
            </div>

            <button id="createProductBtn" type="submit">
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CeateProduct;
