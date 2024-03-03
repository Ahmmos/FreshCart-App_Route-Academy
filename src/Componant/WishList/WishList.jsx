import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/cartContext";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import Empty from "../../assets/images/EmptyCart.png";
import { Link } from "react-router-dom";
import { wishlistContext } from "../../Context/wishlistContext";

export default function WishList() {
  let { wishes, setWishes, getWishListItems, removeWishListItem } =
    useContext(wishlistContext);
  let { counter, setCounter, addToCart } = useContext(cartContext);

  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);
  let [adding, setAdding] = useState(true);

  useEffect(() => {
    (async () => {
      let data = await getWishListItems();

      if (data?.status == "fail") {
        setData(null);
      } else {
        setData(data);
      }

      setLoading(false);
    })();
  }, []);

  async function addProductsToCart(productId) {
    setAdding(false);
    let data = await addToCart(productId);
    if (data.status == "success") {
      toast.success(data.message);
      setCounter(data.numOfCartItems);
      setAdding(true);
    }
  }

  async function deleteWishItem(productId) {
    let data = await removeWishListItem(productId);

    if (data.status == "success") {
      toast.error("item removed from your wishlist");
      setWishes(data.data.length);
       data = await getWishListItems(productId);
      setData(data);
    }
  }

  if (loading) return <Loading />;
  if (data == null || data.data.length == 0)
    return (
      <div className="container text-center my-5">
        <h2 className="text-main my-5 py-5 fw-bolder">
          You haven't wishlist items <i class="fa-solid fa-heart-crack"></i>
        </h2>
      </div>
    );

  return (
    <>
      <div className="container bg-main-light my-2 py-4 rounded-3">
        <h2>Wishlist Item</h2>
        <p className="text-main fw-bold">
          total wishlist items: {data?.data.length}
        </p>
        {data?.data.map((item) => {
          return (
            <div className="row py-3 border-bottom" key={item._id}>
              <div className="col-md-1">
                <img src={item.imageCover} className="w-100" alt="" />
              </div>
              <div className="col-md-11 d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.title}</h5>
                  <p className="text-main">Price: {item.price} EGP</p>
                </div>
                <div className="d-flex flex-column justify-content-center ">
                  <button
                    onClick={() => deleteWishItem(item._id)}
                    className="border-0 btn btn-danger rounded-3"
                  >
                    <i class="fa-solid fa-trash-can btn-outline-danger"></i>{" "}
                    Remove
                  </button>
                  <button
                    disabled={!adding}
                    onClick={() => addProductsToCart(item._id)}
                    className="btn bg-main text-white w-100  rounded-3 mt-3"
                  >
                    {adding ? "Add to Cart" : "adding..."}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
