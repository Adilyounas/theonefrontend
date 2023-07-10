import { toast } from "react-hot-toast";

import axios from "axios";
import {
  deleteUser_Admin_RequestSuccess,deleteUser_Admin_RequestFail
} from "../../Reducers/Admin/deleteUser";

// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../../Reducers/generalLoading";

export const deleteUser_admin = (userId) => async (dispatch) => {
  try {

    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
       
      }
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.delete(`/api/v1/admin/deleteUser/${userId}`,config);
    dispatch(deleteUser_Admin_RequestSuccess(data));

    if (data.success===true) {
        toast.success(data.message);
    }
    dispatch(GeneralLoadingFalse());
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(deleteUser_Admin_RequestFail(error.response.data));

    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
