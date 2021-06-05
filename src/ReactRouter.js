import React, { useState } from "react";
import { Switch, Route } from "react-router";
import axios from "axios";

import Home from "./components/pages/Home";
import Milestones from "./components/pages/Milestones";
import Projects from "./components/pages/Projects";
import Devlog from "./components/pages/Devlog";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

// import { fetchMilestones, populateProjects } from "./globalProps";

const Router = ({
  cachedActiveProject,
  loggedIn,
  user,
  token,
  populateProjects,
  fetchPermissions,
  checkModPrivilege,
}) => {
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

  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/milestones" component={Milestones} />
      <Route
        path="/devlog"
        render={(props) => <Devlog {...props} user={user} token={token} />}
      />
      <Route
        path="/projects"
        render={(props) => (
          <Projects
            {...props}
            user={user}
            token={token}
            populateProjects={populateProjects}
            fetchPermissions={fetchPermissions}
            checkModPrivilege={checkModPrivilege}
          />
        )}
      />
      <Route
        path="/login"
        render={(props) => <Login {...props} user={user} token={token} />}
      />
      <Route
        path="/signup"
        render={(props) => <Signup {...props} user={user} token={token} />}
      />{" "}
    </Switch>
  );
};

export default Router;

{
  /* <Route
  path="/projects"
  render={(props) => (
    <Projects {...props} localStorageCurrentUser={localStorageCurrentUser} />
  )}
/>; */
}
