import React, { useEffect, useRef, useState } from "react";
// *{<---------------------   CSS FILE  ------------------------------->}
import "./register.css";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import Titles from "../../MetaData/MetaData";
import Loader from "../../common_components/Loader/Loader";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import AvatarEdit from "react-avatar-editor";
import { toast } from "react-hot-toast";

// *{<---------------------  ACTIONS  ------------------------------->}
import { registerUser } from "../../../Redux/Actions/register";

// *{<---------------------  MATERIAL UI ICONS  ------------------------------->}
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";

const Register = ({ mode, loadUserSuccess }) => {
  // *{<---------------------------  USESELECTOR   -------------------------->}
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { bgColors } = useSelector((state) => state.Colors);

  // *{<--------------------    USE STATE   -------------------->}
  const cropedCover = useRef("");
  const dispatch = useDispatch();
  const history = useNavigate();

  const cropedProfile = useRef("");
  const [doneBtn,setDoneBtn] = useState(false);
  const [cropedProfiled,setCropedProfile] = useState("");
  const [cropedCovered,setCropedCovered] = useState("");

  


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [profileState, setProfileState] = useState("");
  const [coverState, setCoverState] = useState("");
  const [showPasswordState, setShowPasswordState] = useState(false);

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const coverReadImgHandler = (e) => {
    //!file size must be less than 1MB otherwise the error will be could not decoded base 64

    const file = e.target.files[0];
    const reader = new FileReader();
    if (file && file.size / 1024 < 4024) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCoverState(reader.result);
        }
      };
    } else {
      toast.error("File Size must less than 4MB");
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
    if (file && file.size / 1024 < 4024) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileState(reader.result);
        }
      };
    } else {
      toast.error("File Size must less than 4MB");
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setProfileState("");
    }
  };

  const doneBtnHandler =()=>{
    if (name &&  email && password  && profileState && coverState) {
      toast.success("Wait 2 Seconds")
      setTimeout(()=>{
        setDoneBtn(true);
      },3500)
      const canvas = cropedProfile.current.getImage(); // Get the image as a canvas element
      const dataURL = canvas.toDataURL("image/jpeg", 0.2); 
      setCropedProfile(dataURL)


      const coverCanvas = cropedCover.current.getImage(); // Get the image as a canvas element
      const coverDataUrl = coverCanvas.toDataURL("image/jpeg", 0.2); 
      setCropedCovered(coverDataUrl)



    }else{
      toast.error("Please fill All Fields")
    }
  }

  const showPassword = () => {
    const password = document.getElementById("password");
    if (password.type === "password") {
      password.type = "text";
      setShowPasswordState(!showPasswordState);
    } else {
      password.type = "password";
      setShowPasswordState(!showPasswordState);
    }
  };

  const registerUserSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", cropedProfiled);
    formData.set("cover", cropedCovered);

    dispatch(registerUser(formData));

    setName("");
    setEmail("");
    setPassword("");
    setCoverState("");
    setProfileState("");
  };

  // TODO{<------------------------ USE EFFECT HOOK  --------------------------->}

  useEffect(() => {
    if (loadUserSuccess === true) {
      history("/myProfile");
    }
  }, [loadUserSuccess, history]);

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <>
      <Titles title={"Register"} />
      {generalLoading ? (
        <Loader />
      ) : (
        <div
          id="registerContainer"
          style={{
            backgroundColor: mode ? "black" : "white",
          }}
        >
          <div>
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
                  color: bgColors?bgColors:mode?"#ffffff":"#000000"
                }}
              >
                Register
              </h1>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <span id="eyespan">
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span onClick={showPassword}>
                  {showPasswordState ? (
                    <VisibilityOffTwoToneIcon />
                  ) : (
                    <RemoveRedEyeTwoToneIcon />
                  )}
                </span>
              </span>
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
            {
              doneBtn ===true && <button disabled={doneBtn===true ?false:true} type="submit">Register</button> 
            }

              
           

            </form>
            {
              doneBtn ===false && <button id="doneBtn" onClick={doneBtnHandler} style={{outline:"1px solid white"}}>Done</button> 
            }
            <div id="forgotAndLoginPage">
              <NavLink to={"/forgotPassword"}>Forgot Password</NavLink>
              <NavLink to={"/login"}>Login</NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
