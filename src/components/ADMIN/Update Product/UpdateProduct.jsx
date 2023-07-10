import React, { useEffect, useState } from "react";

// *{<---------------------   MATERIAL UI ICONS ------------------------------->}

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import Titles from "../../MetaData/MetaData";
import Loader from "../../common_components/Loader/Loader";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// *{<---------------------  ACTIONS  ------------------------------->}
import { getSingleProduct } from "../../../Redux/Actions/getSingleProduct";
import { updateProductAction_admin } from "../../../Redux/Actions/ADMIN/updateProduct";

// !{<---------------------------  COMPONET START FROM HERE -------------------------------------->}

const UpdateProduct = ({ mode, loadUserSuccess }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}
  const dispatch = useDispatch();
  const { productId } = useParams();
  const history = useNavigate();

  // *{<---------------------------  USESELECTOR   -------------------------->}
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { product } = useSelector((state) => state.SingleProduct);
  const { bgColors } = useSelector((state) => state.Colors);

  // *{<--------------------    USE STATE   -------------------->}

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  // *{<------------------------   DECLARING VARIABLE    -------------------------->}

  const CategoryList = [
    "Laptop",
    "Footwear",
    "Botton",
    "Tops",
    "Camera",
    "SmartPhone",
    "headphones",
  ];

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const readImageFileHandler = (e) => {
    const files = e.target.files;
    //e.target.files not providing a proper array for loop so we use here...

    const newFiles = Array.from(files);
    setImages([]);

    newFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setNewImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const createProductFormSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);

    newImages.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProductAction_admin(productId, formData));
  };

  // TODO{<-------------------  USEEFFECT HOOK    -------------------->}

  useEffect(() => {
    if (loadUserSuccess === false) {
      history("/register");
    } else {
      if (product && product._id !== productId) {
        dispatch(getSingleProduct(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
        setStock(product.stock);
        setImages(product.images);
      }
    }
  }, [dispatch, productId, product, loadUserSuccess, history]);

  // *{<------------------------    RETURN STATEMENT START FROM HERE  -------------------------->}

  return (
    <>
      <Titles title={"Update Product --admin"} />
      {generalLoading === true ? (
        <Loader />
      ) : (
        <div
          id="createNewProduct"
          style={{
            backgroundColor: mode ? "#000000" : "#ffffff",
            color: mode ? "#ffffff" : "#000000",
          }}
        >
          <form
            style={{
              backgroundColor: mode ? "#000000" : "#ffffff",
              color: mode ? "#ffffff" : "#000000",
            }}
            onSubmit={createProductFormSubmitHandler}
            className="createProductForm"
            encType="multipart/form-data"
          >
            <h1
              style={{
                backgroundColor: mode ? "#000000" : "#ffffff",
                color:bgColors?bgColors:mode?"#ffffff": "#000000"
              }}
            >
              Update Product
            </h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                name="name"
                placeholder="Enter product Name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Enter Product Price"
                name="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Enter Product Description"
                cols={"10"}
                rows={"1"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option>
                  {product.category ? product.category : "Select Category"}
                </option>
                {CategoryList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Enter Product Stock You Have"
                name="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                multiple
                onChange={readImageFileHandler}
                name="avatar"
                accept="image/*"
              />
            </div>

            <div id="createProductFormImage">
              <div>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Avatar preve ${image}`}
                  />
                ))}
              </div>
              <div>
                {newImages.map((image, index) => (
                  <img key={index} src={image} alt={`Avatar preve ${image}`} />
                ))}
              </div>
            </div>

            <button id="createProductBtn" type="submit">
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
