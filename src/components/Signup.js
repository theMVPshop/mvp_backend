import React, { useState } from "react";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import Login from "./Login";

// inheriting props from--and is always rendered by--Login.js
const Signup = ({
  history,
  setUser,
  isLoading,
  setIsLoading,
  toggleForm,
  showSignup,
}) => {
  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("Create Account");

  const handleChange = (e) =>
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  // const clearForm = () =>
  //   setInput({
  //     username: "",
  //     password: "",
  //     email: "",
  //   });

  const login = () => {
    axios
      .post("/auth/login", input)
      .then((res) => {
        localStorage.setItem("user", input.username);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("loggedIn", true);
        setUser(input.username);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
        console.log("failed to log in", error);
      })
      .then(() => setIsLoading(false));
    history.push("/projects");
  };

  const signup = (e) => {
    e.preventDefault();
    let userObject = {
      username: input.username,
      isModerator: 0,
    };
    setIsLoading(true);
    axios
      .post("/auth/signup", input)
      .then(() =>
        axios
          .post("/users", userObject)
          .then(() => login())
          .catch((error) => console.log("failed to add user to db", error))
      )
      .catch((error) => {
        console.log("failed to create user", error);
        // clearForm();
        setIsLoading(false);
        setError(
          error.response.status == "409"
            ? "User Already Exists"
            : "Login Failed"
        );
      });
    // clearForm();
  };

  return (
    <>
      {showSignup ? (
        <>
          <div className="container">
            <div className="row justify-content-center">
              <form
                onSubmit={signup}
                className="bg-dark m-3 col-sm-1 col-lg-3 text-light"
                style={{ borderRadius: "1rem" }}
              >
                <h3>Sign Up</h3>

                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    onChange={handleChange}
                    value={input.email}
                    className="form-control"
                    placeholder="Enter email"
                  />
                </div>

                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    required
                    id="username"
                    name="username"
                    label="Username"
                    onChange={handleChange}
                    value={input.username}
                    className="form-control"
                    placeholder="Enter Username"
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    onChange={handleChange}
                    value={input.password}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter password"
                  />
                </div>

                {isLoading ? (
                  <Button variant="primary btn-block" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Verifying...
                  </Button>
                ) : (
                  <Button type="submit" className="btn btn-primary btn-block">
                    {error}
                  </Button>
                )}

                <p className="forgot-password text-right">
                  <Button
                    onClick={() => toggleForm()}
                    className="btn mt-4"
                    size="sm"
                    variant="warning"
                  >
                    Already Have An Account?
                  </Button>
                </p>
              </form>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Signup;