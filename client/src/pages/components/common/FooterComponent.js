import { MDBFooter } from "mdb-react-ui-kit";
import React from "react";

const FooterComponent = () => {
  return (
    <div>
      <MDBFooter className="text-center text-lg-left fixed-bottom">
        <div
          className="text-center text-white p-3 "
          style={{ backgroundColor: "#333333" }}
        >
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a className="text-secondary" href="https://sumansompur.github.io/">
            Suman T D
          </a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default FooterComponent;
