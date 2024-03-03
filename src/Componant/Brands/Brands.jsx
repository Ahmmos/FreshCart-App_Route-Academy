
// https://ecommerce.routemisr.com/api/v1/brands'
// https://ecommerce.routemisr.com/api/v1/brands/64089ceb24b25627a2531596'




import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
import Brand from "../Brand/Brand";

export default function Brands() {

// with react-query usage do this:
//================================


function getBrands(){
 return  axios.get( "https://ecommerce.routemisr.com/api/v1/brands");
}

let {data , isLoading, isFetching} = useQuery('getBrands', getBrands, {
  cashTime: 10000,
});


  if(isLoading) return <Loading/>

// data?.data.data ==> we used "?" due to it is undefine in the first then become data after fetching complete 

  return (
    <>
      <div className="container">
        <div className="row">
          {data?.data.data.map((item) => (
             <Brand  key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}