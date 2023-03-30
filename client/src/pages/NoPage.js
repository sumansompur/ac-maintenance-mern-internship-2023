import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="container my-5 py-5 z-depth-1 mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white">
      <section className="text-center px-md-5 mx-md-5 dark-grey-text">
        <h1 className="display-1 fw-bold text-white">404</h1>
        <h3 className="font-weight-bold mb-4">Page Not Found</h3>
        <p className="text-center w-responsive mx-auto mb-5 text-white">
          This page has been moved or is non existent. <br />
          Contact the site administrators if you are accessing a valid page and
          are still facing the issue.
        </p>
        <p className="lead text-center">
          <Link to="/home" className="btn btn-lg btn-outline-primary px-3">
            Return to Home
          </Link>
        </p>
      </section>
    </div>
  );
};

export default NoPage;
