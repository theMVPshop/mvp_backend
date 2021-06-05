import React, { useState, useContext } from "react";
import axios from "axios";

const ProviderContext = React.createContext();

export const useProvider = () => useContext(ProviderContext);

export default function ContextProvider({ children }) {
  let cachedActiveProjectId = parseInt(localStorage.getItem("activeProject"));
  let loggedIn = localStorage.getItem("loggedIn");
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState([]);
  const [projects, setProjects] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [isMod, setIsMod] = useState(false);
  const [logs, setLogs] = useState([]);
  const [activeProject, setActiveProject] = useState(cachedActiveProjectId);
  const [currentProjectId, setCurrentProjectId] = useState(
    cachedActiveProjectId
  );
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // React.useEffect(() => {
  //   populateProjects();
  // }, []);
  // Milestones.js methods

  const populateProjects = () =>
    axios
      .get("/projects", authHeader)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));

  return (
    <ProviderContext.Provider
      value={{
        // milestones,
        // setMilestones,
        // fetchMilestones,
        populateProjects,
        // handleProjectClick,
        // removeMilestone,
        // handleStatusChange,
        currentProjectId,
        activeProject,
        setActiveProject,
        setCurrentProjectId,
        isMod,
        setIsMod,
        logs,
        setLogs,
        todos,
        setTodos,
        projects,
        user,
        loggedIn,
        cachedActiveProjectId,
        authHeader,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
}
