import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// *{<---------------------   CSS FILE  ------------------------------->}
import "./shipping.css";

// *{<---------------------   IMPORTING FROM OTHER FILES  ------------------------------->}
import Stepper from "../../common_components/StepperComponent/Stepper";
import Titles from "../../MetaData/MetaData";

// *{<---------------------  REGULAR LIBARARIES ------------------------------->}
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

// *{<---------------------  ACTIONS  ------------------------------->}
import { shippingInfoAction } from "../../../Redux/Actions/shippingInfoAction";
import { Country, State, City } from "country-state-city";

// *{<---------------------  MATERIAL UI ICONS  ------------------------------->}
import PinDropIcon from "@mui/icons-material/PinDrop";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";

const Shipping = ({ loadUserSuccess,mode }) => {
  // *{<-------------------    USEDISPATCH, USENAVIGATE, USEPARAMS     ---------------------->}

  const dispatch = useDispatch();
  const history = useNavigate();

  // *{<---------------------------  USESELECTOR   -------------------------->}
  const { shippingInfo } = useSelector((state) => state.ShippingInfo);

  const [address, setAddress] = useState(shippingInfo.address);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phone, setPhone] = useState(shippingInfo.phone);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCounty] = useState(shippingInfo.country);
  const [city, setCity] = useState(shippingInfo.city);

  // *{<------------------------ REGULAR FUNCTIONS  -------------------------->}

  const shippingSubmitHandler = (e) => {
    e.preventDefault();
    if (phone.length < 10 || phone.length > 13) {
      toast.error("Phone Number must be 10 degit long");
      return;
    }

    dispatch(
      shippingInfoAction({
        address,
        pinCode,
        phone,
        state,
        country,
        city,
      })
    );
    history("/order/confirm");
  };
  // TODO{<------------------------ USE EFFECT HOOK  --------------------------->}

  useEffect(() => {
    if (loadUserSuccess === false) {
      history("/register");
    }
  }, [history, loadUserSuccess]);

  // *{<---------------------------   RETURN STATEMENT   -------------------------->}

  return (
    <Fragment>
      <Titles title={"About Shipping"} />
      <div className="shippingContainer" style={{backgroundColor:mode?"#000000":"#ffffff",color:mode?"#ffffff":"#000000"   }}>
        <Stepper activeStep={0} mode={mode} />

        <div className="shippingBox"  style={{backgroundColor:mode?"#000000":"#ffffff",color:mode?"#ffffff":"#000000"   }}>
          <h2 className="shippingHeading"  style={{backgroundColor:mode?"#000000":"#ffffff",color:mode?"#ffffff":"#000000"   }}>Shipping Details</h2>
          <form
         
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmitHandler}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                size={"10"}
              />
            </div>

            <div>
              <PublicIcon />
              <select
                required
                value={country}
                onChange={(e) => setCounty(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* ////////////////////////////////////////// */}
            {country && (
              <div>
                <TransferWithinAStationIcon />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {country && state && (
              <div>
                <LocationCityIcon />
                <select
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">City</option>
                  {City &&
                    City.getCitiesOfState(country, state).map((item, index) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value={"Continue"}
              className="shippingBtn"
              disabled={city ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
