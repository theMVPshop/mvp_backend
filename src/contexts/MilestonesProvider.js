import React, { useEffect, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGlobal } from "./GlobalProvider";
import axios from "axios";

const MilestonesContext = React.createContext();

export const useMilestones = () => useContext(MilestonesContext);

export const MilestonesProvider = ({ children }) => {
  const { activeProject, authHeader, token } = useGlobal();

  const [milestones, setMilestones] = useLocalStorage("milestones", []);
  const [clickedMilestone, setclickedMilestone] = React.useState(null);
  const [loadingMilestones, setloadingMilestones] = React.useState(true);

  const fetchMilestones = async () => {
    try {
      let response = await axios.get(
        `/milestones/${activeProject}`,
        authHeader
      );
      setMilestones(response.data);
    } catch (error) {
      console.log("failed to fetch milestones", error);
    } finally {
      setloadingMilestones(false);
    }
  };

  useEffect(() => fetchMilestones(), [activeProject]);

  // deletes milestone in api and repopulates component with milestones sans deleted one
  const removeMilestone = async (Id) => {
    setloadingMilestones(true);
    setclickedMilestone(Id);
    let reqBody = {
      headers: { Authorization: `Bearer ${token}` },
      data: { id: Id },
    };
    try {
      await axios.delete(`/milestones/${activeProject}`, reqBody);
      await fetchMilestones();
    } catch (error) {
      console.log(error);
    }
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
        loadingMilestones,
        clickedMilestone,
        milestones,
        setMilestones,
        fetchMilestones,
        removeMilestone,
        handleStatusChange,
      }}
    >
      {children}
    </MilestonesContext.Provider>
  );
};
