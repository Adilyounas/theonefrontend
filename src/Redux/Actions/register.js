import { toast } from "react-hot-toast";
import {  registerRequestSuccess,
    registerRequestFail, } from "../Reducers/register";
import axios from "axios";



import {

  LoadUserRequestSuccess,
  LoadUserRequestFail,
} from "../Reducers/loadUser";
// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../Reducers/generalLoading";


import Cookies from 'js-cookie';
export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch(GeneralLoadingTrue());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(`https://api.warriordev.tech/api/v1/register`, formData, config);
    
    Cookies.set('token', data.token, { expires: 864000, secure: true, sameSite: 'None', httpOnly: true, domain: '.warriordev.tech' });





    const { data:data2 } = await axios.get(`https://api.warriordev.tech/api/v1/myDetails`);
    dispatch(registerRequestSuccess(data));
    dispatch(LoadUserRequestSuccess(data2));

    dispatch(GeneralLoadingFalse());

    toast.success(data.message);
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(registerRequestFail(error.response.data));
    dispatch(LoadUserRequestFail(error.response.data));
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
