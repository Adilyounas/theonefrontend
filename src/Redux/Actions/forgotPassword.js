import { toast } from "react-hot-toast";
import axios from "axios";
import {
  forgotPasswordRequestSuccess,
  forgotPasswordRequestFail,
} from "../Reducers/forgotPassword";

// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../Reducers/generalLoading";

export const forgotPassword = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch(GeneralLoadingTrue());

    const { data } = await axios.post(`/api/v1/forgotPassword`,formData, config);

    dispatch(forgotPasswordRequestSuccess(data));
    dispatch(GeneralLoadingFalse());

    toast.success(data.message, {
      duration: 2000,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());

    dispatch(forgotPasswordRequestFail(error.response.data));
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
