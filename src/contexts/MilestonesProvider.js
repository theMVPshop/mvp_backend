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
      let res = await axios.get(`/milestones/${activeProject}`, authHeader);
      setMilestones(res.data);
    } catch (e) {
      console.error("failed to fetch milestones", e);
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
    } catch (e) {
      console.error(e);
    } finally {
      await fetchMilestones();
    }
  };

  // updates milestone status in api and component
  const handleStatusChange = (milestone) => {
    let milestoneId = milestone.id;
    const setStatus = (status) => {
      const url = `/milestones/${milestoneId}`;
      axios.put(url, { ms_status: status }, authHeader);
      milestone.ms_status = status;
    };
    milestone.ms_status === "TODO"
      ? setStatus("IN PROGRESS")
      : milestone.ms_status === "IN PROGRESS"
      ? setStatus("COMPLETED")
      : milestone.ms_status === "COMPLETED"
      ? setStatus("TODO")
      : (milestone.ms_status = "TODO");
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
