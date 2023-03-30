import { MDBBtn, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import React, { useState } from "react";

const Contact = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleContactForm = async (event) => {
    event.preventDefault();
    const body = JSON.stringify({
      name: formFields.name,
      email: formFields.email,
      subject: formFields.subject,
      message: formFields.message,
      contacted: false,
    });
    try {
      await fetch("http://localhost:4000/api/contact-requests/", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.server) {
            alert("Error: " + data.server);
          } else {
            alert(
              "Thank you for your interest. We'll contact you within the next 2-3 business days"
            );
            setFormFields({
              name: "",
              email: "",
              subject: "",
              message: "",
            });
          }
        });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="container my-5 py-5 z-depth-1 mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white">
      <section className="text-center px-md-5 mx-md-5">
        <h3 className="font-weight-bold mb-4">Contact Us</h3>

        <p className="text-center w-responsive mx-auto mb-5 text-white">
          For any further queries, fill the form below and we will reach out to
          you within two days. Feel free to contact us with the details given
          below:
        </p>

        <div className="row">
          <div className="col-md-9 mb-md-0 mb-5">
            <form onSubmit={handleContactForm}>
              <div className="row mb-4">
                <div className="col-md-6">
                  <MDBInput
                    label="Your Name"
                    id="name"
                    type="text"
                    value={formFields.name}
                    onChange={(e) =>
                      setFormFields({ ...formFields, name: e.target.value })
                    }
                    contrast
                  />
                </div>

                <div className="col-md-6">
                  <MDBInput
                    label="Your email"
                    id="email"
                    type="email"
                    value={formFields.email}
                    onChange={(e) =>
                      setFormFields({ ...formFields, email: e.target.value })
                    }
                    contrast
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-12">
                  <MDBInput
                    label="Subject"
                    id="subject"
                    type="text"
                    value={formFields.subject}
                    onChange={(e) =>
                      setFormFields({ ...formFields, subject: e.target.value })
                    }
                    contrast
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-12">
                  <MDBTextArea
                    label="Your Message"
                    id="textAreaExample"
                    rows={4}
                    value={formFields.message}
                    onChange={(e) =>
                      setFormFields({ ...formFields, message: e.target.value })
                    }
                    contrast
                  />
                </div>
              </div>
              <div className="text-center text-md-left">
                <MDBBtn type="submit">Send</MDBBtn>
              </div>
            </form>
          </div>

          <div className="col-md-3 text-center text-white">
            <ul className="list-unstyled mb-0">
              <li>
                <i className="fas fa-map-marker-alt fa-2x blue-text"></i>
                <p>Bangalore, Karnataka, India</p>
              </li>
              <li>
                <i className="fas fa-phone fa-2x mt-4 blue-text"></i>
                <p>+91-9876543210</p>
              </li>
              <li>
                <i className="fas fa-envelope fa-2x mt-4 blue-text"></i>
                <p className="mb-0">sumanlokesh.pro@protonmail.com</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
