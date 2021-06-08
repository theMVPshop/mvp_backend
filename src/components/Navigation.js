import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import SetRolesModal from "./SetRolesModal";
import MilestonesProjectSelectModal from "./MilestonesProjectSelectModal";
import { useGlobal } from "../contexts/GlobalProvider";

// inheriting props from App.js
function Navigation({ location, history, user, setUser }) {
  const { isMod, projects, authHeader } = useGlobal();
  let loggedIn = localStorage.getItem("loggedIn");

  const logOut = async () => {
    await setUser(null);
    localStorage.clear();
    history.push("/");
  };

  return (
    <>
      <div className="bg-primary" style={{ color: "white" }}>
        <div className="col-7 m-auto">
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
                  {/* <MilestonesProjectSelectModal /> */}
                </Nav>
              )}
            </Navbar.Collapse>
            {user && (
              <span style={{ color: "white" }}>
                Welcome <span style={{ color: "orange" }}>{user}</span>!
              </span>
            )}
            {isMod && (
              <SetRolesModal projects={projects} authHeader={authHeader} />
            )}
            {loggedIn === "true" && (
              <Button variant="danger" size="sm" onClick={logOut}>
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
