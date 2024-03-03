import Axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function SignIn() {
  // state that will get the error msg and set it to the alret div
  let [errorMsg, setErrorMsg] = useState("");
  // state will create loader to the button untill data posted
  let [loading, setLoading] = useState(true);

  // hook that helps us to direct to  another page after submitting form
  let navigate = useNavigate();

  // post data to the API function
  async function sendToApi(values) {
    try {
      setLoading(false);
      let { data } = await Axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values);
       if(data.message == 'success'){

        // save token to local storage
        localStorage.setItem('token',data.token);
        
        // after sign-in direct to home page 
        navigate( "/home" );
       }
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setLoading(true);
    }
  }

  //  validation schema for form inputs using yup library

  function validationSchema() {
    let schema = new Yup.object({
      email: Yup.string()
        .email("Email is invalid")
        .required("Please enter an Email"),
      password: Yup.string()
        .matches(
          /^[A-Z][A-za-z0-9@]{6,}$/,
          "Password must be at least 7 charcter , start with Capital letter & have special character"
        )
        .required()
    });
    return schema;
  }

  // signUp form using formik liberary  with initial values and onSubmit props
  let login = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    // the call of the validation Schema function "if the name of the variable == the name of the function we can write only one of them like here"
    validationSchema,
    onSubmit: (values) => {
      sendToApi(values);
    },
  });

  return (
    <>
      <div className="w-75 m-auto mt-3 py-5">
        <h2 className="text-center fw-bolder">Login Now</h2>
        <form className="" onSubmit={login.handleSubmit}>

          <label className="text-main fw-bold" htmlFor="email">
            Email:
          </label>
          <input
            onChange={login.handleChange}
            onBlur={login.handleBlur}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email.."
            className="form-control  mb-3"
          />
          {login.errors.email && login.touched.email ? (
            <div className="alert alert-warning text-danger p-2">
              {" "}
              {login.errors.email}
            </div>
          ) : (
            ""
          )}

          <label className="text-main fw-bold" htmlFor="password">
            Password:
          </label>
          <input
            onChange={login.handleChange}
            onBlur={login.handleBlur}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password.."
            className="form-control  mb-3"
          />
          {login.errors.password && login.touched.password ? (
            <div className="alert alert-warning text-danger p-2">
              {" "}
              {login.errors.password}
            </div>
          ) : (
            ""
          )}

          {/* disabled button untill  all fields are filled */}
          <button
            type="submit"
            disabled={!(login.dirty && login.isValid)}
            className="btn bg-main text-white px-4"
          >
            {loading ? (
              <i className="fa-solid sigup-btn">Sign In</i>
            ) : (
              <i className="fa-solid fa-beat fs-6 sigup-btn">Loading...</i>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
