import React, { useState, useContext } from "react";
import axios from "axios";

const GlobalContext = React.createContext();

export const useGlobal = () => useContext(GlobalContext);

export default function GlobalProvider({ children }) {
  let cachedActiveProjectId = parseInt(localStorage.getItem("activeProject"));
  // let loggedIn = localStorage.getItem("loggedIn");
  // const user = localStorage.getItem("user");
  const [projects, setProjects] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [isMod, setIsMod] = useState(false);
  // const [activeProject, setActiveProject] = useState(cachedActiveProjectId);
  // const [currentProjectId, setCurrentProjectId] = useState(
  //   cachedActiveProjectId
  // );
  // const authHeader = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  return (
    <GlobalContext.Provider
      value={{
        cachedActiveProjectId,
        currentProjectId,
        activeProject,
        setActiveProject,
        setCurrentProjectId,
        isMod,
        setIsMod,
        projects,
        permissions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
