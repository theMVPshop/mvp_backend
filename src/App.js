import React, { useState } from "react";
import Navigation from "./components/Navigation";
import ReactRouter from "./ReactRouter";
import { HashRouter } from "react-router-dom";
import { withRouter } from "react-router";
import MilestonesProvider from "./contexts/MilestonesProvider";
import ContextProvider from "./contexts/ContextProvider";

function App() {
  let cachedActiveProject = parseInt(localStorage.getItem("activeProject"));
  let loggedIn = localStorage.getItem("loggedIn");
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState([]);
  const [projects, setProjects] = useState(null);
  const [isMod, setIsMod] = useState(false);
  const [logs, setLogs] = useState([]);
  const [activeProject, setActiveProject] = useState(cachedActiveProject);
  const [currentProjectId, setCurrentProjectId] = useState(cachedActiveProject);
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // fetch permissions table from API and store in hook
  const fetchPermissions = () =>
    axios
      .get("/permissions", authHeader)
      .then((response) => setPermissions(response.data))
      .catch((error) => console.log("permissions failed to load", error));

  // fetch projects table from API and store in hook
  const populateProjects = () =>
    axios
      .get("/projects", authHeader)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log("projects failed to load", error));

  // if someone is logged in, this will check to see if they are a moderator and store it in a useState hook (line 15) as a boolean
  const checkModPrivilege = () =>
    user &&
    axios
      .get("/users", authHeader)
      .then((response) => {
        setIsMod(
          response.data.find((x) => x.username === user)?.isModerator === 1
            ? true
            : false
        );
      })
      .catch((error) => console.log("failed to set moderator", error));

  const NavWithRouter = withRouter(Navigation);

  return (
    <HashRouter>
      <NavWithRouter user={user} loggedIn={loggedIn} />
      <ContextProvider>
        {/* <MilestonesProvider
          projects={projects}
          currentProjectId={currentProjectId}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          setProjects={setProjects}
          currentProjectId={currentProjectId}
          authHeader={authHeader}
        > */}
        <ReactRouter
          cachedActiveProject={cachedActiveProject}
          loggedIn={loggedIn}
          user={user}
          token={token}
          populateProjects={populateProjects}
          fetchPermissions={fetchPermissions}
          checkModPrivilege={checkModPrivilege}
        />
        {/* </MilestonesProvider> */}
      </ContextProvider>
    </HashRouter>
  );
}

export default App;
