import { toast } from "react-hot-toast";
import {
  getSingleProductProductsRequestSuccess,
  getSingleProductProductsRequestFail,
} from "../Reducers/SingleProduct";
import axios from "axios";
import {reviewsRequestInitiated, reviewsRequestSuccess, reviewsRequestFail } from "../Reducers/Reviews";
import {
  addReviewsRequestSuccess,
  addReviewsRequestFail,
} from "../Reducers/addReviews";

// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../Reducers/generalLoading";

export const getSingleProduct = (productId) => async (dispatch) => {
  try {
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.get(`/api/v1/singleProduct/${productId}`);
    dispatch(GeneralLoadingFalse());

    dispatch(getSingleProductProductsRequestSuccess(data));
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(getSingleProductProductsRequestFail(error.response.data));
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};

export const addReview = (formData) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    dispatch(GeneralLoadingTrue());
    dispatch(reviewsRequestInitiated());

    const { data } = await axios.put(`/api/v1/Review/new`, formData, config);
    dispatch(addReviewsRequestSuccess(data));

    dispatch(GeneralLoadingFalse());
    toast.success(data.message, {
      duration: 3000,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(addReviewsRequestFail(error.response.data));

    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};

export const getReviews = (productId) => async (dispatch) => {
  try {
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.get(
      `/api/v1/allReviews?productId=${productId}`
    );
    dispatch(reviewsRequestSuccess(data));

    dispatch(GeneralLoadingFalse());
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(reviewsRequestFail(error.response.data));

    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
