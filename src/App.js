import React from "react";
import Navigation from "./components/Navigation";
import ReactRouter from "./ReactRouter";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router";

function App() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const userObject = {
    username: username,
    password: password,
  };

  const login = async (e) => {
    e.preventDefault();
    setPassword("");
    setUsername("");
    setDenyPopup(true);
    await axios.post("/auth/login", userObject).then((res) => {
      console.log(res);
      // if (res.date.response === "200") {
      localStorage.setItem("user", username);
      localStorage.setItem("user", username);
      // }
    });
    goHome();
  };

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
