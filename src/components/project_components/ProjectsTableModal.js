import React from "react";
import { Container, Table, OverlayTrigger } from "react-bootstrap";
import useProjectsTable from "../../hooks/useProjectsTable";

function ProjectsTableModal({ handleProjectClick }) {
  const { user, isMod, activeProject, projects, permissions, renderTooltip } =
    useProjectsTable();

  const accessibleProjs = isMod
    ? projects
    : projects.filter((project) =>
        permissions.find(
          (permission) =>
            permission.project_id === project.id && permission.username === user
        )
      );

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
          {accessibleProjs.map((project) => (
            <tr
              key={project.id}
              className={
                activeProject === project.id ? "table-active" : undefined
              }
              role="button"
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
              <td className="d-none d-md-block">{project.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProjectsTableModal;
