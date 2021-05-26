import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [redirectHome, setRedirectHome] = useState(null);

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const userObject = {
    username: input.username,
    isModerator: 0,
  };

  const login = async () => {
    await axios.post("http://localhost:4001/auth/login", input).then((res) => {
      localStorage.setItem("user", input.username);
      localStorage.setItem("token", res.data.token);
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      console.log(user);
      console.log(token);
    });
    setRedirectHome(true);
  };

  const signup = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4001/auth/signup", input);
    await axios.post("http://localhost:4001/users", userObject);
    setInput({
      username: "",
      password: "",
      email: "",
    });
    login();
  };

  return (
    <>
      {redirectHome && <Redirect to="/" />}
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
