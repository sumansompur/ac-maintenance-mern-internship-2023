import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardHeader,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import Form from "react-bootstrap/esm/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Customer = () => {
  const today = new Date();
  const auth = useAuthUser();
  const [tabPane, setTabPane] = useState("schedules");
  const [appointments, setAppointments] = useState([]);

  const [formFields, setFormFields] = useState({
    username: auth().username,
    phNo: "",
    address: "",
    serviceType: "Default",
    serviceDate: today,
  });

  const handleTabPaneClick = (value) => {
    getAppointments();
    setTabPane(value);
  };

  const getAppointments = async () => {
    try {
      await fetch("http://localhost:4000/api/appointment/user", {
        method: "GET",
        headers: {
          username: auth().username,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.message) setAppointments([]);
          if (!Array.isArray(data)) setAppointments(Array(data));
          else setAppointments(data);
        });
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getAppointments();
  }, []);

  const handleCancelButton = async (id) => {
    await fetch("http://localhost:4000/api/appointment/id", {
      method: "DELETE",
      headers: {
        id: id,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        getAppointments();
      });
  };

  const handleCreateAppointment = async (event) => {
    event.preventDefault();
    if (formFields.serviceType === "Default")
      return alert("Please select a service type");
    if (Number.isNaN(Number(formFields.phNo)) || formFields.phNo.length != 10)
      return alert("Please enter correct phone number");
    const body = JSON.stringify({
      username: formFields.username,
      phno: formFields.phNo,
      address: formFields.address,
      prDate: formFields.serviceDate.toISOString(),
      serviceType: formFields.serviceType,
      active: true,
    });
    try {
      await fetch("http://localhost:4000/api/appointment", {
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
          if (data.message) {
            alert("Error creating appointment: " + data.message);
          } else {
            handleTabPaneClick("schedules");
            alert("Appointment created!");
            setFormFields({
              username: auth().username,
              phNo: "",
              address: "",
              serviceType: "Default",
              serviceDate: today,
            });
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  let AppointmentComponent;
  if (appointments.length > 0) {
    AppointmentComponent = (
      <div className="containerml-mr-2 pb-5">
        <MDBRow className="my-auto">
          {appointments.map((appt) => (
            <MDBCol size="6" className="text-left">
              <MDBCard alignment="center" key={appt._id} className="mt-3 mb-3 ">
                <MDBCardHeader>
                  Service Requested: {appt.serviceType}
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBCardText>
                    <MDBRow>
                      <MDBCol size="6" className="text-left">
                        Client Name: {auth().name}
                        <br />
                        Client Username: {appt.client_username}
                        <br />
                        Address: {appt.address}
                        <br />
                        Phone number: {appt.phone_number}
                        <br />
                      </MDBCol>
                      <MDBCol size="6">
                        Service Date:{" "}
                        {new Date(appt.serviceDate).toDateString()}
                        <br />
                        Status: {appt.active ? "Active" : "Closed"}
                        <br />
                      </MDBCol>
                    </MDBRow>
                  </MDBCardText>
                  <MDBBtn className="mx-2 btn-warning">Edit</MDBBtn>
                  <MDBBtn
                    className="mx-3 btn-danger"
                    onClick={(e) => handleCancelButton(appt._id)}
                  >
                    Cancel
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </div>
    );
  } else {
    AppointmentComponent = (
      <div>
        <p className="lead text-white">
          Sorry! You have not scheduled any service appointments
        </p>
        <MDBBtn
          className="mx-3 btn-primary"
          onClick={(e) => handleTabPaneClick("book")}
        >
          Book a Service
        </MDBBtn>
      </div>
    );
  }
  return (
    <div className="container">
      <MDBContainer fluid>
        <MDBTabs pills justify className="mb-3">
          <MDBTabsItem>
            <MDBTabsLink
              className="text-dark"
              onClick={() => handleTabPaneClick("book")}
              active={tabPane === "book"}
            >
              Book a service
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              className="text-dark"
              onClick={() => {
                handleTabPaneClick("schedules");
                getAppointments();
              }}
              active={tabPane === "schedules"}
            >
              View scheduled services
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent className="mx-5 px-5">
          <MDBTabsPane show={tabPane === "book"}>
            <div className="bg-dark py-2 pb-5 mb-5 mx-5 px-5 rounded">
              <h3 className="font-weight-bold mb-4 text-white">
                Book a service
              </h3>
              <form onSubmit={handleCreateAppointment}>
                <Form.Label className="text-left text-white">
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={formFields.username}
                  onChange={(e) => {
                    setFormFields({
                      ...formFields,
                      username: e.target.value,
                    });
                  }}
                  required
                  disabled
                />
                <Form.Label className="text-left text-white mt-2">
                  Phone Number
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Phone number"
                  value={formFields.phNo}
                  onChange={(e) => {
                    setFormFields({
                      ...formFields,
                      phNo: e.target.value,
                    });
                  }}
                  required
                />

                <Form.Label className="text-left text-white mt-2">
                  Service Date
                </Form.Label>
                <DatePicker
                  selected={formFields.serviceDate}
                  onChange={(e) => {
                    setFormFields({
                      ...formFields,
                      serviceDate: e,
                    });
                    console.log(formFields);
                  }}
                  className="form-control"
                  minDate={today}
                  customInput={
                    <input
                      type="text"
                      id="datepicker"
                      placeholder="Enter date"
                    />
                  }
                  required
                />

                <Form.Label className="text-left text-white mt-2">
                  Service Address
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Address"
                  value={formFields.address}
                  onChange={(e) => {
                    setFormFields({
                      ...formFields,
                      address: e.target.value,
                    });
                  }}
                  required
                />

                <Form.Label className="text-white mt-2">
                  Type of Service
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={formFields.serviceType}
                  onChange={(e) => {
                    setFormFields({
                      ...formFields,
                      serviceType: e.target.value,
                    });
                    console.log(formFields);
                  }}
                  required
                >
                  <option disabled value="Default">
                    Open this select menu
                  </option>
                  <option value="AC Repair">AC Repair</option>
                  <></>
                  <option value="New AC Installation">
                    New AC Installation
                  </option>
                  <option value="AC Uninstallation">AC Uninstallation</option>
                  <option value="AC Gas Filling">AC Gas Filling</option>
                </Form.Select>
                <MDBBtn type="submit" className="mt-3 mb-3">
                  Book Service
                </MDBBtn>
              </form>
            </div>
          </MDBTabsPane>
          <MDBTabsPane show={tabPane === "schedules"}>
            {AppointmentComponent}
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </div>
  );
};

export default Customer;
