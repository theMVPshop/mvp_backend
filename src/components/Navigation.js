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
                className="mr-auto"
                activeKey={location.pathname}
              >
                <Nav.Item>
                  <NavLink to="/projects" className="nav-link">
                    Projects
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="/milestones" className="nav-link">
                    Milestones
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="/devlog" className="nav-link">
                    DevLog
                  </NavLink>
                </Nav.Item>

                {/* {!user && (
                  <Link to="/login" className="nav-link">
                    Sign In
                  </Link>
                )} */}
                {/* <MilestonesProjectSelectModal /> */}
              </Nav>
            )}
          </Navbar.Collapse>
          {user && (
            <span className="text-light">
              Welcome <span className="text-warning">{user}</span>!
            </span>
          )}
          {isMod && (
            <SetRolesModal projects={projects} authHeader={authHeader} />
          )}
          {loggedIn && (
            <Button variant="danger" size="sm" onClick={logOut}>
              Logout
            </Button>
          )}
        </Navbar>
      </Container>
    </div>
  );
}

export default Navigation;
