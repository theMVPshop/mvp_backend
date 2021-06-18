import React from "react";
import Navigation from "./components/Navigation";
import ReactRouter from "./ReactRouter";
import { withRouter } from "react-router";
import OutsideAlerter from "./hooks/OutsideAlerter.js";
import { GlobalProvider } from "./contexts/GlobalProvider";
import { DevlogProvider } from "./contexts/DevlogProvider";
import { MilestonesProvider } from "./contexts/MilestonesProvider";
import { ProjectsProvider } from "./contexts/ProjectsProvider";
import Login from "./components/Login";

export default function App() {
  let cachedUser = localStorage.getItem("user");
  const [user, setUser] = React.useState(cachedUser);
  const NavWithRouter = withRouter(Navigation);
  const LoginWithRouter = withRouter(Login);

  return (
    <GlobalProvider user={user} setUser={setUser}>
      <ProjectsProvider>
        <DevlogProvider>
          <MilestonesProvider>
            <OutsideAlerter>
              <NavWithRouter />
            </OutsideAlerter>
            {user ? <ReactRouter /> : <LoginWithRouter />}
          </MilestonesProvider>
        </DevlogProvider>
      </ProjectsProvider>
    </GlobalProvider>
  );
}
