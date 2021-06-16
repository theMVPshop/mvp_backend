import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import { useGlobal } from "./GlobalProvider";

const ProjectsContext = React.createContext();

export const useProjects = () => useContext(ProjectsContext);

export const ProjectsProvider = ({ children }) => {
  const { user, authHeader, activeProject } = useGlobal();
  const [projects, setProjects] = useLocalStorage("projects", []);
  const [permissions, setPermissions] = useState([]);
  const [loadingProjects, setloadingProjects] = useState(false);
  // const [loadingPermissions, setloadingPermissions] = useState(false);

  const fetchProjects = async () => {
    // setloadingProjects(true);
    try {
      let response = await axios.get("/projects", authHeader);
      setProjects(response.data);
    } catch (error) {
      console.log("failed to populate projects", error);
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
      console.log("failed to fetch permissions", error);
    }
  };

  // removes project from api and repopulates component with projects sans deleted one
  const deleteProject = async (Id) => {
    setloadingProjects(true);
    try {
      await axios.delete(`/projects/${Id}`, authHeader);
    } catch (error) {
      console.log("error deleting project", error);
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
        // loadingPermissions,
        // setloadingPermissions,
        loadingProjects,
        projects,
        setProjects,
        fetchProjects,
        // fetchPermissions,
        deleteProject,
        permissions,
        activeProjectTitle,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
