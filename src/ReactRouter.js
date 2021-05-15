import React from "react";
import { Switch, Route } from "react-router";

import Home from "./components/pages/Home";
import Milestones from "./components/pages/Milestones";
import Projects from "./components/pages/Projects";
import Devlog from "./components/pages/Devlog";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/milestonespage" component={Milestones} />
      <Route path="/devlogpage" component={Devlog} />
      <Route path="/projectspage" component={Projects} />
    </Switch>
  );
};

export default Router;
