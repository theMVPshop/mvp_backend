import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import SetRolesModal from "./SetRolesModal";
// import MilestonesProjectSelectModal from "./MilestonesProjectSelectModal";
import { useGlobal } from "../contexts/GlobalProvider";

// inheriting props from App.js
function Navigation({ history, location }) {
  const { user, setUser, isMod, projects, authHeader } = useGlobal();
  let loggedIn = localStorage.getItem("loggedIn");

  const logOut = async () => {
    await setUser(null);
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="bg-primary">
      <Container className="col-lg-7 m-auto">
        <Navbar variant="dark" expand="lg" className="">
          <Navbar.Brand className="text-light">
            the<span style={{ fontWeight: "800", color: "orange" }}>MVP</span>
            shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {user && (
              <Nav
                variant="pills"
                className="mr-auto d-flex"
                activeKey={location.pathname}
              >
                <Nav.Item>
                  <NavLink to="/projects" className="nav-link text-warning">
                    Projects
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="/milestones" className="nav-link text-warning">
                    Milestones
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="/devlog" className="nav-link text-warning">
                    DevLog
                  </NavLink>
                </Nav.Item>
                <div className="ml-auto d-flex">
                  {isMod && (
                    <SetRolesModal
                      projects={projects}
                      authHeader={authHeader}
                      className="ml-auto"
                    />
                  )}
                  {loggedIn && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={logOut}
                      className="m-1 ml-auto"
                    >
                      Logout
                    </Button>
                  )}
                </div>

                {/* {!user && (
                  <Link to="/login" className="nav-link">
                    Sign In
                  </Link>
                )} */}
                {/* <MilestonesProjectSelectModal /> */}
              </Nav>
            )}
            {user && (
              <span className="text-light d-none d-lg-block">
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
