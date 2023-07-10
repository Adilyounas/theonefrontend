import { toast } from "react-hot-toast";

import axios from "axios";
import {
    singleUser_Admin_RequestSuccess,singleUser_Admin_RequestFail 
} from "../../Reducers/Admin/getSingleUser";
// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../../Reducers/generalLoading";

export const getSingleUser_admin_Action = (userId) => async (dispatch) => {
  try {
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.get(`/api/v1/admin/getSingleUser/${userId}`);
    dispatch(singleUser_Admin_RequestSuccess(data));
    dispatch(GeneralLoadingFalse());
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(singleUser_Admin_RequestFail(error.response.data));

    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
