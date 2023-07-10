import {
  createProductRequestSuccess,
  createProductRequestFail,
} from "../Reducers/createproduct";
import axios from "axios";
import { toast } from "react-hot-toast";

// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../Reducers/generalLoading";

export const createProduct = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    dispatch(GeneralLoadingTrue());

    const { data } = await axios.post(
      `/api/v1/admin/createProduct`,
      formData,
      config
    );
    dispatch(createProductRequestSuccess(data));
    dispatch(GeneralLoadingFalse());

    toast.success(data.message);
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(createProductRequestFail(error.response.data));
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
