import React, { useState, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const GlobalContext = React.createContext();

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children, user, setUser }) => {
  let cachedActiveProjectId =
    parseInt(localStorage.getItem("activeProject")) || undefined;
  const [activeProject, setActiveProject] = useLocalStorage(
    "activeProject",
    cachedActiveProjectId
  );
  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };
  const [isMod, setIsMod] = useLocalStorage("isMod", false);
  const [expanded, setExpanded] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        cachedActiveProjectId,
        user,
        setUser,
        token,
        authHeader,
        activeProject,
        setActiveProject,
        setIsMod,
        isMod,
        expanded,
        setExpanded,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
