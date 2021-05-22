import React from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [redirectHome, setRedirectHome] = React.useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const userObject = {
    username,
    password,
    email,
  };

  const signup = async (e) => {
    e.preventDefault();
    await axios.post("/auth/signup", userObject);
    await axios.post("/auth/login", userObject).then((res) => {
      localStorage.setItem("user", username);
      // props.storeToken(res.data.token);
    });
    await axios.post("/users", userObject);
    // const profile = props.profile;
    // props.setProfile(profile);
    // props.setUser(props.profile.username);
    setRedirectHome(true);
  };

  if (redirectHome) {
    return <Redirect to="/" />;
  }

  return (
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
              onChange={handleEmailChange}
              value={email}
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
              onChange={handleUsernameChange}
              value={username}
              className="form-control"
              placeholder="Enter Username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              onChange={handlePasswordChange}
              value={password}
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
        </form>
      </div>
    </div>
  );
};

export default Signup;
