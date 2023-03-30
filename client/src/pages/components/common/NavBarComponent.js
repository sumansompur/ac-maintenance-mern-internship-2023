import React from "react";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";

const NavBarComponent = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const logout = (event) => {
    signOut();
    alert("You have been logged out");
    navigate("/home");
  };
  let btn = isAuthenticated() ? (
    <div>
      <div onClick={() => navigate("/dashboard")} className="btn btn-info me-3">
        Go to Dashboard
      </div>
      <div onClick={logout} className="btn btn-warning me-3">
        Logout
      </div>
    </div>
  ) : (
    <Link to="/signin" className="btn btn-success me-3">
      Sign Up
    </Link>
  );

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#333333" }}
    >
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand mb-0 h1">
            AC Maintenance and Services Company
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">{btn}</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
