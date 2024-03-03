import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
import Brand from "../Brand/Brand";
import Category from "../Category/Category";

export default function Brands() {

// with react-query usage do this:
//================================


function getCategories(){
 return  axios.get( "https://ecommerce.routemisr.com/api/v1/categories");
}

let {data , isLoading, isFetching} = useQuery('getCategories', getCategories, {
  cashTime: 10000,
});


  if(isLoading) return <Loading/>

// data?.data.data ==> we used "?" due to it is undefine in the first then become data after fetching complete 

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          {data?.data.data.map((item) => (
             <Category  key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
