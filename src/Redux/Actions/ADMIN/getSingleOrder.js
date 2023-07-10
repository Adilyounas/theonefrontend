import { toast } from "react-hot-toast";

import axios from "axios";
import {singleOrder_Admin_RequestSuccess,singleOrder_Admin_RequestFail} from "../../Reducers/Admin/singleOrder"
// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../../Reducers/generalLoading";

export const getSingleOrder_admin_Action = (orderId) => async (dispatch) => {
  try {

    
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.get(`/api/v1/order/${orderId}`);
    dispatch(singleOrder_Admin_RequestSuccess(data));
    console.log(data);
    dispatch(GeneralLoadingFalse());
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(singleOrder_Admin_RequestFail(error.response.data));

    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
