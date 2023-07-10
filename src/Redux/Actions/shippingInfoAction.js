import { shippingInfoRequest } from "../Reducers/shippingInfoReducer";

export const shippingInfoAction = (data) => async (dispatch) => {
  dispatch(shippingInfoRequest(data));
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
