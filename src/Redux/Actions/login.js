import { toast } from "react-hot-toast";
import { LoginRequestSuccess, LoginRequestFail } from "../Reducers/login";
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


// import Cookies from 'js-cookie';
import  Cookies  from 'universal-cookie';
import { UniversalCookie } from 'universal-cookie';
export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch(GeneralLoadingTrue());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`https://api.warriordev.tech/api/v1/login`, formData, config);
    
    console.log(data.token);
    console.log(typeof data.token );

    // Cookies.set('token', data.token, { expires: 864000, secure: true, sameSite: 'None', httpOnly: true, domain: '.warriordev.tech' });

    const cookies = new Cookies();

    cookies.set('token', data.token, { expires: new Date(Date.now() + 86400000), secure: true, sameSite: 'None' });
    // dispatch(LoadUserInitializeStates())
    // Create an instance of UniversalCookie
    const Ucookies = new UniversalCookie();

    // Get the 'token' cookie
    const token = Ucookies.get('token');

    // Use the 'token' value as needed
    console.log('Token:', token);
    
    const { data:data2 } = await axios.get(`https://api.warriordev.tech/api/v1/myDetails`);
    dispatch(LoginRequestSuccess(data));
    dispatch(LoadUserRequestSuccess(data2));
    dispatch(GeneralLoadingFalse());


    toast.success(data.message);
  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    dispatch(LoginRequestFail(error.response.data));

    dispatch(LoadUserRequestFail(error.response.data));
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};
