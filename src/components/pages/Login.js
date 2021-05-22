import React from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [redirectHome, setRedirectHome] = React.useState(false);
  const [email, setEmail] = React.useState("");

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
    username: username,
    password: password,
  };

  const login = async (e) => {
    e.preventDefault();
    setPassword("");
    setUsername("");
    await axios.post("/auth/login", userObject).then((res) => {
      let token = res.data.token;
      console.log(res);
      console.log(token);
      // if (res.date.response === "200") {
      localStorage.setItem("user", username);
      // }
      // props.setUser(username);
      // props.storeToken(token);
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
    <div class="container">
      <div class="row justify-content-center">
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
            Forgot <a href="#">password?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
