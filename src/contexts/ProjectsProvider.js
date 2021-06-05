import React, { useState, useContext } from "react";
import axios from "axios";

const ProjectsContext = React.createContext();

export const useProjects = () => useContext(ProjectsContext);

export default function ProjectsProvider({
  children,
  user,
  authHeader,
  currentProjectId,
  setCurrentProjectId,
  activeProject,
  setActiveProject,
}) {
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

  // Milestones.js methods
  const fetchPermissions = () =>
    axios
      .get("/permissions", authHeader)
      .then((response) => setPermissions(response.data))
      .catch((error) => console.log("permissions failed to load", error));

  // fetch projects table from API and store in hook
  const populateProjects = () =>
    axios
      .get("/projects", authHeader)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log("projects failed to load", error));

  // if someone is logged in, this will check to see if they are a moderator and store it in a useState hook (line 15) as a boolean
  const checkModPrivilege = () =>
    user &&
    axios.get("/users", authHeader).then((response) => {
      setIsMod(
        response.data.find((x) => x.username === user)?.isModerator === 1
          ? true
          : false
      );
    });

  React.useEffect(() => {
    checkModPrivilege();
    fetchPermissions();
    populateProjects();
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        // milestones,
        // setMilestones,
        // fetchMilestones,
        // populateProjects,
        // handleProjectClick,
        // removeMilestone,
        // handleStatusChange,
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
    </ProjectsContext.Provider>
  );
}
