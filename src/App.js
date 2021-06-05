import React, { useState } from "react";
import Navigation from "./components/Navigation";
import ReactRouter from "./ReactRouter";
import { HashRouter } from "react-router-dom";
import { withRouter } from "react-router";
import MilestonesProvider from "./contexts/MilestonesProvider";

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

  const NavWithRouter = withRouter(Navigation);

  return (
    <HashRouter>
      <NavWithRouter user={user} loggedIn={loggedIn} />
      <MilestonesProvider
        projects={projects}
        currentProjectId={currentProjectId}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        setProjects={setProjects}
        currentProjectId={currentProjectId}
        authHeader={authHeader}
      >
        <ReactRouter
          cachedActiveProject={cachedActiveProject}
          loggedIn={loggedIn}
          user={user}
          token={token}
        />
      </MilestonesProvider>
    </HashRouter>
  );
}

export default App;
