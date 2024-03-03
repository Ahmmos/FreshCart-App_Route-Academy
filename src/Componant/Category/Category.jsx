import React from 'react'

export default function Category({item}) {
    return (
        <>
        
        <div className="col-md-2 my-3 text-center">
                  <div className="product cursor-pointer rounded-3 p-2">
                    <img src={item.image} className="w-100" height={200} alt="" />
                    <h3 className='mt-3'>{item.name}</h3>
                  </div>
                </div>
        
        </>
      )
}