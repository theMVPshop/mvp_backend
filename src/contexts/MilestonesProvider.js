import React, { useState, useContext } from "react";
import axios from "axios";

const MilestonesContext = React.createContext();

export const useMilestones = () => useContext(MilestonesContext);

export default function MilestonesProvider({
  children,
  setProjects,
  currentProjectId,
  authHeader,
}) {
  const [milestones, setMilestones] = useState([]);

  // Milestones.js methods
  const fetchMilestones = () =>
    axios
      .get(`/milestones/${currentProjectId}`, authHeader)
      .then((response) => setMilestones(response.data))
      .catch((error) => console.log(error));

  const populateProjects = () =>
    axios
      .get("/projects", authHeader)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));

  // populates milestones for the selected project
  const handleProjectClick = (projectId) =>
    axios
      .get(`/milestones/${projectId}`, authHeader)
      .then((response) => {
        setTodos(response.data);
        setCurrentProjectId(projectId);
        setActiveProject(projectId);
        localStorage.setItem("activeProject", projectId);
      })
      .then(() => populateProjects())
      .catch((error) => console.log(error));

  // deletes milestone in api and repopulates component with milestones sans deleted one
  const removeMilestone = (Id) => {
    const reqBody = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id: Id,
      },
    };
    axios
      .delete(`/milestones/${currentProjectId}`, reqBody)
      .then(() => fetchMilestones())
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    fetchMilestones();
    populateProjects();
  }, []);

  // updates milestone status in api and component
  const handleStatusChange = (todo) => {
    const todoId = todo.id;
    if (todo.ms_status === "TODO") {
      todo.ms_status = "IN PROGRESS";
      axios.put(
        `/milestones/${todoId}`,
        {
          ms_status: "IN PROGRESS",
        },
        authHeader
      );
    } else if (todo.ms_status === "IN PROGRESS") {
      todo.ms_status = "COMPLETED";
      axios.put(
        `/milestones/${todoId}`,
        {
          ms_status: "COMPLETED",
        },
        authHeader
      );
    } else if (todo.ms_status === "COMPLETED") {
      todo.ms_status = "TODO";
      axios.put(
        `/milestones/${todoId}`,
        {
          ms_status: "TODO",
        },
        authHeader
      );
    }
    setMilestones([...milestones]);
  };

  return (
    <MilestonesContext.Provider
      value={{
        milestones,
        setMilestones,
        fetchMilestones,
        populateProjects,
        handleProjectClick,
        removeMilestone,
        handleStatusChange,
      }}
    >
      {children}
    </MilestonesContext.Provider>
  );
}
