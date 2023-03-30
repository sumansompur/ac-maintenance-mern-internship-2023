import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useAuthUser, useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const LoginRegister = (props) => {
  const nav = useNavigate();
  const signIn = useSignIn();

  const [loginRegisterActive, setLoginRegisterActive] = useState(props.val);
  const [formFields, setFormFields] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password1: "",
  });

  function handleLoginRegisterClick(value) {
    setLoginRegisterActive(value);
  }

  const loginSubmitHnadler = async (event) => {
    event.preventDefault();
    const body = JSON.stringify({
      username: formFields.username,
      password: formFields.password,
    });
    try {
      await fetch("http://localhost:4000/api/users/login", {
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
            alert("Error: " + data.message);
          } else {
            setLoginRegisterActive("login");
            setFormFields({
              name: "",
              username: "",
              email: "",
              password: "",
              password1: "",
            });
            signIn({
              token: data.token,
              expiresIn: 3600,
              tokenType: "Bearer",
              authState: {
                username: data.username,
                name: data.name,
                isAdmin: data.isAdmin,
              },
            });
            nav("/dashboard");
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  const registerSubmitHandler = async (event) => {
    event.preventDefault();
    if (formFields.password !== formFields.password1) {
      alert("Passwords do not match");
      return;
    }
    const body = JSON.stringify({
      name: formFields.name,
      email: formFields.email,
      username: formFields.username,
      password: formFields.password,
      admin: false,
    });
    try {
      await fetch("http://localhost:4000/api/users/", {
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
            alert("Error creating User: " + data.message);
          } else {
            setLoginRegisterActive("login");
            alert("User created! Login to continue");
            setFormFields({
              name: "",
              username: "",
              email: "",
              password: "",
              password1: "",
            });
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container my-5 py-3 z-depth-1 mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center bg-light">
      <MDBTabs pills justify className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleLoginRegisterClick("login")}
            active={loginRegisterActive === "login"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleLoginRegisterClick("register")}
            active={loginRegisterActive === "register"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={loginRegisterActive === "login"}>
          <form onSubmit={loginSubmitHnadler}>
            <MDBInput
              className="mb-4"
              type="text"
              id="username"
              name="username"
              label="Username"
              value={formFields.username}
              onChange={(e) =>
                setFormFields({ ...formFields, username: e.target.value })
              }
            />
            <MDBInput
              className="mb-4"
              type="password"
              name="password"
              id="password"
              label="Password"
              onChange={(e) =>
                setFormFields({ ...formFields, password: e.target.value })
              }
            />

            <MDBRow className="mb-4">
              <MDBCol className="d-flex justify-content-center">
                <MDBCheckbox
                  id="rememberMe"
                  label="Remember me"
                  defaultChecked
                />
              </MDBCol>
              <MDBCol>
                <a href="#!">Forgot password?</a>
              </MDBCol>
            </MDBRow>

            <MDBBtn type="submit" className="mb-4" block>
              Sign in
            </MDBBtn>

            <div className="text-center">
              <p>
                Not a member?&nbsp;
                <a onClick={() => handleLoginRegisterClick("register")}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </MDBTabsPane>
        <MDBTabsPane show={loginRegisterActive === "register"}>
          <form onSubmit={registerSubmitHandler}>
            <MDBInput
              className="mb-4"
              id="name"
              name="name"
              label="Name"
              value={formFields.name}
              onChange={(e) =>
                setFormFields({ ...formFields, name: e.target.value })
              }
              required
            />
            <MDBInput
              className="mb-4"
              id="username"
              name="username"
              label="Username"
              value={formFields.username}
              onChange={(e) =>
                setFormFields({ ...formFields, username: e.target.value })
              }
              required
            />
            <MDBInput
              className="mb-4"
              type="email"
              id="email"
              name="email"
              label="Email address"
              value={formFields.email}
              onChange={(e) =>
                setFormFields({ ...formFields, email: e.target.value })
              }
              required
            />
            <MDBInput
              className="mb-4"
              type="password"
              id="password"
              name="password"
              label="Password"
              value={formFields.password}
              onChange={(e) =>
                setFormFields({ ...formFields, password: e.target.value })
              }
              required
            />
            <MDBInput
              className="mb-4"
              type="password"
              id="password-copy"
              label="Repeat password"
              value={formFields.password1}
              onChange={(e) =>
                setFormFields({ ...formFields, password1: e.target.value })
              }
              required
            />

            <MDBCheckbox
              wrapperClass="d-flex justify-content-center mb-4"
              id="form8Example6"
              label="I have read and agree to the terms"
              defaultChecked
            />

            <MDBBtn type="submit" className="mb-4" block>
              Register
            </MDBBtn>
          </form>
          <div className="text-center">
            <p>
              Already have an account?&nbsp;
              <a onClick={() => handleLoginRegisterClick("login")}>Login</a>
            </p>
          </div>
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
};

export default LoginRegister;
