import { toast } from "react-hot-toast";
import axios from "axios";

// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../Reducers/generalLoading";

import {LoadUserInitializeStates} from "../Reducers/loadUser"

export const logOutUser = () => async (dispatch) => {
  try {
    dispatch(LoadUserInitializeStates())
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.get(`https://api.warriordev.tech/api/v1/logout`,{ withCredentials: true } );
    dispatch(GeneralLoadingFalse());

    toast.success(data.message);
  } catch (error) {
      dispatch(GeneralLoadingFalse());
    console.log(error.response.data);
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
