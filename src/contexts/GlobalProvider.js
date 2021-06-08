import React, { useState, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";

const GlobalContext = React.createContext();

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children, user }) => {
  // let loggedIn = localStorage.getItem("loggedIn");
  // const user = localStorage.getItem("user");
  let cachedActiveProjectId =
    parseInt(localStorage.getItem("activeProject")) || null;
  const [activeProject, setActiveProject] = useState(cachedActiveProjectId);
  const token = localStorage.getItem("token");
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [isMod, setIsMod] = useState(false);
  const [projects, setProjects] = useLocalStorage("projects", []);
  const [permissions, setPermissions] = useLocalStorage("permissions", []);

  // if someone is logged in, this will check to see if they are a moderator and store it in a useState hook as a boolean
  const checkModPrivilege = async () => {
    let response = await axios
      .get("/users", authHeader)
      .catch((error) =>
        console.log("failed to retrieve moderator status", error)
      );
    setIsMod(
      response.data.find((x) => x.username === user)?.isModerator === 1
        ? true
        : false
    );
  };

  const fetchProjects = async () => {
    let response = await axios
      .get("/projects", authHeader)
      .catch((error) => console.log("failed to populate projects", error));
    setProjects(response.data);
  };

  // fetch permissions table from API and store in hook
  const fetchPermissions = async () => {
    let response = await axios
      .get("/permissions", authHeader)
      .catch((error) => console.log("failed to fetch permissions", error));
    setPermissions(response.data);
  };

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
