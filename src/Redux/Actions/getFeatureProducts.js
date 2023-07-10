import { toast } from "react-hot-toast";
import {
  getFeatureProductsRequestSuccess,
  getFeatureProductsRequestFail,
} from "../Reducers/getFeatureProducts";
import axios from "axios";

// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../Reducers/generalLoading";

export const getFeatureProducts = () => async (dispatch) => {
  try {
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.get(`/api/v1/allProducts`);

    dispatch(getFeatureProductsRequestSuccess(data));
    dispatch(GeneralLoadingFalse());
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());

    dispatch(getFeatureProductsRequestFail(error.response.data));
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
