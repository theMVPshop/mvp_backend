import React from "react";
import { useHistory } from "react-router-dom";
import { Spinner, Tooltip } from "react-bootstrap";
import axios from "axios";
import { useGlobal } from "../contexts/GlobalProvider";
import { useProjects } from "../contexts/ProjectsProvider";
import { useMilestones } from "../contexts/MilestonesProvider";
import { useDevlog } from "../contexts/DevlogProvider";

export default () => {
  const { user, authHeader, isMod, activeProject, setActiveProject } =
    useGlobal();
  const { projects, setProjects, permissions, deleteProject } = useProjects();
  const { setMilestones } = useMilestones();
  const { setLogs } = useDevlog();

  const [loading, setLoading] = React.useState({
    isLoading: false,
    clickedProjectId: null,
    page: null,
  });

  let history = useHistory();

  const projectRedirect = async (Id, page) => {
    setLoading({ isLoading: true, clickedProjectId: Id, page });
    setActiveProject(Id);
    localStorage.setItem("activeProject", Id);
    try {
      const res = await axios.get(`/${page}/${Id}`, authHeader);
      page === "milestones" ? setMilestones(res.data) : setLogs(res.data);
    } catch (error) {
      console.log("could not redirect");
    } finally {
      setLoading({ isLoading: false });
      history.push(`/${page}`);
    }
  };

  const Loader = (
    <Spinner
      as="span"
      variant="danger"
      animation="border"
      role="status"
      aria-hidden="true"
      className={isMod ? "ml-2" : undefined}
    />
  );

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props}
    </Tooltip>
  );

  return {
    user,
    isMod,
    authHeader,
    activeProject,
    projects,
    setProjects,
    permissions,
    deleteProject,
    loading,
    projectRedirect,
    Loader,
    renderTooltip,
  };
};
