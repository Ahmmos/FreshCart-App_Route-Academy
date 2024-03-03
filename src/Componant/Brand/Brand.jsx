import React from 'react'
import { Link } from 'react-router-dom'

export default function Brand({item}) {



  return (
    <>
    
    <div className="col-md-2 my-3 text-center">
    {/* <Link to={`/brand-details/${item._id}`}> */}
              <div className="product cursor-pointer rounded-3 p-2">
                <img src={item.image} className="w-100" alt="" />
              </div>
              {/* </Link> */}
            </div>
           
    </>
  )
}
