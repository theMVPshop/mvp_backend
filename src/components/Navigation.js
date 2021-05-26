import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function Navigation({ location }) {
  // let loggedIn = localStorage.getItem("loggedIn");
  return (
    <div style={{ paddingBottom: "6px" }}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/" style={{ color: "white" }}>
          the<span style={{ fontWeight: "800", color: "orange" }}>MVP</span>
          shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" activeKey={location.pathname}>
            <Link to="/projectspage" className="nav-link">
              Projects
            </Link>
            <Link to="/milestonespage" className="nav-link">
              Milestones
            </Link>
            <Link to="/devlogpage" className="nav-link">
              DevLog
            </Link>
            {/* <Link to="/login" className="nav-link">
              Sign In
            </Link> */}
          </Nav>
        </Navbar.Collapse>
        {/* <Button>{loggedIn === "true" ? "Logout" : "Login"}</Button> */}
      </Navbar>
    </div>
  );
}

export default Navigation;
