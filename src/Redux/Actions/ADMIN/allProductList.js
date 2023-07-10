import { toast } from "react-hot-toast";
import {
  allProducts_Admin_initializing,
  allProducts_Admin_RequestSuccess,
  allProducts_Admin_RequestFail,
} from "../../Reducers/Admin/productList";
import axios from "axios";

// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../../Reducers/generalLoading";

export const getProductListAction = () => async (dispatch) => {
  try {
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.get(`/api/v1/admin/allProducts`);
    dispatch(allProducts_Admin_initializing());

    dispatch(allProducts_Admin_RequestSuccess(data));
    dispatch(GeneralLoadingFalse());
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(allProducts_Admin_RequestFail(error.response.data));
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
