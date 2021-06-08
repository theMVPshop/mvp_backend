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
  const LoginWithRouter = withRouter(Login);

  return (
    <GlobalProvider user={user}>
      <HashRouter>
        <NavWithRouter user={user} setUser={setUser} />
        {user ? (
          <ReactRouter />
        ) : (
          <LoginWithRouter user={user} setUser={setUser} />
        )}
      </HashRouter>
    </GlobalProvider>
  );
}
