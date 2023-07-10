import { toast } from "react-hot-toast";
import {
  allUser_Admin_initiated,
  allUser_Admin_RequestSuccess,
  allUser_Admin_RequestFail,
} from "../../Reducers/Admin/userList";
import axios from "axios";

// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../../Reducers/generalLoading";

export const getUserListAction = () => async (dispatch) => {
  try {
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.get(`/api/v1/admin/getAllUsers`);
    dispatch(allUser_Admin_initiated());

    dispatch(allUser_Admin_RequestSuccess(data));
    dispatch(GeneralLoadingFalse());
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(allUser_Admin_RequestFail(error.response.data));
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
