import React, { useEffect, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGlobal } from "./GlobalProvider";
import axios from "axios";

const MilestonesContext = React.createContext();

export const useMilestones = () => useContext(MilestonesContext);

export const MilestonesProvider = ({ children }) => {
  const { activeProject, setActiveProject, authHeader, token } = useGlobal();

  const [milestones, setMilestones] = useLocalStorage("milestones", []);

  const fetchMilestones = () =>
    axios
      .get(`/milestones/${activeProject}`, authHeader)
      .then((response) => setMilestones(response.data))
      .catch((error) => console.log("failed to fetch milestones", error));

  useEffect(() => fetchMilestones(), [activeProject]);

  // populates milestones for the selected project
  const handleProjectClick = (Id) =>
    axios
      .get(`/milestones/${Id}`, authHeader)
      .then((response) => {
        localStorage.setItem("activeProject", Id);
        setActiveProject(Id);
        setMilestones(response.data);
      })
      .catch((error) => console.log(error));

  // deletes milestone in api and repopulates component with milestones sans deleted one
  const removeMilestone = (Id) => {
    const reqBody = {
      headers: { Authorization: `Bearer ${token}` },
      data: { id: Id },
    };
    axios
      .delete(`/milestones/${activeProject}`, reqBody)
      .then(() => fetchMilestones())
      .catch((error) => console.log(error));
  };

  // updates milestone status in api and component
  const handleStatusChange = (milestone) => {
    const milestoneId = milestone.id;
    const setStatus = (status) => {
      const url = `/milestones/${milestoneId}`;
      axios.put(url, { ms_status: status }, authHeader);
    };
    if (milestone.ms_status === "TODO") {
      milestone.ms_status = "IN PROGRESS";
      setStatus("IN PROGRESS");
    } else if (milestone.ms_status === "IN PROGRESS") {
      milestone.ms_status = "COMPLETED";
      setStatus("COMPLETED");
    } else if (milestone.ms_status === "COMPLETED") {
      milestone.ms_status = "TODO";
      setStatus("TODO");
    }
    setMilestones([...milestones]);
  };

  return (
    <MilestonesContext.Provider
      value={{
        milestones,
        fetchMilestones,
        handleProjectClick,
        removeMilestone,
        handleStatusChange,
      }}
    >
      {children}
    </MilestonesContext.Provider>
  );
};
