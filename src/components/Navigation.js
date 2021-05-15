import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

function Navigation({ location, NetlifyIdentity, openNetlifyModal }) {
  let loggedIn = localStorage.getItem("loggedIn");
  return (
    <div style={{ paddingBottom: "6px" }}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/" style={{ color: "white" }}>
          the<span style={{ fontWeight: "800", color: "orange" }}>MVP</span>shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" activeKey={location.pathname}>
            <Nav.Link href="/projectspage">Projects</Nav.Link>
            <Nav.Link href="/milestonespage">Milestones</Nav.Link>
            <Nav.Link href="/devlogpage">DevLog</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <NetlifyIdentity />
        <Button
          onClick={() => {
            openNetlifyModal();
          }}
        >
          {loggedIn === "true" ? "Logout" : "Login"}
        </Button>
      </Navbar>
    </div>
  );
}

export default Navigation;
