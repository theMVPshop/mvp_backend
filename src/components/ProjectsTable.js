import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Table,
  Button,
  Tooltip,
  OverlayTrigger,
  // Spinner,
} from "react-bootstrap";
import {
  faCalendarCheck,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddProjectForm from "./AddProjectForm";
import { useGlobal } from "../contexts/GlobalProvider";
import { useProjects } from "../contexts/ProjectsProvider";
import { useMilestones } from "../contexts/MilestonesProvider";

// rendered from multiple components, and inherits behavior based on which
function ProjectsTable({ asModal, handleProjectClick }) {
  let history = useHistory();

  const { user, authHeader, isMod, activeProject, setActiveProject } =
    useGlobal();
  const { projects, setProjects, permissions, deleteProject } = useProjects();
  const { setMilestones } = useMilestones();

  // const milestoneIcon = (
  //   <FontAwesomeIcon
  //     icon={faCalendarCheck}
  //     size="2x"
  //     onClick={() => projectRedirect(project.id, "/milestones")}
  //     className="ml-3"
  //     role="button"
  //   />
  // );
  const devlogIcon = <FontAwesomeIcon icon={faClipboard} size="2x" />;

  // makes clicked-on project consistent across app experience
  const projectRedirect = (Id, route) => {
    localStorage.setItem("activeProject", Id);
    setActiveProject(Id);
    axios
      .get(`/milestones/${Id}`, authHeader)
      .then((res) => setMilestones(res.data))
      .then(() => history.push(route));
    // fetchMilestones().then(() => history.push(route));

    // history.push(route);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props}
    </Tooltip>
  );

  return (
    <Container className="projects">
      <div
        className="pb-3 mb-2 mt-2 m-auto"
        style={{
          backgroundColor: "rgba(0,0,0,.25)",
          border: "solid 3px var(--blue)",
          borderRadius: "30px 30px 0 0",
        }}
      >
        <div
          className="pt-2 pb-2 mb-3"
          style={{
            borderRadius: "25px 25px 0 0",
            filter: "drop-shadow(0 10px 0.05rem rgba(0,0,0,.55)",
          }}
        >
          {/* form to add a project */}
          {!asModal && (
            <AddProjectForm
              isMod={isMod}
              setProjects={setProjects}
              authHeader={authHeader}
            />
          )}
        </div>
        <Container>
          {/* table of projects */}
          <Table bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID#</th>
                <th>Project Title</th>
                <th className="d-none d-md-table-cell">Project Description</th>
                {!asModal && !isMod && (
                  <>
                    <th></th>
                    <th></th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {
                // checks if user is a moderator to either show all projects or filter based on permissions table
                isMod
                  ? projects.map((project) => (
                      <tr
                        key={project.id}
                        className={
                          activeProject === project.id
                            ? "table-active"
                            : undefined
                        }
                        style={asModal ? { cursor: "pointer" } : undefined}
                        onClick={
                          asModal
                            ? () => handleProjectClick(project.id)
                            : undefined
                        }
                      >
                        <td>{project.id}</td>
                        <OverlayTrigger
                          placement="left-start"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip(project.description)}
                        >
                          <td className="d-flex">
                            {project.title}
                            {!asModal && (
                              <div className="d-flex ml-auto">
                                <FontAwesomeIcon
                                  icon={faCalendarCheck}
                                  size="2x"
                                  onClick={() =>
                                    projectRedirect(project.id, "/milestones")
                                  }
                                  className="ml-3"
                                  role="button"
                                />

                                <Link
                                  onClick={() => projectRedirect(project.id)}
                                  to="/devlog"
                                  className="text-light ml-3"
                                >
                                  {devlogIcon}
                                </Link>
                                {!asModal && (
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => deleteProject(project.id)}
                                    className="ml-3"
                                  >
                                    X
                                  </Button>
                                )}
                              </div>
                            )}
                          </td>
                        </OverlayTrigger>
                        <td className="d-none d-md-table-cell">
                          {project.description}
                        </td>
                      </tr>
                    ))
                  : // two more conditional renderings if not moderator
                    permissions.map((permission) =>
                      projects
                        .filter(
                          (x) =>
                            x.id === permission.project_id &&
                            permission.username === user
                        )
                        .map((project) => {
                          return (
                            (!asModal && (
                              <tr key={project.id}>
                                <td>{project.id}</td>
                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltip(project.description)}
                                >
                                  <td>{project.title}</td>
                                </OverlayTrigger>
                                <td className="d-none d-md-table-cell">
                                  {project.description}
                                </td>
                                {/* below lines are the same deal as the above for two links/icons, except rendered by non-mods i.e. clients */}
                                <td>
                                  <Link
                                    onClick={() => projectRedirect(project.id)}
                                    to="/milestones"
                                    className="text-light"
                                  >
                                    {milestoneIcon}
                                  </Link>
                                </td>
                                <td>
                                  <Link
                                    onClick={() => projectRedirect(project.id)}
                                    to="/devlog"
                                    className="text-light"
                                  >
                                    {devlogIcon}
                                  </Link>
                                </td>
                              </tr>
                            )) ||
                            (asModal && (
                              <tr
                                key={project.id}
                                className={
                                  activeProject === project.id
                                    ? "table-active"
                                    : undefined
                                }
                                style={
                                  activeProject === project.id
                                    ? { backgroundColor: "orange" }
                                    : asModal && { cursor: "pointer" }
                                }
                                onClick={() => handleProjectClick(project.id)}
                              >
                                <td>{project.id}</td>
                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltip(project.description)}
                                >
                                  <td>{project.title}</td>
                                </OverlayTrigger>
                                <td className="d-none d-md-block">
                                  {project.description}
                                </td>
                              </tr>
                            ))
                          );
                        })
                    )
              }
            </tbody>
          </Table>
        </Container>
      </div>
    </Container>
  );
}

export default ProjectsTable;
