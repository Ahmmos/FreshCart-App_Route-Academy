import React from 'react'
import { Outlet ,NavLink} from 'react-router-dom'
import logo from "../../assets/images/freshcart-logo.svg";


export default function AuthLayout() {
  return (
    <>
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand fs-2 " to="home">
            <img src={logo} alt="" />
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link text-muted fs-6 fw-bold ms-2"
                  aria-current="page"
                  to="signin"
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-muted fs-6 fw-bold ms-2"
                  aria-current="page"
                  to="signup"
                >
                  SignUp
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>


    <Outlet/>
    </>
  )
}
