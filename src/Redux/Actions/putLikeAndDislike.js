import { toast } from "react-hot-toast";
import axios from "axios";
import {
  likeAndDislikeRequestSuccess,
  likeAndDislikeRequestFail,
} from "../Reducers/putLikeAndDislike";


export const putLikeAndDislike =
  (productId, likeAndDislike) => async (dispatch) => {
    try {


      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/v1/likeAndDislike`,
        { productId, likeAndDislike },
        config
      );

      dispatch(likeAndDislikeRequestSuccess(data));

      toast.success("Sending Feed Back", {
        duration: 2000,
      });
    
    } catch (error) {
      console.log(error.response.data);
      dispatch(likeAndDislikeRequestFail(error.response.data));
      toast.error(error.response.data.message, {
        duration: 5000,
      });
    }
  };
