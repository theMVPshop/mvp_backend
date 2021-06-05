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

const Router = ({ cachedActiveProject, loggedIn, user, token }) => {
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

  // Milestones.js methods
  const fetchMilestones = () =>
    axios
      .get(`/milestones/${currentProjectId}`, authHeader)
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error));

  const populateProjects = () =>
    axios
      .get("/projects", authHeader)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));

  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route
        path="/milestones"
        render={(props) => (
          <Milestones
            {...props}
            user={user}
            token={token}
            cachedActiveProject={cachedActiveProject}
            todos={todos}
            setTodos={setTodos}
            projects={projects}
            setProjects={setProjects}
            currentProjectId={currentProjectId}
            setCurrentProjectId={setCurrentProjectId}
            activeProject={activeProject}
            setActiveProject={setActiveProject}
            authHeader={authHeader}
            fetchMilestones={fetchMilestones}
            populateProjects={populateProjects}
          />
        )}
      />
      <Route
        path="/devlog"
        render={(props) => <Devlog {...props} user={user} token={token} />}
      />
      <Route
        path="/projects"
        render={(props) => <Projects {...props} user={user} token={token} />}
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
