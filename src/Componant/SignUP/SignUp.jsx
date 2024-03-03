import Axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function SignUp() {
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
      let { data } = await Axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values);
       if(data.message == 'success'){
        navigate( "/signin" );
       }
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setLoading(true);
    }
  }

  //  validation schema for form inputs using yup library

  function validationSchema() {
    let schema = new Yup.object({
      name: Yup.string()
        .min(2, "Name is too short")
        .max(20, "name is too long")
        .required("Please enter a Name"),
      email: Yup.string()
        .email("Email is invalid")
        .required("Please enter an Email"),
      password: Yup.string()
        .matches(
          /^[A-Z][A-za-z0-9@]{6,}$/,
          "Password must be at least 7 charcter , start with Capital letter & have special character"
        )
        .required(),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")])
        .required(),
    });
    return schema;
  }

  // signUp form using formik liberary  with initial values and onSubmit props
  let register = useFormik({
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
        <h2 className="text-center fw-bolder">Register Now</h2>
        <form className="" onSubmit={register.handleSubmit}>
          <label className="text-main fw-bold" htmlFor="name">
            Name:
          </label>
          <input
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            type="text"
            id="name"
            name="name"
            placeholder="Please enter your Name.."
            className="form-control  mb-3"
          />
          {register.errors.name && register.touched.name ? (
            <div className="alert alert-warning text-danger p-2">
              {" "}
              {register.errors.name}
            </div>
          ) : (
            ""
          )}

          <label className="text-main fw-bold" htmlFor="email">
            Email:
          </label>
          <input
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            type="email"
            id="email"
            name="email"
            placeholder="Please enter a valid email.."
            className="form-control  mb-3"
          />
          {register.errors.email && register.touched.email ? (
            <div className="alert alert-warning text-danger p-2">
              {" "}
              {register.errors.email}
            </div>
          ) : (
            ""
          )}

          <label className="text-main fw-bold" htmlFor="password">
            Password:
          </label>
          <input
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            type="password"
            id="password"
            name="password"
            placeholder="Enter password.."
            className="form-control  mb-3"
          />
          {register.errors.password && register.touched.password ? (
            <div className="alert alert-warning text-danger p-2">
              {" "}
              {register.errors.password}
            </div>
          ) : (
            ""
          )}

          <label className="text-main fw-bold" htmlFor="rePassword">
            rePassword:
          </label>
          <input
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            type="password"
            id="rePassword"
            name="rePassword"
            placeholder="Type your password again.."
            className="form-control  mb-3"
          />
          {register.errors.rePassword && register.touched.rePassword ? (
            <div className="alert alert-warning text-danger p-2">
              {" "}
              {register.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          {errorMsg ? (
            <div className="alert alert-danger p-3">{errorMsg}</div>
          ) : (
            ""
          )}

          {/* disabled button untill  all fields are filled */}
          <button
            type="submit"
            disabled={!(register.dirty && register.isValid)}
            className="btn bg-main text-white px-4"
          >
            {loading ? (
              <i className="fa-solid sigup-btn">Sign Up</i>
            ) : (
              <i className="fa-solid fa-beat fs-6 sigup-btn">Loading...</i>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
