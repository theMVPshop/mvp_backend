import React from "react";
import Navigation from "./components/Navigation";
import ReactRouter from "./ReactRouter";
import { HashRouter } from "react-router-dom";
import { withRouter } from "react-router";

function App() {
  const NavWithRouter = withRouter(Navigation);

  return (
    <HashRouter>
      <NavWithRouter />
      <ReactRouter />
    </HashRouter>
  );
}

export default App;
