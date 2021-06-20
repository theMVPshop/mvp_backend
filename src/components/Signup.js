import React from "react";
import { Button, Spinner } from "react-bootstrap";
import Login from "./Login";

// inheriting props from--and is always rendered by--Login.js
const Signup = ({
  loading,
  loadingButton,
  loginButton,
  toggleForm,
  showSignup,
  signup,
  handleChange,
  input,
}) => {
  return (
    <>
      {showSignup ? (
        <>
          <div className="container">
            <div className="row justify-content-center">
              <form
                onSubmit={signup}
                className="bg-primary m-3 col-sm-1 col-lg-3 text-light"
                style={{ borderRadius: "1rem" }}
              >
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

                {loading ? loadingButton : loginButton}

                <p className="forgot-password text-right">
                  <Button
                    onClick={() => toggleForm()}
                    className="btn mt-4"
                    size="sm"
                    variant="warning"
                  >
                    Already Have An Account?
                  </Button>
                </p>
              </form>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Signup;
