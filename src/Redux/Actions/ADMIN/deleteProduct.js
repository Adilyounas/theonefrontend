import { toast } from "react-hot-toast";

import axios from "axios";
import {
  deleteProduct_Admin_RequestSuccess,
  deleteProduct_Admin_RequestFail,
} from "../../Reducers/Admin/deleteProduct";
// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../../Reducers/generalLoading";

export const deleteProduct_admin = (productId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.delete(
      `/api/v1/admin/deleteProduct/${productId}`,
      config
    );
    if (data.success === true) {
      toast.success(data.message);
    }
    dispatch(deleteProduct_Admin_RequestSuccess(data));

    dispatch(GeneralLoadingFalse());
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(deleteProduct_Admin_RequestFail(error.response.data));

    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
