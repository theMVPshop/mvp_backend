import React from "react";
import { Switch, Route } from "react-router";

import Milestones from "./components/pages/Milestones";
import Projects from "./components/pages/Projects";
import Devlog from "./components/pages/Devlog";
import Login from "./components/Login";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/milestones" component={Milestones} />
      <Route path="/devlog" component={Devlog} />
      <Route path="/projects" component={Projects} />
    </Switch>
  );
};

export default Router;
