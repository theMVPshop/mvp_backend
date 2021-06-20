import React from "react";
import { Container, Table, OverlayTrigger } from "react-bootstrap";
import {
  faCalendarCheck,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useProjectsTable from "../../hooks/useProjectsTable";

function ProjectsClientTable() {
  const {
    user,
    projects,
    permissions,
    loading,
    projectRedirect,
    Loader,
    renderTooltip,
  } = useProjectsTable();

  return (
    <Container>
      <Table bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID#</th>
            <th>Project Title</th>
            <th className="d-none d-md-table-cell">Project Description</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects
            .filter((project) =>
              permissions.find(
                (permission) =>
                  permission.project_id === project.id &&
                  permission.username === user
              )
            )
            .map((project) => (
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
                <td className="text-center">
                  {loading.isLoading &&
                  loading.clickedProjectId === project.id &&
                  loading.page === "milestones" ? (
                    Loader
                  ) : (
                    <FontAwesomeIcon
                      icon={faCalendarCheck}
                      size="2x"
                      role="button"
                      onClick={() => projectRedirect(project.id, "milestones")}
                    />
                  )}
                </td>
                <td className="text-center">
                  {loading.isLoading &&
                  loading.clickedProjectId === project.id &&
                  loading.page === "devlog" ? (
                    Loader
                  ) : (
                    <FontAwesomeIcon
                      icon={faClipboard}
                      size="2x"
                      role="button"
                      onClick={() => projectRedirect(project.id, "devlog")}
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProjectsClientTable;
