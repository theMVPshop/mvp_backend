import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

function Navigation({ location, history, user, setUser }) {
  let loggedIn = localStorage.getItem("loggedIn");

  const logOut = async () => {
    await setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("activeProject");
    history.push("/");
  };

  return (
    <>
      <div
        className="pb-3"
        style={{ paddingBottom: "6px", backgroundColor: "#441091" }}
      >
        <div style={{ margin: "auto" }} className="col-7">
          <Navbar variant="dark" expand="lg">
            <Navbar.Brand style={{ color: "white" }}>
              the<span style={{ fontWeight: "800", color: "orange" }}>MVP</span>
              shop
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {user && (
                <Nav className="mr-auto" activeKey={location.pathname}>
                  <Link to="/projects" className="nav-link">
                    Projects
                  </Link>
                  <Link to="/milestones" className="nav-link">
                    Milestones
                  </Link>
                  <Link to="/devlog" className="nav-link">
                    DevLog
                  </Link>
                  {/* {!user && (
                  <Link to="/login" className="nav-link">
                    Sign In
                  </Link>
                )} */}
                </Nav>
              )}
            </Navbar.Collapse>
            {user && (
              <span style={{ color: "white", marginRight: "1rem" }}>
                Welcome <span style={{ color: "orange" }}>{user}</span>!
              </span>
            )}
            {loggedIn === "true" && (
              <Button variant="danger" onClick={logOut}>
                Logout
              </Button>
            )}
          </Navbar>
        </div>
      </div>
    </>
  );
}

export default Navigation;
