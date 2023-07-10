
import { toast } from "react-hot-toast";
import axios from "axios";

import {

    updateProfileRequestSuccess,
    updateProfileRequestFail,
} from "../Reducers/updateProfile";
// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../Reducers/generalLoading";

export const updateProfile = (formData)=> async(dispatch)=>{
try {

     const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    dispatch(GeneralLoadingTrue());

    const { data } = await axios.put(
      `/api/v1/updateProfile`,
      formData,
      config
    );
    dispatch(GeneralLoadingFalse());
    dispatch(updateProfileRequestSuccess(data));

    
} catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(updateProfileRequestFail(error.response.data));
    toast.error(error.response.data.message, {
      duration: 5000,
    });
}
}