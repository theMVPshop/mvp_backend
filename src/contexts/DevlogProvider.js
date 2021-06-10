import React, { useState, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGlobal } from "./GlobalProvider";
import axios from "axios";

const DevlogContext = React.createContext();

export const useDevlog = () => useContext(DevlogContext);

export const DevlogProvider = ({ children, user, setUser }) => {
  // let loggedIn = localStorage.getItem("loggedIn");
  // const user = localStorage.getItem("user");
  let cachedActiveProjectId =
    parseInt(localStorage.getItem("activeProject")) || null;

  const fetchLogs = () =>
    axios
      .get(`/devlog/${activeProject}`, authHeader)
      .then((response) => setLogs(response.data))
      .catch((error) => console.log(error));

  useEffect(() => fetchLogs(), [activeProject]);

  const removeLog = (Id) => {
    const reqBody = {
      headers: { Authorization: `Bearer ${token}` },
      data: { id: Id },
    };
    axios
      .delete(`/devlog/${Id}`, reqBody)
      .then(() => fetchLogs())
      .catch((error) => console.log("delete devlog error", error));
  };

  return (
    <DevlogContext.Provider
      value={{
        cachedActiveProjectId,
        user,
        setUser,
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
    </DevlogContext.Provider>
  );
};
