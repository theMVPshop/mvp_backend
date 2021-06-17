import React from "react";
import { Container, Table, Button, OverlayTrigger } from "react-bootstrap";
import {
  faCalendarCheck,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddProjectForm from "./AddProjectForm";
import useProjectsTable from "../hooks/useProjectsTable";

// rendered from multiple components, and inherits behavior based on which
function ProjectsTable({ asModal, handleProjectClick }) {
  const {
    user,
    activeProject,
    projects,
    setProjects,
    permissions,
    deleteProject,
    loading,
    projectRedirect,
    Loader,
    renderTooltip,
    isMod,
    authHeader,
  } = useProjectsTable();

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
                        role={asModal ? "button" : undefined}
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
                                {loading.isLoading &&
                                loading.clickedProjectId === project.id &&
                                loading.page === "milestones" ? (
                                  Loader
                                ) : (
                                  <FontAwesomeIcon
                                    icon={faCalendarCheck}
                                    size="2x"
                                    onClick={() =>
                                      projectRedirect(project.id, "milestones")
                                    }
                                    className="ml-3"
                                    role="button"
                                  />
                                )}
                                {loading.isLoading &&
                                loading.clickedProjectId === project.id &&
                                loading.page === "devlog" ? (
                                  Loader
                                ) : (
                                  <FontAwesomeIcon
                                    icon={faClipboard}
                                    size="2x"
                                    onClick={() =>
                                      projectRedirect(project.id, "devlog")
                                    }
                                    className="ml-3"
                                    role="button"
                                  />
                                )}
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
                  : // filter projects if not moderator
                    permissions.map((permission) =>
                      projects
                        .filter(
                          (x) =>
                            permission.project_id === x.id &&
                            permission.username === user
                        )
                        .map((project) =>
                          !asModal ? (
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
                              <td className="text-center">
                                {loading.isLoading &&
                                loading.clickedProjectId === project.id &&
                                loading.page === "milestones" ? (
                                  Loader
                                ) : (
                                  <FontAwesomeIcon
                                    icon={faCalendarCheck}
                                    size="2x"
                                    onClick={() =>
                                      projectRedirect(project.id, "milestones")
                                    }
                                    role="button"
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
                                    onClick={() =>
                                      projectRedirect(project.id, "devlog")
                                    }
                                    role="button"
                                  />
                                )}
                              </td>
                            </tr>
                          ) : (
                            // when rendered as modal *and* not a mod
                            asModal && (
                              <tr
                                key={project.id}
                                className={
                                  activeProject === project.id
                                    ? "table-active"
                                    : undefined
                                }
                                role={asModal ? "button" : undefined}
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
                            )
                          )
                        )
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
