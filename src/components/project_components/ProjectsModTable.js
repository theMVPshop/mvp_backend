import React from "react";
import { Container, Table, Button, OverlayTrigger } from "react-bootstrap";
import {
  faCalendarCheck,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useProjectsTable from "../../hooks/useProjectsTable";

function ProjectsModTable() {
  const {
    activeProject,
    projects,
    deleteProject,
    loading,
    projectRedirect,
    Loader,
    renderTooltip,
  } = useProjectsTable();

  const iconProps = { className: "ml-3", size: "2x", role: "button" };

  return (
    <Container>
      <Table bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID#</th>
            <th>Project Title</th>
            <th className="d-none d-md-table-cell">Project Description</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            let tableRowClassName,
              tooltipProps,
              iconClicked,
              milestoneIcon,
              devlogIcon,
              deleteButton;

            tableRowClassName =
              activeProject === project.id ? "table-active" : undefined;

            tooltipProps = {
              placement: "left-start",
              delay: { show: 250, hide: 400 },
              overlay: renderTooltip(project.description),
            };

            iconClicked =
              loading.isLoading && loading.clickedProjectId === project.id;

            milestoneIcon = (
              <FontAwesomeIcon
                {...iconProps}
                icon={faCalendarCheck}
                onClick={() => projectRedirect(project.id, "milestones")}
              />
            );

            devlogIcon = (
              <FontAwesomeIcon
                {...iconProps}
                icon={faClipboard}
                onClick={() => projectRedirect(project.id, "devlog")}
              />
            );

            deleteButton = (
              <Button
                className="ml-3"
                variant="danger"
                size="sm"
                onClick={() => deleteProject(project.id)}
              >
                X
              </Button>
            );

            return (
              <tr key={project.id} className={tableRowClassName}>
                <td>{project.id}</td>
                <OverlayTrigger {...tooltipProps}>
                  <td className="d-flex">
                    {project.title}
                    <div className="d-flex ml-auto">
                      {iconClicked && loading.page === "milestones"
                        ? Loader
                        : milestoneIcon}
                      {iconClicked && loading.page === "devlog"
                        ? Loader
                        : devlogIcon}
                      {deleteButton}
                    </div>
                  </td>
                </OverlayTrigger>
                <td className="d-none d-md-table-cell">
                  {project.description}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProjectsModTable;
