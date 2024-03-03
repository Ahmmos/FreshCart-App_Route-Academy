import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { cartContext } from "../../Context/cartContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductDetails() {
  let { counter, setCounter, addToCart } = useContext(cartContext);
  let[loading,setLoading]=useState(true)
  let x = useParams();

  function productDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.id}`);
  }

  let { data, isLoading, isFetching } = useQuery(
    "productDetails",
    productDetails,
    {
      cacheTime: 1000,
    }
  );
  async function addProductsToCart(productId) {
    setLoading(false)
    let data = await addToCart(productId);
    console.log(data);

    if (data.status == "success") {
      toast.success(data.message);
      setCounter(data.numOfCartItems);
    }
    setLoading(true)
  }

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="container my-5">
        <div className="row g-5 my-5">
          <div className="col-md-3 mt-0">
            <img src={data?.data.data.imageCover} alt="" className="w-100" />
          </div>
          <div className="col-md-9 mt-5 py-4">
            <h4 className="fw-meduim">{data?.data.data.title}</h4>
            <p className="text-muted mt-3">{data?.data.data.description}</p>
            <div>
              <div>
                <span className="text-muted fw-bold">
                  {data?.data.data.category.name}
                </span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <span>{data?.data.data.price}</span> EGP
                </div>
                <div>
                  <i class="fa-solid fa-star rating-color"></i>{" "}
                  <span>{data?.data.data.ratingsAverage}</span>
                </div>
              </div>
            </div>
            <button
              disabled={!loading}
              onClick={() => addProductsToCart(x.id)}
              className="btn bg-main text-white w-100 "
            >
              {loading ? "Add to Cart" : "adding..."}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
