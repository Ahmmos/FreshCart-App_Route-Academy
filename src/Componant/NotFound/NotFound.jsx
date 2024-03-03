import React from "react";
import imageError from "../../assets/images/error404.jpg";

export default function NotFound() {
  return (
    <>
      <div className="container mb-4 text-center">
        <img src={imageError} alt="error 404 page not found" className="w-75" />
        <a href="/home" className="btn bg-main text-white fs-5 fw-bolder btn-home w-50 my-3">
          Back To Home Page
        </a>
      </div>
    </>
  );
}
