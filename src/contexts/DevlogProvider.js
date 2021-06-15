import React, { useEffect, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGlobal } from "./GlobalProvider";
import axios from "axios";

const DevlogContext = React.createContext();

export const useDevlog = () => useContext(DevlogContext);

export const DevlogProvider = ({ children }) => {
  const { activeProject, authHeader, token } = useGlobal();
  const [logs, setLogs] = useLocalStorage("logs", []);

  const fetchLogs = async () => {
    try {
      let response = await axios.get(`/devlog/${activeProject}`, authHeader);
      setLogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => fetchLogs(), [activeProject]);

  const removeLog = async (id) => {
    let reqBody = {
      headers: { Authorization: `Bearer ${token}` },
      data: { id },
    };
    try {
      await axios.delete(`/devlog/${id}`, reqBody);
    } catch (error) {
      console.log("delete devlog error", error);
    } finally {
      fetchLogs();
    }
  };

  return (
    <DevlogContext.Provider value={{ removeLog, logs, setLogs, fetchLogs }}>
      {children}
    </DevlogContext.Provider>
  );
};
