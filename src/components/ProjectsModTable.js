import React from "react";
import { Container, Table, Button, OverlayTrigger } from "react-bootstrap";
import {
  faCalendarCheck,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useProjectsTable from "../hooks/useProjectsTable";

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
          {projects.map((project) => (
            <tr
              key={project.id}
              className={
                activeProject === project.id ? "table-active" : undefined
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
                  <div className="d-flex ml-auto">
                    {loading.isLoading &&
                    loading.clickedProjectId === project.id &&
                    loading.page === "milestones" ? (
                      Loader
                    ) : (
                      <FontAwesomeIcon
                        className="ml-3"
                        icon={faCalendarCheck}
                        size="2x"
                        role="button"
                        onClick={() =>
                          projectRedirect(project.id, "milestones")
                        }
                      />
                    )}

                    {loading.isLoading &&
                    loading.clickedProjectId === project.id &&
                    loading.page === "devlog" ? (
                      Loader
                    ) : (
                      <FontAwesomeIcon
                        className="ml-3"
                        icon={faClipboard}
                        size="2x"
                        role="button"
                        onClick={() => projectRedirect(project.id, "devlog")}
                      />
                    )}
                    <Button
                      className="ml-3"
                      variant="danger"
                      size="sm"
                      onClick={() => deleteProject(project.id)}
                    >
                      X
                    </Button>
                  </div>
                </td>
              </OverlayTrigger>
              <td className="d-none d-md-table-cell">{project.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProjectsModTable;
