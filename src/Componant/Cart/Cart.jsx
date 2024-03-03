import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/cartContext";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import Empty from "../../assets/images/EmptyCart.png";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getCartItems, removeCartItem, setCounter, UpdateItemQuantity } =
    useContext(cartContext);
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let data = await getCartItems();

      if (data?.response?.data.statusMsg == "fail") {
        setData(null);
      } else {
        setData(data);
      }

      setLoading(false);
    })();
  }, []);

  async function deleteCartItem(productId) {
    let data = await removeCartItem(productId);
    if (data.status == "success") {
      toast.error("removing item");
      setCounter(data.numOfCartItems);
      setData(data);
    }
  }

  async function updateCount(id, count) {
    let data = await UpdateItemQuantity(id, count);
    if (data.status == "success") {
      toast.info("count updated successfully");
      setCounter(data.numOfCartItems);
      setData(data);
    }
  }

  if (loading) return <Loading />;
  if (data == null || data.numOfCartItems == 0)
    return (
      <div className="container">
        <img className=" w-100" src={Empty} />
      </div>
    );

  return (
    <>
      <div className="container bg-main-light my-2 py-4 rounded-3">
        <h2>Shop Cart:</h2>
        <p className="text-main fw-bold">
          total Cart Price: {data?.data.totalCartPrice} EGP
        </p>
        {data?.data.products.map((item) => {
          return (
            <div className="row py-3 border-bottom" key={item._id}>
              <div className="col-md-1">
                <img src={item.product.imageCover} className="w-100" alt="" />
              </div>
              <div className="col-md-11 d-flex justify-content-between">
                <div>
                  <h5>{item.product.title}</h5>
                  <p className="text-main">Price: {item.price} EGP</p>
                  <button
                    onClick={() => deleteCartItem(item.product._id)}
                    className="border-0 btn btn-outline-danger"
                  >
                    <i class="fa-solid fa-trash-can btn-outline-danger"></i>{" "}
                    Remove
                  </button>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                <button
                    onClick={
                      item.count <= 1
                        ? () => deleteCartItem(item.product._id)
                        : () => updateCount(item.product._id, item.count - 1)
                    }
                    className="mainBrdr fw-bold p-2 px-3 rounded-3"
                  >
                    -
                  </button>
                 
                  <span className="mx-2 fw-bold p-2 px-3 rounded-3 ">
                    {item.count}
                  </span>
                  <button
                    disabled={item.count >= item.product.quantity}
                    onClick={() =>
                      updateCount(item.product._id, item.count + 1)
                    }
                    className="mainBrdr fw-bold p-2 px-3 rounded-3"
                  >
                    +
                  </button>

                </div>
              </div>
            </div>
          );
        })}

        {/* <Link to="/address" className="btn bg-main text-white my-5" > </Link> */}

        <Link to={`/address/${data.data._id}`} className="btn bg-main text-white mt-3">place order</Link>
      </div>
    </>
  );
}
