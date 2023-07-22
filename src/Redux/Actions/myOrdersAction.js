import { toast } from "react-hot-toast";
import { myOrdersRequestSuccess,myOrdersRequestFail } from "../Reducers/myOrders";
import { singleOrderRequestSuccess,singleOrderRequestFail} from "../Reducers/singleOrder";

import axios from "axios";


// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../Reducers/generalLoading";

export const myOrdersAction = () => async (dispatch) => {
  try {
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.get(`https://api.warriordev.tech/api/v1/myOrders`,{ withCredentials: true } );
    dispatch(myOrdersRequestSuccess(data));
    dispatch(GeneralLoadingFalse());
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(myOrdersRequestFail(error.response.data));
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};

export const singleOrderAction = (orderId) => async (dispatch) => {
    try {
      dispatch(GeneralLoadingTrue());
      const { data } = await axios.get(`https://api.warriordev.tech/api/v1/order/${orderId}`,{ withCredentials: true } );
      dispatch(singleOrderRequestSuccess(data));
      dispatch(GeneralLoadingFalse());
    } catch (error) {
      console.log(error.response.data);
      dispatch(GeneralLoadingFalse());
      dispatch(singleOrderRequestFail(error.response.data));
      toast.error(error.response.data.message, {
        duration: 5000,
      });
    }
  };
  
