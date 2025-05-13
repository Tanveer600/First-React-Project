import React from 'react'
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <div>  <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div className="container px-4 px-lg-5">
              <a className="navbar-brand" href="#page-top">Start Bootstrap</a>
              <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ms-auto my-2 my-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/account">Account</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/transaction">Transaction</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          </div>
  )
}

export default Navbar