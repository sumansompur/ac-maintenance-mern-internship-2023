import {
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardText,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";

const Admin = () => {
  const [tabPane, setTabPane] = useState("schedules");
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const auth = useAuthUser();
  const handleTabPaneClick = (value) => {
    loadAll();
    setTabPane(value);
  };
  const loadAll = () => {
    getAppointments();
    getAllUsers();
    getContactRequests();
  };

  const handleCompleteButton = async (id) => {
    let text = "Mark the request as completed?";
    const result = window.confirm(text);
    if (result) {
      await fetch("http://localhost:4000/api/appointment/complete/", {
        method: "PUT",
        headers: {
          id: id,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data) alert("Server: " + data.message);
          loadAll();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const handleDeleteUser = async (user) => {
    let text = "Are you sure you want to delete the user?";
    const result = window.confirm(text);
    if (result) {
      await fetch("http://localhost:4000/api/users/" + user.username, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          alert("Server: " + data.message);
          loadAll();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const handleContactedButton = async (id) => {
    let text = "Are you sure you have contacted the user?";
    const result = window.confirm(text);
    if (result) {
      await fetch("http://localhost:4000/api/contact-requests/contacted", {
        method: "PUT",
        headers: {
          id: id,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          alert("Server: " + data.message);
          loadAll();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const getAppointments = async () => {
    try {
      await fetch("http://localhost:4000/api/appointment/", {
        method: "GET",
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
  const getAllUsers = async () => {
    try {
      await fetch("http://localhost:4000/api/users/", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.message) setUsers([]);
          if (!Array.isArray(data)) setUsers(Array(data));
          else setUsers(data);
        });
    } catch (error) {
      console.error(error.message);
    }
  };
  const getContactRequests = async () => {
    try {
      await fetch("http://localhost:4000/api/contact-requests/", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.message) setContacts([]);
          if (!Array.isArray(data)) setContacts(Array(data));
          else setContacts(data);
          console.log(data);
        });
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getAppointments();
    getAllUsers();
    getContactRequests();
  }, []);

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
                  <MDBBtn
                    className="mx-3 btn-success"
                    onClick={(e) => handleCompleteButton(appt._id)}
                  >
                    Mark as Complete
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
          Hurray! All requests have been serviced.
        </p>
      </div>
    );
  }
  let ContactRequestsComponent;
  if (contacts.length > 0) {
    ContactRequestsComponent = (
      <div className="containerml-mr-2 pb-5">
        {contacts.map((contact) => (
          <MDBRow className="my-auto">
            <MDBCard
              alignment="center"
              key={contact._id}
              className="mt-3 mb-3 "
            >
              <MDBCardBody>
                <MDBCardText>
                  <MDBRow>
                    <MDBCol size="6" className="text-left">
                      Name: {contact.name}
                      <br />
                      Email: {contact.email}
                      <br />
                      Subject: {contact.subject}
                      <br />
                    </MDBCol>
                    <MDBCol size="6">
                      Message: {contact.message}
                      <br />
                    </MDBCol>
                  </MDBRow>
                </MDBCardText>
                <MDBBtn
                  className="mx-2 btn-success"
                  onClick={(e) => {
                    window.location.href = "mailto:" + contact.email;
                  }}
                >
                  Contact Customer
                </MDBBtn>
                <MDBBtn
                  className="mx-3 btn-danger"
                  onClick={(e) => handleContactedButton(contact._id)}
                >
                  Mark as Contacted
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        ))}
      </div>
    );
  } else {
    ContactRequestsComponent = (
      <div>
        <p className="lead text-white">Hurray! Everyone has been contacted.</p>
      </div>
    );
  }

  let UsersComponent = (
    <div className="containerml-mr-2 pb-5">
      <MDBTable hover bordered striped className="table-secondary">
        <MDBTableHead>
          <tr className="table-primary">
            <th scope="col">Username</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {users.map((user) => (
            <tr key={user._id}>
              <th scope="row">{user.username}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Admin/Employee" : "Customer"}</td>
              <td>
                <MDBBtn
                  className="btn btn-sm btn-danger mx-0 my-0"
                  onClick={(e) => handleDeleteUser(user)}
                >
                  Delete
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );

  return (
    <div>
      <MDBContainer fluid>
        <MDBTabs pills justify className="mb-3">
          <MDBTabsItem>
            <MDBTabsLink
              className="text-dark"
              onClick={() => handleTabPaneClick("schedules")}
              active={tabPane === "schedules"}
            >
              View Active Schedules
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              className="text-dark"
              onClick={() => {
                handleTabPaneClick("contactUs");
              }}
              active={tabPane === "contactUs"}
            >
              View contact requests
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              className="text-dark"
              onClick={() => {
                handleTabPaneClick("users");
              }}
              active={tabPane === "users"}
            >
              Manage Users
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent className="mx-5 px-5">
          <MDBTabsPane show={tabPane === "schedules"}>
            {AppointmentComponent}
          </MDBTabsPane>
          <MDBTabsPane show={tabPane === "contactUs"}>
            {ContactRequestsComponent}
          </MDBTabsPane>
          <MDBTabsPane show={tabPane === "users"}>{UsersComponent}</MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </div>
  );
};

export default Admin;
