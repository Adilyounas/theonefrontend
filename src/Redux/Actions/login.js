import { toast } from "react-hot-toast";
import { LoginRequestSuccess, LoginRequestFail } from "../Reducers/login";
import axios from "axios";

import {

  LoadUserRequestSuccess,
  LoadUserRequestFail,
} from "../Reducers/loadUser";
// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../Reducers/generalLoading";

export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch(GeneralLoadingTrue());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/login`, formData, config);
    // dispatch(LoadUserInitializeStates())
    const { data:data2 } = await axios.get(`/api/v1/myDetails`);
    dispatch(LoginRequestSuccess(data));
    dispatch(LoadUserRequestSuccess(data2));
    dispatch(GeneralLoadingFalse());


    toast.success(data.message);
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(LoginRequestFail(error.response.data));

    dispatch(LoadUserRequestFail(error.response.data));
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
