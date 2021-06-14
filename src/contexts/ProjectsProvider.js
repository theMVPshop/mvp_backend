import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import { useGlobal } from "./GlobalProvider";

const ProjectsContext = React.createContext();

export const useProjects = () => useContext(ProjectsContext);

export const ProjectsProvider = ({ children }) => {
  const { user, authHeader, activeProject } = useGlobal();
  const [projects, setProjects] = useLocalStorage("projects", []);
  // const [permissions, setPermissions] = useState([]);
  // const [loadingPermissions, setloadingPermissions] = useState(false);

  const fetchProjects = () =>
    axios
      .get("/projects", authHeader)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log("failed to populate projects", error));

  // fetch permissions table from API and store in hook
  // const fetchPermissions = async () => {
  //   setloadingPermissions(true);
  //   await axios
  //     .get("/permissions", authHeader)
  //     .then((response) => {
  //       setPermissions(response.data);
  //       setloadingPermissions(false);
  //     })
  //     .catch((error) => {
  //       console.log("failed to fetch permissions", error);
  //       setloadingPermissions(false);
  //     });
  // };

  // removes project from api and repopulates component with projects sans deleted one
  const deleteProject = (Id) =>
    axios
      .delete(`/projects/${Id}`, authHeader)
      .then(() => fetchProjects())
      .catch((error) => console.log("error deleting project", error));

  let activeProjectTitle = projects?.find((x) => x.id == activeProject)?.title;

  React.useEffect(() => {
    function init() {
      // fetchPermissions();
      fetchProjects();
    }
    user && init();
  }, [user]);

  return (
    <ProjectsContext.Provider
      value={{
        // loadingPermissions,
        // setloadingPermissions,
        projects,
        setProjects,
        fetchProjects,
        // fetchPermissions,
        deleteProject,
        // permissions,
        activeProjectTitle,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
