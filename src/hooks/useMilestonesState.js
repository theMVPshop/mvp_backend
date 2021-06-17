import UseLocalStorageState from "./useLocalStorageState";

export default (initialMilestones) => {
  const [milestones, setMilestones] = UseLocalStorageState(
    "milestones",
    initialMilestones
  );
  return {
    milestones,
    removeMilestone: async (Id) => {
      setloadingMilestones(true);
      setclickedMilestone(Id);
      let reqBody = {
        headers: { Authorization: `Bearer ${token}` },
        data: { id: Id },
      };
      try {
        await axios.delete(`/milestones/${activeProject}`, reqBody);
      } catch (error) {
        console.log(error);
      } finally {
        fetchMilestones();
      }
    },
    // updates milestone status in api and component
    handleStatusChange: (milestone) => {
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
    },
  };
};
