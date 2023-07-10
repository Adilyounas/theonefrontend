import React from "react";
// *{<---------------------   CSS FILE  ------------------------------->}
import "./contactUs.css";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import sendEmail from "../../assets/send email.png";
import Titles from "../MetaData/MetaData";

// *{<---------------------  MATERIAL UI ICONS  ------------------------------->}
import SendIcon from "@mui/icons-material/Send";

// *{<---------------------  MATERIAL UI  ------------------------------->}
import { Button } from "@mui/material";

const ContactUs = ({ mode }) => {
  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const contactUsFormHandler = (e) => {
    e.preventDefault();
  };

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <>
      <Titles title={"Contact Us Page"} />
      <div
        id="contactUs"
        style={{
          backgroundColor: mode ? "#000000" : "#ffffff",
          color: mode ? "#ffffff" : "#000000",
        }}
      >
        <div>
          <img src={sendEmail} alt="send mail" />
          <h1>BuyBay</h1>
          <h2>Feel Free to Contact</h2>
          <p>Email: theonedev00@gmail.com</p>
        </div>
        <div>
          <form onSubmit={contactUsFormHandler}>
            <input type="name" placeholder="Enter Your Name" />
            <input type="number" placeholder="Enter Your Number" />
            <input type="email" placeholder="Enter Your Email" />
            <textarea
              name="message"
              placeholder="Type What Ever You Want"
              cols="30"
              rows="10"
            />
            <Button
              sx={{
                "&:hover": {
                  color: "white",
                  backgroundColor: "black",
                },
                color: "black",
                backgroundColor: "white",
                transition: ".6s",
              }}
              variant="contained"
              size="large"
              type="submit"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
