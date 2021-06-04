import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [redirectHome, setRedirectHome] = useState(false);

  const handleChange = (e) =>
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const userObject = {
    username: input.username,
    isModerator: 0,
  };

  const clearForm = () =>
    setInput({
      username: "",
      password: "",
      email: "",
    });

  const login = () =>
    axios
      .post("/auth/login", input)
      .then((res) => {
        localStorage.setItem("user", input.username);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("loggedIn", true);
        setRedirectHome(true);
      })
      .catch((error) => console.log("failed to log in", error));

  const signup = async (e) => {
    e.preventDefault();
    await axios
      .post("/auth/signup", input)
      .catch((error) => console.log("failed to create user", error));
    await axios
      .post("/users", userObject)
      .catch((error) => console.log("failed to add user to db", error));
    clearForm();
    login();
  };

  return (
    <>
      {redirectHome && <Redirect to="/projects" />}
      <div className="container">
        <div className="row justify-content-center">
          <form onSubmit={signup} className="bg-dark col-3 text-light">
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

            <button type="submit" className="btn btn-primary btn-block">
              Create Account
            </button>
            <p></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
