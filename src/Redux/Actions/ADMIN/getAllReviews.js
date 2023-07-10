import { toast } from "react-hot-toast";
import {
    allReviews_Admin_RequestSuccess, allReviews_Admin_RequestFail
} from "../../Reducers/Admin/ReviewsList";
import axios from "axios";

// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../../Reducers/generalLoading";

export const getAllReviewListAction_admin = (productId) => async (dispatch) => {
  try {
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.get(`/api/v1/allReviews?productId=${productId}`);
    dispatch(allReviews_Admin_RequestSuccess(data));
    dispatch(GeneralLoadingFalse());
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(allReviews_Admin_RequestFail(error.response.data));
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
