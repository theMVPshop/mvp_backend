import React from "react";
import { Switch, Route } from "react-router";

import Home from "./components/pages/Home";
import Milestones from "./components/pages/Milestones";
import Projects from "./components/pages/Projects";
import Devlog from "./components/pages/Devlog";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Projects} />
      <Route path="/milestonespage" component={Milestones} />
      <Route path="/devlogpage" component={Devlog} />
      <Route path="/projectspage" component={Projects} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  );
};

export default Router;
