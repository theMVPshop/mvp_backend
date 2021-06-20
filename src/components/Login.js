import React from "react";
import Signup from "./Signup";
import { Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
// import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import useLogin from "../hooks/useLogin";

const Login = ({ history }) => {
  const {
    input,
    cachedUser,
    error,
    toggleForm,
    loading,
    handleChange,
    showSignup,
    signup,
    login,
    loadingButton,
    loginButton,
    newUserButton,
  } = useLogin(history);

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
          loadingButton={loadingButton}
          loginButton={loginButton}
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

                  {loading ? loadingButton : loginButton}

                  <p className="forgot-password text-right">{newUserButton}</p>
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
