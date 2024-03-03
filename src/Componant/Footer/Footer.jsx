import React from "react";
import amazonLogo from "../../assets/icons/amazon-pay.png";
import paypalLogo from "../../assets/icons/Paypal.png";
import americanexpress from "../../assets/icons/american-express.png";
import mastercard from "../../assets/icons/mastercard.png";
import appslogo from "../../assets/icons/app-logo.png";

export default function Footer() {
  return (
    <>
      <div className="container-fluid p-5 bg-main-light">
        <div>
          <h4>Get The FreshCart app</h4>
          <p>
            We will send you a link, Open it on your phone to download the app{" "}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <input
            type="email"
            className="form-control w-75"
            placeholder="Email .."
          />
          <button className="bg-main text-white px-3 rounded-1 border-0">
            Share App Link
          </button>
        </div>
        <hr />
        <div className="d-flex justify-content-between my-3">
          <div className="d-flex justify-content-start  w-75">
            <h5 className="mt-2">Payment Partners</h5>
            <div className="icons w-50 mx-3 ">
              <img src={amazonLogo} alt="" className="icons mx-2" />
              <img src={americanexpress} alt="" className="icons mx-2" />
              <img src={mastercard} alt="" className="icons mx-2" />
              <img src={paypalLogo} alt="" className="icons mx-2" />
            </div>
          </div>
          <div className="d-flex justify-content-end ">
            <h5 className="mt-3 me-3">Get deliviers with FreshCart</h5>
            <img src={appslogo} alt="" className="w-50" />
          </div>
        </div>
        <hr />
      </div>
      
    </>
  );
}
