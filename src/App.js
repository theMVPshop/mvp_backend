import React from "react";
import Navigation from "./components/Navigation";
import ReactRouter from "./ReactRouter";
import { HashRouter } from "react-router-dom";
import { withRouter } from "react-router";
import { GlobalProvider } from "./contexts/GlobalProvider";
import Login from "./components/pages/Login";

export default function App() {
  const cachedUser = localStorage.getItem("user");
  const [user, setUser] = React.useState(cachedUser);
  const NavWithRouter = withRouter(Navigation);

  const home = (
    <HashRouter>
      <GlobalProvider>
        <NavWithRouter />
        <ReactRouter />
      </GlobalProvider>
    </HashRouter>
  );

  const login = (
    <HashRouter>
      <NavWithRouter />
      <Login setUser={setUser} />
    </HashRouter>
  );

  return user ? home : login;
}
