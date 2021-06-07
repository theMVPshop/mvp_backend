import React from "react";
import Navigation from "./components/Navigation";
import ReactRouter from "./ReactRouter";
import { HashRouter } from "react-router-dom";
import { withRouter } from "react-router";
import { GlobalProvider } from "./contexts/GlobalProvider";

function App() {
  const NavWithRouter = withRouter(Navigation);

  return (
    <HashRouter>
      <GlobalProvider>
        <NavWithRouter />
        <ReactRouter />
      </GlobalProvider>
    </HashRouter>
  );
}

export default App;
