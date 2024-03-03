import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/cartContext";
import { toast } from "react-toastify";
import { wishlistContext } from "../../Context/wishlistContext";

export default function Product({ item }) {
  let { counter, setCounter, addToCart } = useContext(cartContext);
  let { wishes, setWishes, addToWishList } =
    useContext(wishlistContext);
  let [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  async function addProductsToCart(productId) {
    setLoading(false);
    let data = await addToCart(productId);

    if (data.status == "success") {
      toast.success(data.message);
      setCounter(data.numOfCartItems);
      setLoading(true);
    }
  }

  async function addProductsToWishList(productId) {
    let data = await addToWishList(productId);

    if (data.status == "success") {
      toast.success("added to wishlist");
      setWishes(data.data.length);
    }
  }

  return (
    <>
      <div className="col-md-2 my-3 text-center">
        <div className="product cursor-pointer rounded-3 p-2 position-relative">
          <Link to={`/product-details/${item._id}`}>
            <img src={item.imageCover} className="w-100" alt="" />
            <span className="text-main">{item.category.name}</span>
            <h6 className="my-2 fw-bolder">
              {item.title.split(" ").slice(0, 2).join(" ")}
            </h6>
            <div className="d-flex justify-content-between my-3">
              <div>{item.price} EGP</div>
              <div>
                {item.ratingsAverage}
                <i class="fa-solid fa-star rating-color"></i>
              </div>
            </div>
          </Link>
          <button
            disabled={!loading}
            onClick={() => addProductsToCart(item._id)}
            className="btn bg-main text-white w-100 "
          >
            {loading ? "Add to Cart" : "adding..."}
          </button>
          <button
            disabled={disabled}
            onClick={() => {
              addProductsToWishList(item._id); setDisabled(true);
            }}
            className="fa-regular fa-heart wishlistIcon rounded-3"
          ></button>
        </div>
      </div>
    </>
  );
}
