import React, { useEffect, useRef, useState } from "react";
// *{<---------------------   CSS FILE  ------------------------------->}

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import Loader from "../../common_components/Loader/Loader";
import Titles from "../../MetaData/MetaData";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}

import AvatarEdit from "react-avatar-editor";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// *{<---------------------  ACTIONS  ------------------------------->}
import { updateProfile } from "../../../Redux/Actions/updateProfile";

const UpdateProfile = ({ mode, loadUserSuccess }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}

  const cropedCover = useRef("");
  const dispatch = useDispatch();
  const history = useNavigate();
  const cropedProfile = useRef("");

  // *{<---------------------------  USESELECTOR   -------------------------->}
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { success } = useSelector((state) => state.updateProfile);
  const { user } = useSelector((state) => state.User);
  const { bgColors } = useSelector((state) => state.Colors);

  // *{<--------------------    USE STATE   -------------------->}

  const [name, setName] = useState(user && user.name ? user.name : "");
  const [email, setEmail] = useState(user && user.email ? user.email : "");
  const [profileState, setProfileState] = useState("");
  const [coverState, setCoverState] = useState("");

  const [doneBtn, setDoneBtn] = useState(false);
  const [cropedProfiled, setCropedProfile] = useState("");
  const [cropedCovered, setCropedCovered] = useState("");

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const coverReadImgHandler = (e) => {
    //!file size must be less than 1MB otherwise the error will be could not decoded base 64

    const file = e.target.files[0];
    const reader = new FileReader();
    if (file && file.size / 1024 < 5024) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCoverState(reader.result);
        }
      };
    } else {
      toast.error("File Size must less than 5MB");
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setCoverState("");
    }
  };

  const profileReadImgHandler = (e) => {
    //!file size must be less than 1MB otherwise the error will be could not decoded base 64
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file && file.size / 1024 < 5024) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileState(reader.result);
        }
      };
    } else {
      toast.error("File Size must less than 5MB");
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setProfileState("");
    }
  };

  const doneBtnHandler = () => {
    if (name && email && profileState && coverState) {
      toast.success("Wait for 3 Seconds", { duration: 3000 });
      setTimeout(() => {
        setDoneBtn(true);
      }, 3500);
      const canvas = cropedProfile.current.getImage(); // Get the image as a canvas element
      const dataURL = canvas.toDataURL("image/jpeg", 0.2);
      setCropedProfile(dataURL);

      const coverCanvas = cropedCover.current.getImage(); // Get the image as a canvas element
      const coverDataUrl = coverCanvas.toDataURL("image/jpeg", 0.2);
      setCropedCovered(coverDataUrl);
    } else {
      toast.error("Please fill All Fields", { duration: 900 });
    }
  };

  const registerUserSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", cropedProfiled);
    formData.set("cover", cropedCovered);

    dispatch(updateProfile(formData));

    setName("");
    setEmail("");
    setCoverState("");
    setProfileState("");
  };

  // TODO{<------------------------ USE EFFECT HOOK  --------------------------->}

  useEffect(() => {
    if (success === true) {
      history("/myProfile");
    }

    if (loadUserSuccess === false) {
      history("/register");
    }
  }, [dispatch, success, history, loadUserSuccess]);
  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <>
      <Titles title={"Update Profile"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <div
          id="registerContainer"
          style={{
            backgroundColor: mode ? "black" : "white",
          }}
        >
          <div style={{ padding: "2vmax 1vmax" }}>
            <div>
              <AvatarEdit
                image={coverState}
                ref={cropedCover}
                border={1}
                width={350}
                height={150}
                className="cover-image"
                onLoadFailure={() => setCoverState("")}
              />
              <AvatarEdit
                image={profileState}
                ref={cropedProfile}
                className="profile-image"
                border={1}
                width={120}
                height={120}
                borderRadius={50000}
                onLoadFailure={() => setProfileState("")}
              />
            </div>

            <form
              encType="multipart/form-data"
              onSubmit={registerUserSubmitHandler}
            >
              <h1
                style={{
                  color: bgColors ? bgColors : mode ? "#ffffff" : "#000000",
                }}
              >
                Update Profile
              </h1>
              <input
                type="text"
                name="name"
                value={name}
                required
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                name="email"
                value={email}
                required
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <div>
                <input
                  type="file"
                  required
                  accept="image/*"
                  name="coverInput"
                  onChange={coverReadImgHandler}
                />
                <input
                  type="file"
                  required
                  accept="image/*"
                  name="ProfileInput"
                  onChange={profileReadImgHandler}
                />
              </div>
              {doneBtn === true && (
                <button
                  style={{ outline: "1px solid white" }}
                  disabled={doneBtn === true ? false : true}
                  type="submit"
                >
                  Update
                </button>
              )}
            </form>
            {doneBtn === false && (
              <button
                style={{ outline: "1px solid white" }}
                id="doneBtn"
                onClick={doneBtnHandler}
              >
                Done
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
