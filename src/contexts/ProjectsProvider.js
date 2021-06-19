import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import { useGlobal } from "./GlobalProvider";

const ProjectsContext = React.createContext();

export const useProjects = () => useContext(ProjectsContext);

export const ProjectsProvider = ({ children }) => {
  const { user, authHeader, activeProject } = useGlobal();

  const [projects, setProjects] = useLocalStorage("projects", []);
  const [permissions, setPermissions] = useLocalStorage("permissions", []);
  const [loadingProjects, setloadingProjects] = useState(false);

  const fetchProjects = async () => {
    try {
      let response = await axios.get("/projects", authHeader);
      setProjects(response.data);
    } catch (error) {
      console.error("failed to populate projects", error);
    } finally {
      setloadingProjects(false);
    }
  };

  // fetch permissions table from API and store in hook
  const fetchPermissions = async () => {
    try {
      let response = await axios.get("/permissions", authHeader);
      setPermissions(response.data);
    } catch (error) {
      console.error("failed to fetch permissions", error);
    }
  };

  // removes project from api and repopulates component with projects sans deleted one
  const deleteProject = async (Id) => {
    setloadingProjects(true);
    try {
      await axios.delete(`/projects/${Id}`, authHeader);
    } catch (error) {
      console.error("error deleting project", error);
    } finally {
      fetchProjects();
    }
  };

  let activeProjectTitle = projects?.find((x) => x.id == activeProject)?.title;

  React.useEffect(() => {
    function init() {
      fetchPermissions();
      fetchProjects();
    }
    user && init();
  }, [user]);

  return (
    <ProjectsContext.Provider
      value={{
        loadingProjects,
        projects,
        setProjects,
        fetchProjects,
        deleteProject,
        permissions,
        activeProjectTitle,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
