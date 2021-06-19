import React, { useEffect, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGlobal } from "./GlobalProvider";
import axios from "axios";

const MilestonesContext = React.createContext();

export const useMilestones = () => useContext(MilestonesContext);

export const MilestonesProvider = ({ children }) => {
  const { activeProject, authHeader, token } = useGlobal();

  const [milestones, setMilestones] = useLocalStorage("milestones", []);
  const [loading, setloading] = React.useState({
    loadingMilestones: true,
    loadingStatusChange: false,
    clickedMilestone: null,
  });

  const fetchMilestones = async () => {
    try {
      let res = await axios.get(`/milestones/${activeProject}`, authHeader);
      setMilestones(res.data);
    } catch (e) {
      console.error("failed to fetch milestones", e);
    } finally {
      setloading({ loadingMilestones: false });
    }
  };

  useEffect(() => fetchMilestones(), [activeProject]);

  // deletes milestone in api and repopulates component with milestones sans deleted one
  const removeMilestone = async (Id) => {
    setloading({ loadingMilestones: true, clickedMilestone: Id });
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
    const setStatus = async (status) => {
      setloading({ loadingStatusChange: true, clickedMilestone: milestoneId });
      try {
        let url = `/milestones/${milestoneId}`;
        let response = await axios.put(url, { ms_status: status }, authHeader);
        if (response.status === 200) milestone.ms_status = status;
      } catch (e) {
        console.error(e);
      } finally {
        setMilestones([...milestones]);
        setloading({ loadingStatusChange: false });
      }
    };
    milestone.ms_status === "TODO"
      ? setStatus("IN PROGRESS")
      : milestone.ms_status === "IN PROGRESS"
      ? setStatus("COMPLETED")
      : milestone.ms_status === "COMPLETED"
      ? setStatus("TODO")
      : (milestone.ms_status = "TODO");
  };

  return (
    <MilestonesContext.Provider
      value={{
        loading,
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
