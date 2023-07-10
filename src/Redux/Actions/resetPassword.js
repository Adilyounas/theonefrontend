import { toast } from "react-hot-toast";
import axios from "axios";

import {
  resetPasswordRequestSuccess,
  resetPasswordRequestFail,
} from "../Reducers/resetpassword";
// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../Reducers/generalLoading";

export const resetPassword = (formData,token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch(GeneralLoadingTrue());
    const { data } = await axios.put(
      `/api/v1/resetPassword/${token}`,
      formData,
      config
    );
    dispatch(GeneralLoadingFalse());
    dispatch(resetPasswordRequestSuccess(data));
    toast.success(data.message, {
      duration: 3000,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(resetPasswordRequestFail(error.response.data));
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
