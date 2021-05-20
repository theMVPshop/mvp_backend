import React from "react";
import { Switch, Route } from "react-router";

import Home from "./components/pages/Home";
import Milestones from "./components/pages/Milestones";
import Projects from "./components/pages/Projects";
import Devlog from "./components/pages/Devlog";
// import Login from "./components/pages/Login";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/milestonespage" component={Milestones} />
      <Route path="/devlogpage" component={Devlog} />
      <Route path="/projectspage" component={Projects} />
<<<<<<< HEAD
=======
      {/* <Route path="/login" component={Login} /> */}
>>>>>>> f0a16d44a4a69f774e63777724df1a3abee9e1c9
    </Switch>
  );
};

export default Router;
