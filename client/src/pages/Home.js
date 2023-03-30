import React from "react";
import { Link } from "react-router-dom";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";

const Home = () => {
  const isAuth = useIsAuthenticated();
  const user = useAuthUser();
  let btn;
  if (isAuth()) {
    btn = (
      <div>
        <p className="lead">
          A one stop solution for regular maintainence, repairs and other
          services on all brands of Air Conditioners.
          <br />
          <br />
          Hello {user().name}!!
          <br /> Go to the dashboard to book services or view your appointments.
        </p>
        <Link to="/dashboard" className="btn btn-lg btn-outline-success px-3">
          Go to Dashboard
        </Link>
        <br />
        <br />
      </div>
    );
  } else {
    btn = (
      <div>
        <p className="lead">
          We provide a one stop solution for regular maintainence, repairs and
          other services on all brands of Air Conditioners.
          <br />
          Sign up today and enjoy our exclusive top notch services and keep your
          AC running for a lifetime.
        </p>
        <Link to="/signin" className="btn btn-lg btn-outline-primary px-3">
          Signup
        </Link>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
  return (
    <div
      className="mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden h-100"
      style={{ backgroundColor: "#222222" }}
    >
      <h1 className="display-4">
        Welcome to the AC Maintenance and Services Company
      </h1>

      <p className="lead text-center">{btn}</p>

      <p className="lead">
        Want to know more about us or have any questions?
        <br />
        Visit the links below to learn more:
      </p>
      <p className="lead text-center">
        <Link to="/contact" className="btn btn-md btn-outline-info px-3">
          Contact
        </Link>
        &emsp;
        <Link to="/about" className="btn btn-md btn-outline-info px-3">
          About us
        </Link>
      </p>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;
