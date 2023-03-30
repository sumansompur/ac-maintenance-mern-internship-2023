import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBRipple,
  MDBCardImage,
  MDBCardBody,
} from "mdb-react-ui-kit";
import React from "react";
import { Link } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";

const About = () => {
  const isAuth = useIsAuthenticated();
  let url = isAuth() ? "/dashboard" : "/signin";
  return (
    <div className="container  text-center">
      <MDBContainer fluid className="my-5 text-center">
        <h4 className="mt-4 mb-3 text-white">
          <strong>Our Services</strong>
        </h4>
        <p className="text-center w-responsive mx-auto mb-5 text-white">
          We have provided professional and quality service to over 1 Lakh
          customers across major cities in India. Here are the list of premium
          services that we provide:
        </p>

        <MDBRow>
          <MDBCol md="12" lg="4" className="mb-4">
            <MDBCard>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image rounded hover-zoom"
              >
                <MDBCardImage
                  src="https://www.accareindia.com/images/intalationss.webp"
                  fluid
                  className="w-100"
                />
                <Link to={url}>
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </div>
                </Link>
              </MDBRipple>
              <MDBCardBody>
                <Link to={url} className="text-reset">
                  <h5 className="card-title mb-3">Window AC Installation</h5>
                </Link>
                <Link to={url} className="text-reset">
                  <p>
                    Includes unpacking, fixing of AC stand, connect inlet AC
                    assembly and electricity supply and performance checking.
                  </p>
                </Link>
                <h6 className="mb-3">₹5,000/-</h6>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBCard>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image rounded hover-zoom"
              >
                <MDBCardImage
                  src="https://www.accareindia.com/images/windown-ac-un.webp"
                  fluid
                  className="w-100"
                />
                <Link to={url}>
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </div>
                </Link>
              </MDBRipple>
              <MDBCardBody>
                <Link to={url} className="text-reset">
                  <h5 className="card-title mb-3">Window AC Uninstallation</h5>
                </Link>
                <Link to={url} className="text-reset">
                  <p>
                    Includes dismantle of Air Conditioner, inlet AC assembly and
                    electricity supply and packing it carefully.
                  </p>
                </Link>
                <h6 className="mb-3">₹1,000/-</h6>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBCard>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image rounded hover-zoom"
              >
                <MDBCardImage
                  src="https://www.accareindia.com/images/routing-ac.webp"
                  fluid
                  className="w-100"
                />
                <Link to={url}>
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </div>
                </Link>
              </MDBRipple>
              <MDBCardBody>
                <Link to={url} className="text-reset">
                  <h5 className="card-title mb-3">
                    Window AC Service or Repairs
                  </h5>
                </Link>
                <Link to={url} className="text-reset">
                  <p>
                    Checks the elements, wears and tears of the wires,
                    performance of the air conditioner and troubleshooting the
                    issue.
                  </p>
                </Link>
                <h6 className="mb-3">₹1,500 + spare parts + GST</h6>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default About;
