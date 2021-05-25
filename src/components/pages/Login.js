import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [redirect, setRedirect] = React.useState(null);
  const [redirectHome, setRedirectHome] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleRedirect = (link) => {
    setRedirect(link);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const userCredsObject = {
    username: username,
    password: password,
  };

  const login = async (e) => {
    e.preventDefault();
    setPassword("");
    setUsername("");
    await axios
      .post("http://localhost:4001/auth/login", userCredsObject)
      .then((res) => {
        localStorage.setItem("user", username);
        localStorage.setItem("token", res.data.token);
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        console.log(user);
        console.log(token);
      });
    goHome();
  };

  const goHome = () => {
    setRedirectHome(true);
  };

  if (redirectHome) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className="container">
        <div className="row justify-content-center">
          <form onSubmit={login} className="bg-dark col-3 text-light">
            <h3>Sign In</h3>

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
              <Nav.Link onClick={() => handleRedirect("/signup")}>
                New user?
              </Nav.Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
