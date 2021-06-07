import React, { useState, useContext } from "react";
// import axios from "axios";

const GlobalContext = React.createContext();

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  let cachedActiveProjectId = parseInt(localStorage.getItem("activeProject"));
  const [activeProject, setActiveProject] = useState(cachedActiveProjectId);
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // const [isMod, setIsMod] = useState(false);
  // const [projects, setProjects] = useState(null);
  // const [permissions, setPermissions] = useState([]);
  // let loggedIn = localStorage.getItem("loggedIn");

  return (
    <GlobalContext.Provider
      value={{
        cachedActiveProjectId,
        user,
        token,
        authHeader,
        activeProject,
        setActiveProject,
        // isMod,
        // setIsMod,
        // projects,
        // setProjects,
        // permissions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
