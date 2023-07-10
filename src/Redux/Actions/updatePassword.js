
import { toast } from "react-hot-toast";
import axios from "axios";

import {

    updatePasswordRequestSuccess,
    updatePasswordRequestFail,
} from "../Reducers/updatePassword";
// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../Reducers/generalLoading";

export const updatePassword = (formData)=> async(dispatch)=>{
try {

    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

    dispatch(GeneralLoadingTrue());

    const { data } = await axios.put(
      `/api/v1/updatePassword`,
      formData,
      config
    );
    dispatch(GeneralLoadingFalse());
    dispatch(updatePasswordRequestSuccess(data));
    toast.success(data.message, {
      duration: 3000,
    });
    
} catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(updatePasswordRequestFail(error.response.data));
    toast.error(error.response.data.message, {
      duration: 5000,
    });
}
}