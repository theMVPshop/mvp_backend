import React, { useState } from "react";
import Navigation from "./components/Navigation";
import ReactRouter from "./ReactRouter";
import { HashRouter } from "react-router-dom";
import { withRouter } from "react-router";
import MilestonesProvider from "./contexts/MilestonesProvider";
import ProjectsProvider from "./contexts/ProjectsProvider";

function App() {
  let cachedActiveProject = parseInt(localStorage.getItem("activeProject"));
  let loggedIn = localStorage.getItem("loggedIn");
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [currentProjectId, setCurrentProjectId] = useState(cachedActiveProject);
  const [activeProject, setActiveProject] = useState(cachedActiveProject);
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
        setCurrentProjectId={setCurrentProjectId}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        currentProjectId={currentProjectId}
        authHeader={authHeader}
      >
        <ProjectsProvider
          authHeader={authHeader}
          currentProjectId={currentProjectId}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          user={user}
        >
          <ReactRouter
            cachedActiveProject={cachedActiveProject}
            loggedIn={loggedIn}
            user={user}
            token={token}
            authHeader={authHeader}
            currentProjectId={currentProjectId}
            setCurrentProjectId={setCurrentProjectId}
            activeProject={activeProject}
            setActiveProject={setActiveProject}
          />
        </ProjectsProvider>
      </MilestonesProvider>
    </HashRouter>
  );
}

export default App;
