import { toast } from "react-hot-toast";

import axios from "axios";
import {
  deleteOrder_Admin_RequestSuccess,
  deleteOrder_Admin_RequestFail,
} from "../../Reducers/Admin/deleteOrder";
// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../../Reducers/generalLoading";

export const deleteOrder_admin = (orderId) => async (dispatch) => {
  try {

    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
       
      }
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.delete(`/api/v1/admin/deleteOrder/${orderId}`,config);
    console.log(data);
    dispatch(deleteOrder_Admin_RequestSuccess(data));

    if (data.success===true) {
        toast.success(data.message);
    }
    dispatch(GeneralLoadingFalse());
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(deleteOrder_Admin_RequestFail(error.response.data));

    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
