import {
  LoadUserInitializeStates,
  LoadUserRequestSuccess,
  LoadUserRequestFail,
} from "../Reducers/loadUser";
import axios from "axios";

// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../Reducers/generalLoading";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(GeneralLoadingTrue());
    dispatch(LoadUserInitializeStates())
    const { data } = await axios.get(`/api/v1/myDetails`);
    dispatch(GeneralLoadingFalse());
    dispatch(LoadUserRequestSuccess(data));
  } catch (error) {
    console.log(error.response.data.message);
    dispatch(GeneralLoadingFalse());
    dispatch(LoadUserRequestFail(error.response.data));
  }
};
