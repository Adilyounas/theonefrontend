import React, { useEffect, useRef, useState } from "react";

// *{<-------------------------------     CSS FILE   ------------------------------------->}
import "./imageCrop.css";

// *{<-------------------------------     IMPORTING FROM OTHER FILE  ------------------------------------->}
import Titles from "../../MetaData/MetaData";

// *{<-------------------------------     IMPORTING FROM REGULAR LIBRARIES  ------------------------------------->}
import AvatarEditor from "react-avatar-editor";
import { useNavigate } from "react-router-dom";

const Cart = ({mode,loadUserSuccess}) => {
  // *{<-------------------------------   USEREF ,useNavigate  ------------------------------------->}
  const getCropedImageData = useRef();
  const history = useNavigate()

  // *{<-------------------------------   USESTATE   ------------------------------------->}
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatar, setAvatar] = useState("");
  const [dataForDownload, setDataFromDownload] = useState("");
  const [scallingState, setScallingState] = useState(1);

  // *{<-------------------------------   REGULAR FUNCTIONS   ------------------------------------->}

  const chooseFileHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const downloadImageInitialize = (dataURL, filename) => {
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = filename;
    link.click();
  };

  const preveiwHandler = () => {
    const canvas = getCropedImageData.current.getImage(); // Get the image as a canvas element
    const dataURL = canvas.toDataURL("image/jpeg", 0.2); // Get the data URL of the canvas
    setAvatarPreview(dataURL);
    setDataFromDownload(dataURL);
  };

  const loadimgfail = () => {
    setAvatarPreview("");
    setAvatar("");
  };

  const downloadTheCropedImage = () => {
    downloadImageInitialize(dataForDownload, "avatar.jpg");
  };

  const scallingHandler = (e) => {
    const rageValueToNumber = Number(e.target.value);
    setScallingState(rageValueToNumber);
  };

  useEffect(()=>{
    if (loadUserSuccess===false) {
      history("/register")
    }

  },[loadUserSuccess,history])

  // TODO{<-------------------------------   RETURN STATEMENET START FROM HERE   ------------------------------------->}

  return (
    <div id="cropImg" style={{backgroundColor:mode?"#000000":"#ffffff",color:mode?"#ffffff":"#000000"}}>
      <Titles title={"Crop Image --admin"} />
      <div className="heading">
        <h1>Image Croper</h1>
        <p>Note:- Use the JPGE Image For Better Results</p>
      </div>

      <div className="mainContainerforImageCroper">
        <div style={{backgroundColor:mode?"#000000":"#ffffff",color:mode?"#ffffff":"#000000"}}>
          <AvatarEditor
            image={avatar}
            ref={getCropedImageData}
            width={250}
            height={250}
            onLoadFailure={loadimgfail}
            scale={scallingState}
          />
          <input type="file" onChange={chooseFileHandler} />
          <input
            disabled={avatar ? false : true}
            onChange={scallingHandler}
            type="range"
            min="0.1"
            defaultValue="1"
            max="3"
            step="0.1"
          />
          <p style={{ marginTop: "-1vmax" }}>Zoom In Out</p>
          <button disabled={avatar ? false : true} onClick={preveiwHandler}>
            Preview
          </button>
        </div>

        <div>
          {avatarPreview && (
            <img src={avatarPreview} width={250} alt="previewImage" />
          )}

          <button
            disabled={avatarPreview ? false : true}
            onClick={downloadTheCropedImage}
          >
            Download Croped Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
