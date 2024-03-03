import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { cartContext } from "../../Context/cartContext";
import { wishlistContext } from "../../Context/wishlistContext";


export default function Navbar() {
  // connect the componant to the context using useContext(contextName)

  let { counter, setCounter, getCartItems } = useContext(cartContext);
  let { wishes, setWishes, getWishListItems } = useContext(wishlistContext);

  useEffect(() => {
    (async () => {
      let data = await getCartItems();
      if (data) {
        setCounter(data.numOfCartItems);
      }
    })();

    (async () => {
          let data = await getWishListItems();
          if (data) {
            setWishes(data.count);
          }
        })();


  }, []);
 



  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand fs-2 " to="home">
            <img src={logo} alt="" />
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link text-muted fs-6 fw-bold"
                  aria-current="page"
                  to="home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-muted fs-6 fw-bold"
                  aria-current="page"
                  to="products"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-muted fs-6 fw-bold"
                  aria-current="page"
                  to="categories"
                >
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-muted fs-6 fw-bold"
                  aria-current="page"
                  to="brands"
                >
                  Brands
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item me-3">
                <NavLink
                  className="nav-link text-muted fs-6 fw-bold position-relative"
                  aria-current="page"
                  to="wishlist"
                >
                  Wishlist{" "}
                  <i className="fa-solid fa-heart cartIcon  mx-2  "></i>
                  
                  {wishes ? (
                    <span class="position-absolute top-3 start-100 translate-middle badge rounded-pill bg-danger ">
                      {wishes}
                      <span class="visually-hidden">unread messages</span>
                    </span>
                  ) : (
                    " "
                  )}
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink
                  className="nav-link text-muted fs-6 fw-bold position-relative"
                  aria-current="page"
                  to="cart"
                >
                  Cart{" "}
                  <i className="fa-solid fa-cart-shopping cartIcon mx-2 "></i>
                  {counter ? (
                    <span class="position-absolute top-3 start-100 translate-middle badge rounded-pill bg-danger ">
                      {counter}
                      <span class="visually-hidden">unread messages</span>
                    </span>
                  ) : (
                    " "
                  )}
                </NavLink>
              </li>
              <li className="nav-item">
                {/* remove token after sige out */}
                <NavLink
                  onClick={() => {
                    localStorage.removeItem("token");
                  }}
                  className="nav-link text-muted fs-6 fw-bold ms-2"
                  aria-current="page"
                  to="/signin"
                >
                  SignOut
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
