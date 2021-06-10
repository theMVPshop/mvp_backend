import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import {
  faCalendarCheck,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddProjectForm from "./AddProjectForm";
import { useGlobal } from "../contexts/GlobalProvider";

// rendered from multiple components, and inherits behavior based on which
function ProjectsTable({ fromMilestones, handleProjectClick }) {
  const {
    cachedActiveProjectId,
    user,
    authHeader,
    isMod,
    projects,
    setProjects,
    permissions,
    setActiveProject,
    deleteProject,
  } = useGlobal();
  const milestoneIcon = <FontAwesomeIcon icon={faCalendarCheck} size="2x" />;
  const devlogIcon = <FontAwesomeIcon icon={faClipboard} size="2x" />;

  // makes clicked-on project consistent across app experience
  const saveActiveProjectIdToCache = (Id) => {
    localStorage.setItem("activeProject", Id);
    setActiveProject(Id);
  };

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
          className="mileContainer pt-2 pb-2 mb-3"
          style={{
            // backgroundColor: "var(--  )",
            borderRadius: "25px 25px 0 0",
            filter: "drop-shadow(0 10px 0.05rem rgba(0,0,0,.55)",
          }}
        >
          {/* form to add a project */}
          {!fromMilestones && (
            <AddProjectForm
              isMod={isMod}
              projects={projects}
              setProjects={setProjects}
              authHeader={authHeader}
            />
          )}
        </div>
        <Container>
          {/* table of projects */}
          <Table
            // striped
            bordered
            hover
            variant="dark"
            // style={{ backgroundColor: "var(--blue)" }}
          >
            <thead>
              <tr>
                <th>ID#</th>
                <th>Project Title</th>
                <th className="d-none d-md-table-cell">Project Description</th>
                {!fromMilestones && !isMod && (
                  <>
                    <th></th>
                    <th></th>
                  </>
                )}
                {/* <th className="d-xs-table-cell d-md-none">Todos/Log</th> */}
                {/* {!fromMilestones && (
                  <>
                    <th>Milestones</th>
                    <th>Devlog</th>
                  </>
                )} */}
                {/* {!fromMilestones && <th>Delete</th>} */}
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
                          cachedActiveProjectId === project.id && "table-active"
                        }
                        style={
                          cachedActiveProjectId === project.id
                            ? { backgroundColor: "orange" }
                            : fromMilestones && { cursor: "pointer" }
                        }
                        onClick={
                          fromMilestones
                            ? () => handleProjectClick(project.id)
                            : null
                        }
                      >
                        <td>{project.id}</td>
                        <td className="d-flex">
                          {project.title}
                          {!fromMilestones && (
                            <div className="d-flex ml-auto">
                              <Link
                                onClick={() =>
                                  saveActiveProjectIdToCache(project.id)
                                }
                                to="/milestones"
                                className="text-light ml-3"
                              >
                                {milestoneIcon}
                              </Link>
                              <Link
                                onClick={() =>
                                  saveActiveProjectIdToCache(project.id)
                                }
                                to="/devlog"
                                className="text-light ml-3"
                              >
                                {devlogIcon}
                              </Link>
                              {!fromMilestones && (
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
                        <td className="d-none d-md-table-cell">
                          {project.description}
                        </td>

                        {/*  */}
                      </tr>
                    ))
                  : fromMilestones
                  ? // maps over permissions table to filter projects assigned to current user and render them in the table. if rendered from Milestones.js then it will have a handleclick eventlistener
                    permissions.map((permission) =>
                      projects
                        .filter(
                          (x) =>
                            x.id === permission.project_id &&
                            permission.username === user
                        )
                        .map((project) => (
                          <tr
                            key={project.id}
                            className={
                              cachedActiveProjectId === project.id &&
                              "table-active"
                            }
                            style={
                              cachedActiveProjectId === project.id
                                ? { backgroundColor: "orange" }
                                : fromMilestones && { cursor: "pointer" }
                            }
                            onClick={() => handleProjectClick(project.id)}
                          >
                            <td>{project.id}</td>
                            <td>{project.title}</td>
                            <td className="d-none d-md-block">
                              {project.description}
                            </td>
                          </tr>
                        ))
                    )
                  : // otherwise, it won't have the listener
                    permissions.map((permission) =>
                      projects
                        .filter(
                          (x) =>
                            x.id === permission.project_id &&
                            permission.username === user
                        )
                        .map((project) => (
                          <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.title}</td>
                            <td className="d-none d-md-table-cell">
                              {project.description}
                            </td>
                            {/* below lines are the same deal as the above for two links/icons, except rendered by non-mods i.e. clients */}
                            <td>
                              <Link
                                onClick={() =>
                                  saveActiveProjectIdToCache(project.id)
                                }
                                to="/milestones"
                                className="text-light"
                              >
                                {milestoneIcon}
                              </Link>
                            </td>
                            <td>
                              <Link
                                onClick={() =>
                                  saveActiveProjectIdToCache(project.id)
                                }
                                to="/devlog"
                                className="text-light"
                              >
                                {devlogIcon}
                              </Link>
                            </td>
                          </tr>
                        ))
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

{
  /* two table cells with an icon/link in each; only rendered if on Projects.js page */
}
{
  /* {!fromMilestones && (
                          <>
                            <td>
                              <Link
                                onClick={() =>
                                  saveActiveProjectIdToCache(project.id)
                                }
                                to="/milestones"
                                style={{ color: "white" }}
                              >
                                {milestoneIcon}
                              </Link>
                            </td>
                            <td>
                              <Link
                                onClick={() =>
                                  saveActiveProjectIdToCache(project.id)
                                }
                                to="/devlog"
                                style={{ color: "white" }}
                              >
                                {devlogIcon}
                              </Link>
                            </td>
                          </>
                        )} */
}
{
  /* end of code for icons */
}
