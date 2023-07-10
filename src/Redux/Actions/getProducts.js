import { toast } from "react-hot-toast";
import {
  getProductsRequestSuccess,
  getProductsRequestFail,
} from "../Reducers/getProducts";
import axios from "axios";

// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../Reducers/generalLoading";

export const getProducts =
  (
    search="", sliderValue=[0,50000], rating=0, pagination=1, categoryState 
  ) =>
  async (dispatch) => {
    try {
      let link = `/api/v1/allProducts?page=${pagination}&ratings[gte]=${rating}&price[gte]=${sliderValue[0]}&price[lte]=${sliderValue[1]} `;
      //this is for rating + search
      if (search) {
        link = `/api/v1/allProducts?page=${pagination}&ratings[gte]=${rating}&price[gte]=${sliderValue[0]}&price[lte]=${sliderValue[1]}&keyword=${search} `
      }

      if (categoryState) {
        link = `/api/v1/allProducts?page=${pagination}&ratings[gte]=${rating}&price[gte]=${sliderValue[0]}&price[lte]=${sliderValue[1]}&category=${categoryState}`
      }

      if (categoryState && search) {
        link = `/api/v1/allProducts?page=${pagination}&ratings[gte]=${rating}&price[gte]=${sliderValue[0]}&price[lte]=${sliderValue[1]}&keyword=${search}&category=${categoryState}`
      }

      dispatch(GeneralLoadingTrue());
      const { data } = await axios.get(link);
      dispatch(getProductsRequestSuccess(data));
      dispatch(GeneralLoadingFalse());
    } catch (error) {
      console.log(error.response.data);
      dispatch(GeneralLoadingFalse());
      dispatch(getProductsRequestFail(error.response.data));
      toast.error(error.response.data.message, {
        duration: 5000,
      });
    }
  };
