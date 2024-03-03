import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "react-query";

export default function Categories() {
  // const [categories, setCategories] = useState([]);


  // async function getCategories() {
  //   let { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/categories"
  //   );
  //   setCategories(data.data);
  // }
  // useEffect(() => {
  //   getCategories();
  // }, []);

  function getCategories(){
    return  axios.get("https://ecommerce.routemisr.com/api/v1/categories");
   }
   
   let {data , isLoading, isFetching} = useQuery('getCategories', getCategories, {
     cashTime: 10000,
   });
   


  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <div className="container py-4">
      <h3 className="my-2 fw-bolder">Shop Popular Categories</h3>
      <Slider {...settings}>
        {data?.data.data.map((item) => (
          <div key={item._id}>
            
            <img src={item.image} className="w-100 " height={230} alt="" />
            <h6 className="text-center fw-bolder my-2">{item.name}</h6>
          </div>
        ))}
      </Slider>
    </div>
  );
}
