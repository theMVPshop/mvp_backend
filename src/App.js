import React from "react";
import Navigation from "./components/Navigation";
import ReactRouter from "./ReactRouter";
import { HashRouter } from "react-router-dom";
import { withRouter } from "react-router";

function App() {
  let cachedActiveProject = parseInt(localStorage.getItem("activeProject"));
  let loggedIn = localStorage.getItem("loggedIn");
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const NavWithRouter = withRouter(Navigation);

  return (
    <HashRouter>
      <NavWithRouter user={user} loggedIn={loggedIn} />
      <ReactRouter
        cachedActiveProject={cachedActiveProject}
        loggedIn={loggedIn}
        user={user}
        token={token}
      />
    </HashRouter>
  );
}

export default App;
