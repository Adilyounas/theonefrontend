import { toast } from "react-hot-toast";

import axios from "axios";

// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../../Reducers/generalLoading";

export const deleteReview_admin = (productId,reviewId) => async (dispatch) => {
  try {

    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
       
      }
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.delete(`/api/v1/admin/deleteReview?productId=${productId}&id=${reviewId}`,config);
    if (data.success===true) {
        toast.success(data.reviews);
    }
    dispatch(GeneralLoadingFalse());
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
