import { toast } from "react-hot-toast";
import {
  allOrder_Admin_initialize,
  allOrder_Admin_RequestSuccess,
  allOrder_Admin_RequestFail,
} from "../../Reducers/Admin/ordersList";
import axios from "axios";

// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../../Reducers/generalLoading";

export const getOrderListAction = () => async (dispatch) => {
  try {
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.get(`/api/v1/admin/getAllOrders`);
    dispatch(allOrder_Admin_initialize());

    dispatch(allOrder_Admin_RequestSuccess(data));
    dispatch(GeneralLoadingFalse());
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(allOrder_Admin_RequestFail(error.response.data));
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
