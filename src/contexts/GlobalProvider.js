import React, { useState, useContext } from "react";
// import axios from "axios";

const GlobalContext = React.createContext();

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  let cachedActiveProjectId = parseInt(localStorage.getItem("activeProject"));
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // const [projects, setProjects] = useState(null);
  // const [permissions, setPermissions] = useState([]);
  // const [isMod, setIsMod] = useState(false);
  // let loggedIn = localStorage.getItem("loggedIn");
  // const [activeProject, setActiveProject] = useState(cachedActiveProjectId);
  // const [currentProjectId, setCurrentProjectId] = useState(
  //   cachedActiveProjectId
  // );

  return (
    <GlobalContext.Provider
      value={{
        cachedActiveProjectId,
        user,
        token,
        authHeader,
        // currentProjectId,
        // activeProject,
        // setActiveProject,
        // setCurrentProjectId,
        // isMod,
        // setIsMod,
        // projects,
        // permissions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
