import axios from "axios";
import { useState } from "react";
import { useGlobal } from "../contexts/GlobalProvider";
import { useDevlog } from "../contexts/DevlogProvider";
import { useMilestones } from "../contexts/MilestonesProvider";

export default (route) => {
  const { authHeader, activeProject, setActiveProject } = useGlobal();
  const { setMilestones } = useMilestones();
  const { setLogs } = useDevlog();

  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // populates milestones for the selected project
  const handleProjectClick = async (Id) => {
    setLoading(true);
    setActiveProject(Id);
    localStorage.setItem("activeProject", Id);
    try {
      let response = await axios.get(`/${route}/${Id}`, authHeader);
      let data = await response.data;
      route === "milestones"
        ? setMilestones(data)
        : route === "devlog"
        ? setLogs(data)
        : null;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return {
    activeProject,
    setActiveProject,
    loading,
    show,
    handleClose,
    handleShow,
    handleProjectClick,
  };
};
