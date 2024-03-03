import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import { useQuery } from "react-query";

export default function Products() {
  // without react-query usage do this: 
  // ==================================

  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  

  // async function getProducts() {
  //   let { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/products"
  //   );

  //   setProducts(data.data);
  //   setLoading(false)

  // }
  // useEffect(() => {
  //   getProducts();
  // }, []);

// with react-query usage do this:
//================================


function getProducts(){
 return  axios.get( "https://ecommerce.routemisr.com/api/v1/products");
}

let {data , isLoading, isFetching} = useQuery('getProducts', getProducts, {
  cashTime: 10000,
});


  if(isLoading) return <Loading/>

// data?.data.data ==> we used "?" due to it is undefine in the first then become data after fetching complete 

  return (
    <>
      <div className="container">
        <div className="row">
          {data?.data.data.map((item) => (
             <Product  key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
