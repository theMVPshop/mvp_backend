import React, { useState } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

const Login = ({ setUser, history }) => {
  let cachedUser = localStorage.getItem("user");
  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) =>
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const clearForm = () =>
    setInput({
      username: "",
      password: "",
      // email: "",
    });

  const login = async (e) => {
    e.preventDefault();
    await axios
      .post("/auth/login", input)
      .then((res) => {
        localStorage.setItem("user", input.username);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("loggedIn", true);
        setUser(input.username);
        clearForm();
      })
      .catch((error) => console.log("login error", error));
    history.push("/projects");
  };

  return (
    <>
      {cachedUser && <Redirect to="/projects" />}
      <div className="container">
        <div className="row justify-content-center">
          <form onSubmit={login} className="bg-dark col-3 text-light">
            <h3>Sign In</h3>
            {/* 
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
            </div> */}

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
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
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
            <p className="forgot-password text-right">
              <Link to="/signup" className="nav-link">
                New user?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
