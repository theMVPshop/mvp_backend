import React from "react";
import Navigation from "./components/Navigation";
import ReactRouter from "./ReactRouter";
import { withRouter } from "react-router";
import OutsideAlerter from "./hooks/OutsideAlerter.js";
import { GlobalProvider } from "./contexts/GlobalProvider";
import { DevlogProvider } from "./contexts/DevlogProvider";
import { MilestonesProvider } from "./contexts/MilestonesProvider";
import Login from "./components/Login";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.scss";

export default function App() {
  const cachedUser = localStorage.getItem("user");
  const [user, setUser] = React.useState(cachedUser);
  const NavWithRouter = withRouter(Navigation);
  const LoginWithRouter = withRouter(Login);

  return (
    <GlobalProvider user={user} setUser={setUser}>
      <DevlogProvider>
        <MilestonesProvider>
          <OutsideAlerter>
            <NavWithRouter />
          </OutsideAlerter>
          {user ? <ReactRouter /> : <LoginWithRouter />}
        </MilestonesProvider>
      </DevlogProvider>
    </GlobalProvider>
  );
}
