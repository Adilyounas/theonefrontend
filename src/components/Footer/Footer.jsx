import React, { useState } from "react";

// *{<---------------------   CSS FILE  ------------------------------->}
import "./footer.scss";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// *{<---------------------  ACTIONS  ------------------------------->}
import { sendEamilAction } from "../../Redux/Actions/sendEmail";

// *{<---------------------  MATERIAL UI ICONS  ------------------------------->}

import LoopIcon from "@mui/icons-material/Loop";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

// *{<------------------------     DECLARING VARIABLES  -------------------------->}

const shopAndLearn = [
  { link: "/laptop", category: "LAPTOP" },
  { link: "/mobile", category: "MOBIILE" },
  { link: "/shirt", category: "SHIRT" },
  { link: "/headPhone", category: "HEADPHONE" },
  { link: "/book", category: "BOOK" },
  { link: "/watch", category: "WATCH" },
  { link: "/lcd", category: "LCD" },
  { link: "/shirt", category: "SHIRT" },
];

const support = [
  { link: "/shippingFAQ", category: "Shpping FAQ" },
  { link: "/Warrenty", category: "Warrenty" },
  { link: "/Exchange", category: "Exchange" },
  { link: "/bulkOrder", category: "Bulk Order" },
  { link: "/extendedWarrant", category: "Extented Warranty" },
];

const ABOUT = [
  { link: "/Testimonials", category: "Testimonials" },
  { link: "/Gallary", category: "Gallary" },
  { link: "/Agreement", category: "User Agreement" },
  { link: "/Declaration", category: "Declaration" },
  { link: "/Developer", category: "About Developer" },
];

const CONTACT = [
  { link: "/email", category: "Email" },
  { link: "/whatsapp", category: "WhatsApp" },
  { link: "/facebook", category: "Facebook" },
  { link: "/instagram", category: "Instagram" },
  { link: "/linkin", category: "Linkin" },
];

const Footer = ({ mode }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}
  const dispatch = useDispatch();

  // *{<---------------------------  USESELECTOR   -------------------------->}
  const { bgColors } = useSelector((state) => state.Colors);

  // *{<--------------------    USE STATE   -------------------->}
  const [sendEmailState, setSendEmailState] = useState("");

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const sendEmailHandler = () => {
    dispatch(sendEamilAction(sendEmailState));
  };

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <div className="footer">
      <section
        id="section"
        style={
          mode ? { backgroundColor: "#121212" } : { backgroundColor: "#fff" }
        }
      >
        <div className={mode ? "darkColorHover" : "lightColorHover"}>
          <div>
            <LoopIcon />
          </div>
          <div>
            <h3>Hassle-free replacement</h3>
            <p>10 day easy replacement policy</p>
          </div>
        </div>
        <div className={mode ? "darkColorHover" : "lightColorHover"}>
          <div>
            <VerifiedUserOutlinedIcon />
          </div>
          <div>
            <h3>100% secure payments</h3>
            <p>RazorPay funtionality, Cards Supported</p>
          </div>
        </div>
        <div className={mode ? "darkColorHover" : "lightColorHover"}>
          <div>
            <MapOutlinedIcon />
          </div>
          <div>
            <h3>vast service network</h3>
            <p>Many Products and can be delivered almost every where</p>
          </div>
        </div>
      </section>

      <section
        id="section2"
        style={
          mode
            ? { backgroundColor: "#121212" }
            : { backgroundColor: "rgb(237 237 237)" }
        }
      >
        <div className={mode ? "darkColorHover" : "lightColorHover"}>
          <h3>LET'S STAY IN TOUCH</h3>
          <p>Get updates on sales specials and more</p>
        </div>

        <div className={mode ? "darkColorHover" : "lightColorHover"}>
          <div>
            <input
              onChange={(e) => setSendEmailState(e.target.value)}
              type="email"
              placeholder="Enter Your Email"
              required
            />
            <div onClick={sendEmailHandler}>
              <ArrowRightOutlinedIcon
                style={{
                  color: bgColors,
                }}
              />
            </div>
          </div>
        </div>

        <div className={mode ? "darkColorHover" : "lightColorHover"}>
          <h3>FOLLOW</h3>
          <p>We want to hear from you!</p>
        </div>

        <div id="socialmediaIconsdiv">
          <NavLink to={"/"}>
            <FacebookOutlinedIcon
              sx={
                bgColors
                  ? { color: bgColors, cursor: "pointer" }
                  : { color: mode ? "#ffffff" : "#000000", cursor: "pointer" }
              }
            />
          </NavLink>

          <NavLink to={"/"}>
            <YouTubeIcon
              sx={
                bgColors
                  ? { color: bgColors, cursor: "pointer" }
                  : { color: mode ? "#ffffff" : "#000000", cursor: "pointer" }
              }
            />
          </NavLink>

          <NavLink to={"/"}>
            <InstagramIcon
              sx={
                bgColors
                  ? { color: bgColors, cursor: "pointer" }
                  : { color: mode ? "#ffffff" : "#000000", cursor: "pointer" }
              }
            />
          </NavLink>

          <NavLink to={"/"}>
            <TwitterIcon
              sx={
                bgColors
                  ? { color: bgColors, cursor: "pointer" }
                  : { color: mode ? "#ffffff" : "#000000", cursor: "pointer" }
              }
            />
          </NavLink>
        </div>
      </section>

      <section
        id="section3"
        style={
          mode ? { backgroundColor: "#121212" } : { backgroundColor: "#fff" }
        }
      >
        <div>
          <div>
            <p
              style={{
                color:bgColors?bgColors:mode?"#ffffff":"#000000",
              }}
            >
              SUPPORT
            </p>
            {support &&
              support.map((item, index) => (
                <NavLink
                  key={index}
                  className={mode ? "darkColorHover" : "lightColorHover"}
                  to={item.link}
                >
                  {item.category}
                </NavLink>
              ))}
          </div>

          <div>
            <p
              style={{
                color:bgColors?bgColors:mode?"#ffffff":"#000000",
              }}
            >
              SHOP AND LEARN
            </p>
            {shopAndLearn &&
              shopAndLearn.map((item, index) => (
                <NavLink
                  key={index}
                  className={mode ? "darkColorHover" : "lightColorHover"}
                  to={item.link}
                >
                  {item.category}
                </NavLink>
              ))}
          </div>

          <div>
            <p
              style={{
                color:bgColors?bgColors:mode?"#ffffff":"#000000",
              }}
            >
              ABOUT
            </p>
            {ABOUT &&
              ABOUT.map((item, index) => (
                <NavLink
                  key={index}
                  className={mode ? "darkColorHover" : "lightColorHover"}
                  to={item.link}
                >
                  {item.category}
                </NavLink>
              ))}
          </div>

          <div>
            <p
             style={{
                color:bgColors?bgColors:mode?"#ffffff":"#000000",
              }}
            >
              CONTACT US
            </p>
            {CONTACT &&
              CONTACT.map((item, index) => (
                <NavLink
                  key={index}
                  className={mode ? "darkColorHover" : "lightColorHover"}
                  to={item.link}
                >
                  {item.category}
                </NavLink>
              ))}
          </div>
        </div>
      </section>

      <section
        id="section4"
        style={
          mode ? { backgroundColor: "#121212" } : { backgroundColor: "#fff" }
        }
      >
        <div>
          <p className={mode ? "darkColorHover" : "lightColorHover"}>
            Copyright @ 2023 Buybay. All Rights Reserved | Developer #Adil
            Younas
          </p>
        </div>
      </section>
    </div>
  );
};

export default Footer;
