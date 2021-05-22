import React from "react";
import { Redirect } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

function Navigation({ location, NetlifyIdentity, openNetlifyModal }) {
  const [redirect, setRedirect] = React.useState(null);

  const handleRedirect = (link) => {
    setRedirect(link);
  };

  // let loggedIn = localStorage.getItem("loggedIn");
  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div style={{ paddingBottom: "6px" }}>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/" style={{ color: "white" }}>
            the<span style={{ fontWeight: "800", color: "orange" }}>MVP</span>
            shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" activeKey={location.pathname}>
              <Nav.Link onClick={() => handleRedirect("/projectspage")}>
                Projects
              </Nav.Link>
              <Nav.Link onClick={() => handleRedirect("/milestonespage")}>
                Milestones
              </Nav.Link>
              <Nav.Link onClick={() => handleRedirect("/devlogpage")}>
                DevLog
              </Nav.Link>
              <Nav.Link onClick={() => handleRedirect("/login")}>
                Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {/* <NetlifyIdentity /> */}
          {/* <Button
          // onClick={() => {
          //   openNetlifyModal();
          // }}
          >
            {loggedIn === "true" ? "Logout" : "Login"}
          </Button> */}
        </Navbar>
      </div>
    </>
  );
}

export default Navigation;
