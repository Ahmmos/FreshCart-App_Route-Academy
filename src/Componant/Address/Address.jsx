import Axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cartContext } from "../../Context/cartContext";

export default function Address() {
  let [errorMsg, setErrorMsg] = useState("");
  let [loading, setLoading] = useState(true);
  let { Pay } = useContext(cartContext);
  let { id } = useParams();

  let navigate = useNavigate();

  async function sendToApi(id, values) {
    setLoading(false);
    let data = await Pay(id, values);
    console.log(data)
    if (data.status == "success") {
      window.location.href = data.session.url;
    }
    setLoading(true);
  }

  // signUp form using formik liberary  with initial values and onSubmit props
  let address = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => {
      sendToApi(id, values);
    },
  });

  async function payOnline(id, shippingAddress) {}

  return (
    <>
      <div className="w-50 m-auto mt-3 py-5">
        <h2 className="text-center fw-bolder">Shipping Address</h2>
        <form onSubmit={address.handleSubmit}>
          <label className="text-main fw-bold" htmlFor="details">
            details:
          </label>
          <textarea
            onChange={address.handleChange}
            onBlur={address.handleBlur}
            type="details"
            id="details"
            name="details"
            placeholder="Enter details"
            className="form-control  mb-3"
          ></textarea>

          <label className="text-main fw-bold" htmlFor="phone">
            phone:
          </label>
          <input
            onChange={address.handleChange}
            onBlur={address.handleBlur}
            type="phone"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            className="form-control  mb-3"
          />

          <label className="text-main fw-bold" htmlFor="city">
            city:
          </label>
          <input
            onChange={address.handleChange}
            onBlur={address.handleBlur}
            type="City"
            id="City"
            name="City"
            placeholder="Enter your City name"
            className="form-control  mb-3"
          />

          {/* disabled button untill  all fields are filled */}
          <button
            type="submit"
            disabled={!(address.dirty && address.isValid)}
            className="btn bg-main text-white px-4"
          >
            {loading ? (
              <i className="fa-solid sigup-btn">Pay</i>
            ) : (
              <i className="fa-solid fa-beat fs-6 sigup-btn">Loading...</i>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
