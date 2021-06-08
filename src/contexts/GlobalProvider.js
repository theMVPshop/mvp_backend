import React, { useState, useContext } from "react";
import axios from "axios";

const GlobalContext = React.createContext();

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children, user }) => {
  // let loggedIn = localStorage.getItem("loggedIn");
  let cachedActiveProjectId =
    parseInt(localStorage.getItem("activeProject")) || null;
  const [activeProject, setActiveProject] = useState(cachedActiveProjectId);
  // const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [isMod, setIsMod] = useState(false);
  const [projects, setProjects] = useState(null);
  const [permissions, setPermissions] = useState([]);

  // if someone is logged in, this will check to see if they are a moderator and store it in a useState hook as a boolean
  const checkModPrivilege = () =>
    user &&
    axios
      .get("/users", authHeader)
      .then((response) => {
        setIsMod(
          response.data.find((x) => x.username === user)?.isModerator === 1
            ? true
            : false
        );
      })
      .catch((error) =>
        console.log("failed to retrieve moderator status", error)
      );

  const fetchProjects = () =>
    axios
      .get("/projects", authHeader)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log("failed to populate projects", error));

  // fetch permissions table from API and store in hook
  const fetchPermissions = () =>
    axios
      .get("/permissions", authHeader)
      .then((response) => setPermissions(response.data))
      .catch((error) => console.log("failed to fetch permissions", error));

  React.useEffect(() => {
    fetchProjects();
    checkModPrivilege();
    fetchPermissions();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        cachedActiveProjectId,
        user,
        token,
        authHeader,
        activeProject,
        setActiveProject,
        isMod,
        projects,
        setProjects,
        fetchProjects,
        permissions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
