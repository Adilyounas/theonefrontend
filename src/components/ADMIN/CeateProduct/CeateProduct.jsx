import React, { useEffect, useState } from "react";

// *{<-------------------------------  CSS FILE  ------------------------------------->}
import "./CreateProduct.css";

// *{<-------------------------------  COMPONENTS IMPORTING FORM OTHER FILES  ------------------------------------->}
import Title from "../../MetaData/MetaData";
import Loader from "../../common_components/Loader/Loader";

// *{<-------------------------------  COMPONENTS IMPORTING FORM REGULAR LIBRARIES  ------------------------------------->}
import { useDispatch, useSelector } from "react-redux";

// *{<-------------------------------  MATERIAL UI ICONS  ------------------------------------->}
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// *{<------------------------------- ACTIONS  ------------------------------------->}
import { createProduct } from "../../../Redux/Actions/createproduct";
import { useNavigate } from "react-router-dom";

const CeateProduct = ({ mode, loadUserSuccess }) => {
  // *{<------------------------------- USEDISPATCH, USENAVIGATE, USEPARAMS ------------------------------------->}
  const dispatch = useDispatch();
  const history = useNavigate();

  // *{<-------------------------------     USE SELECTOR     ------------------------------------->}
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { bgColors } = useSelector((state) => state.Colors);


  // *{<-------------------------------     USESTATE HOOKS    ------------------------------------->}

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);

  // *{<-------------------------------     DECLARING VARIABLES  ------------------------------------->}

  const CategoryList = [
    "Laptop",
    "Footwear",
    "Botton",
    "Tops",
    "Camera",
    "Smartphone",
    "Headphones",
  ];

  // *{<-------------------------------    REGULAR FUNCTIONS   ------------------------------------->}

  const readImageFileHandler = (e) => {
    const files = e.target.files;
    //e.target.files not providing a proper array for loop so we use here...
    setImages([]);

    const newFiles = Array.from(files);

    newFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
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

    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(createProduct(formData));

    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setStock(0);

    setImages([]);
  };

  useEffect(() => {
    if (loadUserSuccess === false) {
      history("/register");
    }
  }, [loadUserSuccess,history]);

  // TODO{<-------------------------------    RETURN STATEMENT   ------------------------------------->}

  return (
    <>
      <Title title={"Create Product --Admin"} />
      {generalLoading ? (
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
              Create Product
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
                <option>Chose Category</option>
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
                  <img key={index} src={image} alt={`Avatar preve ${image}`} />
                ))}
              </div>
            </div>

            <button id="createProductBtn" type="submit">
              Create
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CeateProduct;
