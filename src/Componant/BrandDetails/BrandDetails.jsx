import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";


export default function BrandDetails() {
  let { id } = useParams();
//   console.log(id)
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isLoading, isFetching } = useQuery("getProducts", getProducts, {
    cashTime: 10000,
  });

//   console.log(data?.data.data[0].brand._id);

  if (isLoading) return <Loading />;
   
  {data?.data.data.map((item)=>{
    if(item.brand._id === id) return <Product/>
  })}
  
}
