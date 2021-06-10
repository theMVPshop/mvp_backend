import React, { useEffect, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGlobal } from "./GlobalProvider";
import axios from "axios";

const DevlogContext = React.createContext();

export const useDevlog = () => useContext(DevlogContext);

export const DevlogProvider = ({ children }) => {
  const { activeProject, setActiveProject, authHeader, token } = useGlobal();
  const [logs, setLogs] = useLocalStorage("logs", []);

  const fetchLogs = () =>
    axios
      .get(`/devlog/${activeProject}`, authHeader)
      .then((response) => setLogs(response.data))
      .catch((error) => console.log(error));

  useEffect(() => fetchLogs(), [activeProject]);

  const removeLog = (id) => {
    const reqBody = {
      headers: { Authorization: `Bearer ${token}` },
      data: { id },
    };
    axios
      .delete(`/devlog/${id}`, reqBody)
      .then(() => fetchLogs())
      .catch((error) => console.log("delete devlog error", error));
  };

  const handleProjectClick = (Id) =>
    axios
      .get(`/devlog/${Id}`, authHeader)
      .then((response) => {
        localStorage.setItem("activeProject", Id);
        setActiveProject(Id);
        setLogs(response.data);
      })
      .catch((error) => console.log(error));

  return (
    <DevlogContext.Provider
      value={{
        removeLog,
        logs,
        setLogs,
        fetchLogs,
        handleProjectClick,
      }}
    >
      {children}
    </DevlogContext.Provider>
  );
};
