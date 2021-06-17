import React from "react";
import Signup from "./Signup";
import { Redirect } from "react-router-dom";
import { Spinner, Button, Container } from "react-bootstrap";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
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
