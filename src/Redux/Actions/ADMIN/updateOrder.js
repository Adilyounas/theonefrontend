import { toast } from "react-hot-toast";

import axios from "axios";

// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../../Reducers/generalLoading";

export const updateOrderAction_admin = (orderId,formData) => async (dispatch) => {
  try {

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true
    }
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.put(`https://api.warriordev.tech/api/v1/admin/updateOrder/${orderId}`,formData,config);
    if (data.success===true) {
        toast.success(data.message);
    }
    dispatch(GeneralLoadingFalse());
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
