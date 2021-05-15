import React from "react";
import Navigation from "./components/Navigation";
import ReactRouter from "./ReactRouter";
import axios from "axios";
import { withRouter } from "react-router";
import netlifyIdentity from "netlify-identity-widget";

function App() {
  netlifyIdentity.init();

  function initNetlifyIdentity() {
    const script = document.createElement("script");

    script.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
    script.async = true;

    document.body.appendChild(script);
  }

  function openNetlifyModal() {
    const netlifyIdentity = window.netlifyIdentity;

    if (netlifyIdentity) {
      netlifyIdentity.open();
      netlifyIdentity.on("login", (user) => {
        console.log("login", user);
        axios.get("/users").then((response) => {
          let existingUser = response.data.find(
            (x) => x.username === user.email
          );
          !existingUser &&
            axios.post("/users", {
              username: user.email,
              isModerator: 0,
            });
        });
        localStorage.setItem("loggedIn", "true");
        window.location.reload();
      });
      netlifyIdentity.on("logout", () => {
        localStorage.setItem("loggedIn", "false");
        window.location.reload();
      });
    } else {
      console.log("netlifyIdentity not defined");
    }
  }

  function NetlifyIdentity() {
    React.useEffect(() => {
      initNetlifyIdentity();
    }, []);

    return <></>;
  }

  const NavWithRouter = withRouter(Navigation);
  let localStorageCurrentUser = JSON.parse(
    localStorage.getItem("gotrue.user")
  )?.email;

  return (
    <>
      <NavWithRouter
        NetlifyIdentity={NetlifyIdentity}
        openNetlifyModal={openNetlifyModal}
      />
      <ReactRouter localStorageCurrentUser={localStorageCurrentUser} />
    </>
  );
}

export default App;
