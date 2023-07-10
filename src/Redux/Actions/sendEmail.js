import { toast } from "react-hot-toast";
import axios from "axios";


// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../Reducers/generalLoading";

export const sendEamilAction =
  (email) => async (dispatch) => {
    try {

      dispatch(GeneralLoadingTrue());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/v1/sendEamilForSale`,{email},
        config
      );


      dispatch(GeneralLoadingFalse());
      toast.success(data.message, {
        duration: 2000,
      });
    } catch (error) {
      console.log(error.response.data);
      dispatch(GeneralLoadingFalse());
      toast.error(error.response.data.message, {
        duration: 5000,
      });
    }
  };
