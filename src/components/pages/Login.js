import React, { useState } from "react";
import axios from "axios";
import Signup from "../pages/Signup";
import { Redirect, Link } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";

const Login = ({ setUser, history }) => {
  let cachedUser = localStorage.getItem("user");
  const [isLoading, setIsLoading] = useState(false);
  const [toggleSignup, setToggleSignup] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const toggleForm = () => setToggleSignup(!toggleSignup);

  const handleChange = (e) =>
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const clearForm = () =>
    setInput({
      username: "",
      password: "",
    });

  const login = async (e) => {
    setIsLoading(true);
    // clearForm();
    e.preventDefault();
    await axios
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
        console.log("login error", error);
      })
      .then(() => {
        setIsLoading(false);
      });
    history.push("/projects");
  };

  return (
    <>
      {toggleSignup ? (
        <Signup
          history={history}
          setUser={setUser}
          login={login}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          toggleForm={toggleForm}
          toggleSignup={toggleSignup}
        />
      ) : (
        <>
          {cachedUser && <Redirect to="/projects" />}
          <div className="container">
            <div className="row justify-content-center">
              <form
                onSubmit={login}
                className="bg-dark col-3 text-light"
                style={{ borderRadius: "1rem" }}
              >
                <h3>Sign In</h3>

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

                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      Remember me
                    </label>
                  </div>
                </div>

                {isLoading ? (
                  <>
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
                  </>
                ) : (
                  <Button type="submit" className="btn btn-primary btn-block">
                    Submit
                  </Button>
                )}

                <p className="forgot-password text-right">
                  <Button
                    onClick={() => toggleForm()}
                    className="btn mt-4"
                    size="sm"
                    variant="success"
                  >
                    New user?
                  </Button>
                </p>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
