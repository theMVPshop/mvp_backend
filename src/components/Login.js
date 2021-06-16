import React, { useState } from "react";
import axios from "axios";
import Signup from "./Signup";
import { Redirect } from "react-router-dom";
import { Spinner, Button, Container } from "react-bootstrap";
import { useGlobal } from "../contexts/GlobalProvider";

const Login = ({ history }) => {
  let cachedUser = localStorage.getItem("user");
  const { setUser, setIsMod } = useGlobal();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("Login");
  const [showSignup, setshowSignup] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
  });

  const toggleForm = () => setshowSignup(!showSignup);

  const handleChange = (e) =>
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  // const clearForm = () =>
  //   setInput({
  //     username: "",
  //     password: "",
  //   });

  // if someone is logged in, this will check to see if they are a moderator and store it in a useState hook as a boolean
  const checkModPrivilege = async (username, authHeader) => {
    try {
      let response = await axios.get("/users", authHeader);
      let users = await response.data;
      setIsMod(
        users.find((x) => x.username === username)?.isModerator === 1
          ? true
          : false
      );
    } catch (error) {
      console.log("failed to retrieve moderator status", error);
    }
  };

  const login = async (event) => {
    event?.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/auth/login", input);
      if (response.status === 200) {
        let lowercasedUsername = input.username.toLowerCase();
        let token = response.data.token;
        let authHeader = { headers: { Authorization: `Bearer ${token}` } };
        localStorage.setItem("user", lowercasedUsername);
        localStorage.setItem("token", token);
        localStorage.setItem("loggedIn", true);
        setUser(lowercasedUsername);
        checkModPrivilege(lowercasedUsername, authHeader);
        history.push("/projects");
      }
    } catch (error) {
      setError(
        error.response.status == 404
          ? "User Not Found"
          : error.response.status == 400
          ? "Wrong Password"
          : "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    let userObject = {
      username: input.username.toLowerCase(),
      isModerator: 0,
    };
    try {
      let response = await axios.post("/auth/signup", input);
      if (response.status === 200) {
        await axios.post("/users", userObject);
        login();
      }
    } catch (error) {
      console.log("failed to create user", error);
      setError(
        error.response.status == 409 ? "User Already Exists" : "Login Failed"
      );
      setLoading(false);
    }
  };

  return (
    <>
      {showSignup ? (
        <Signup
          loading={loading}
          toggleForm={toggleForm}
          showSignup={showSignup}
          signup={signup}
          handleChange={handleChange}
          input={input}
          error={error}
        />
      ) : (
        <>
          {cachedUser && <Redirect to="/projects" />}
          <div className="container">
            <Container className="">
              <div className="row justify-content-center">
                <form
                  onSubmit={login}
                  className="bg-primary m-3 col-sm-1 col-lg-3 text-light"
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

                  {loading ? (
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
                      {error}
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
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
