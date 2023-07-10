import React from "react";
// *{<------------------------------- IMAGES IMPORT ------------------------------------->}
import team from "../../assets/team-min.png";
import socialMedia from "../../assets/social media influence-min.png";
import razorpay from "../../assets/web app-min.png";
import selection from "../../assets/select product-min.png";

// *{<------------------------------- PAGE TITLE ------------------------------------->}
import Titles from "../MetaData/MetaData";

// *{<------------------------------- FILE CSS FILE ------------------------------------->}
import "./aboutus.css";

// TODO{<------------------------------- DECLARING VARIABLES ------------------------------------->}
const aboutUsData = [
  {
    title: "Social Media",
    description:
      "Positive response on social media indicates that a brand's product is meeting or exceeding customer expectations, leading to increased engagement, brand awareness, and ultimately, sales. This feedback can be used to improve products and build stronger customer relationships.",
    image: socialMedia,
  },

  {
    title: "Selection of Quality Products",
    description:
      "BuyBay offers a user-friendly interface with robust search and filtering capabilities, detailed product information, and a seamless checkout process, making the selection of high-quality products easy for customers. This leads to increased satisfaction and loyalty.",
    image: selection,
  },
  {
    title: "Fast and Secure Payment",
    description:
      "BuyBay's integration with Razorpay provides a secure and seamless payment gateway, offering a range of payment options and advanced fraud prevention. This makes online transactions fast, secure, and convenient, increasing customer trust and confidence in the platform.",
    image: razorpay,
  },
  {
    title: "Team",
    description:
      "A top-notch ecommerce web app team includes skilled project managers, designers, developers, and quality assurance specialists who collaborate seamlessly to create a visually appealing and user-friendly website that offers a smooth shopping experience to customers",
    image: team,
  },
];

// TODO{<------------------------------- COMPONET START FROM HERE ------------------------------------->}

const AboutUs = ({ mode }) => {
  return (
    <>
      <Titles title={"About Us Page"} />
      {aboutUsData &&
        aboutUsData.map((data, index) => (
          <div
            key={data.title}
            style={{
              flexDirection: index % 2 ? "row-reverse" : "row",
              backgroundColor: mode ? "#000000" : "#ffffff",
              color: mode ? "#ffffff" : "#000000",
            }}
            className="aboutUsMainContainer"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: index % 2 ? "flext-end" : "flex-start",
              }}
            >
              <span></span>
              <h2
                style={{
                  textAlign: index % 2 ? "right" : "left",
                }}
              >
                {data.title}
              </h2>
              <p
                style={{
                  textAlign: index % 2 ? "right" : "left",
                }}
              >
                {data.description}
              </p>
              <span></span>
            </div>
            <div>
              <img src={data.image} alt={data.title} />
            </div>
          </div>
        ))}
    </>
  );
};

export default AboutUs;
