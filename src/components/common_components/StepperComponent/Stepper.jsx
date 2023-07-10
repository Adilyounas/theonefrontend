import React from "react";

// *{<---------------------   CSS FILE  ------------------------------->}
import "./stepper.css";

// *{<---------------------  MATERIAL UI ICONS  ------------------------------->}
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

// *{<---------------------  MATERIAL UI  ------------------------------->}
import { Step, StepLabel, Stepper, Typography } from "@mui/material";

// !{<---------------------------  COMPONENT START FROME HERE   -------------------------->}

const StepperComponent = ({ activeStep,mode }) => {
  // *{<------------------------     DECLARING VARIABLES  -------------------------->}

  const steps = [
    {
      lable: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },

    {
      lable: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },

    {
      lable: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <div className="steperContainer" style={{backgroundColor:mode?"#000000":"#ffffff",color:mode?"#ffffff":"#000000"   }}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              icon={item.icon}
              style={{
                color: activeStep >= index ? "tomato" : "gray",
              }}
            >
              {item.lable}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default StepperComponent;
