import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import SetRolesModal from "./SetRolesModal";
import { useGlobal } from "../contexts/GlobalProvider";

// inheriting props from App.js
function Navigation({ history, location }) {
  const { user, setUser, isMod, projects, authHeader, expanded, setExpanded } =
    useGlobal();
  let loggedIn = localStorage.getItem("loggedIn");

  const logOut = async () => {
    await setUser(null);
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="bg-primary">
      <Container className="col-lg-7 m-auto">
        <Navbar variant="dark" expand="lg" expanded={expanded}>
          <Navbar.Brand className="text-light">
            the<span style={{ fontWeight: "800", color: "orange" }}>MVP</span>
            shop
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            {user && (
              <Nav
                variant="pills"
                // className="mr-auto d-flex"
                activeKey={location.pathname}
              >
                <NavLink
                  to="/projects"
                  className="nav-link text-warning"
                  onClick={() => setExpanded(false)}
                >
                  Projects
                </NavLink>
                <NavLink
                  to="/milestones"
                  className="nav-link text-warning"
                  onClick={() => setExpanded(false)}
                >
                  Milestones
                </NavLink>
                <NavLink
                  to="/devlog"
                  className="nav-link text-warning"
                  onClick={() => setExpanded(false)}
                >
                  DevLog
                </NavLink>
                <Nav.Item>
                  {isMod && (
                    <SetRolesModal
                      projects={projects}
                      authHeader={authHeader}
                    />
                  )}
                </Nav.Item>

                {/* {!user && (
                  <Link to="/login" className="nav-link">
                  Sign In
                  </Link>
                )} */}
                {/* <ProjectSelectModal /> */}
              </Nav>
            )}
            {loggedIn && (
              <Button
                variant="danger"
                // size="sm"
                onClick={logOut}
                className="ml-auto"
              >
                Logout
              </Button>
            )}
            {user && (
              <span className="text-light d-none d-lg-block ml-auto">
                Welcome <span className="text-warning">{user}</span>!
              </span>
            )}
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

export default Navigation;
