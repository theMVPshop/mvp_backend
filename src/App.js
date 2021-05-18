import React from "react";
import Navigation from "./components/Navigation";
import ReactRouter from "./ReactRouter";
import { BrowserRouter } from "react-router-dom";
// import axios from "axios";
import { withRouter } from "react-router";

function App() {
  const NavWithRouter = withRouter(Navigation);
  // let localStorageCurrentUser = JSON.parse(
  //   localStorage.getItem("gotrue.user")
  // )?.email;

  return (
    <BrowserRouter>
      <NavWithRouter
      // NetlifyIdentity={NetlifyIdentity}
      // openNetlifyModal={openNetlifyModal}
      />
      <ReactRouter />
    </BrowserRouter>
  );
}

export default App;
