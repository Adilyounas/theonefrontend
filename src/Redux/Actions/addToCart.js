import { toast } from "react-hot-toast";
import {
    addToCart
} from "../Reducers/CartReducer";
import axios from "axios";

// TODO{<---------------General Loading Reducer---------------->}
import {
  GeneralLoadingTrue,
  GeneralLoadingFalse,
} from "../Reducers/generalLoading";

export const addToCartAction = (productId,quantity) => async (dispatch,getState) => {
  try {
    dispatch(GeneralLoadingTrue());
    const { data } = await axios.get(`/api/v1/singleProduct/${productId}`);


    
    await dispatch(addToCart({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
        quantity,
        image: data.product.images[0].url,
    }));

    
    dispatch(GeneralLoadingFalse());
    localStorage.setItem("cartItems",JSON.stringify( getState().cart.cartItems  ) )

  } catch (error) {
    console.log(error.response.data);
    dispatch(GeneralLoadingFalse());
    toast.error(error.response.data.message, {
      duration: 5000,
    });
  }
};


