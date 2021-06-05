import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import {
  faCalendarCheck,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddProjectForm from "./AddProjectForm";

function ProjectsTable({ fromMilestones, handleProjectClick }) {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let cachedActiveProject = parseInt(localStorage.getItem("activeProject"));
  const [projects, setProjects] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isMod, setIsMod] = useState(false);
  const milestoneIcon = <FontAwesomeIcon icon={faCalendarCheck} size="2x" />;
  const devlogIcon = <FontAwesomeIcon icon={faClipboard} size="2x" />;

  // if someone is logged in, this will check to see if they are a moderator and store it in a useState hook as a boolean
  const checkModPrivilege = () =>
    user &&
    axios
      .get("/users", authHeader)
      .then((response) => {
        setIsMod(
          response.data.find((x) => x.username === user)?.isModerator === 1
            ? true
            : false
        );
      })
      .catch((error) =>
        console.log("failed to retrieve moderator status", error)
      );

  // fetch projects table from API and store in hook
  const fetchProjects = () =>
    axios
      .get("/projects", authHeader)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log("failed to fetch projects", error));

  // fetch permissions table from API and store in hook
  const fetchPermissions = () =>
    axios
      .get("/permissions", authHeader)
      .then((response) => setPermissions(response.data))
      .then((error) => console.log("failed to fetch permissions", error));

  useEffect(() => {
    checkModPrivilege();
    fetchProjects();
    fetchPermissions();
  }, []);

  // removes project from api and repopulates component with projects sans deleted one
  const deleteProject = (Id) =>
    axios
      .delete(`/projects/${Id}`, authHeader)
      .then(() => fetchProjects())
      .catch((error) => console.log("error deleting project", error));

  return (
    <div className="projects">
      <div
        className="pb-3 mb-2 mt-2"
        style={{
          backgroundColor: "rgba(0,0,0,.25)",
          margin: "auto",
          border: "solid 3px var(--indigo)",
          borderRadius: "30px 30px 0 0",
        }}
      >
        <div
          className="mileContainer pt-2 pb-2 mb-3"
          style={{
            backgroundColor: "var(--indigo)",
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
            />
          )}
        </div>
        <Container>
          {/* table of projects */}
          <Table
            striped
            bordered
            hover
            variant="dark"
            style={{ backgroundColor: "var(--indigo)" }}
          >
            <thead>
              <tr>
                <th>ID#</th>
                <th>Project Title</th>
                <th>Project Description</th>
                {!fromMilestones && (
                  <>
                    <th>Milestones</th>
                    <th>Devlog</th>
                  </>
                )}
                {!fromMilestones && <th>Delete</th>}
              </tr>
            </thead>
            <tbody>
              {
                // checks if user is a moderator to either show all projects or filter based on permissions table
                isMod
                  ? projects.map((project) => (
                      <tr
                        // the following attributes are only applicable if rendered by Milestones.js
                        style={
                          cachedActiveProject === project.id
                            ? {
                                backgroundColor: "#766400",
                              }
                            : fromMilestones && { cursor: "pointer" }
                        }
                        onClick={
                          fromMilestones
                            ? () => handleProjectClick(project.id)
                            : null
                        }
                      >
                        <td>{project.id}</td>
                        <td>{project.title}</td>
                        <td>{project.description}</td>
                        {/* two table cells with an icon/link in each; only rendered if on Projects.js page */}
                        {!fromMilestones && (
                          <>
                            <td>
                              <Link
                                onClick={() =>
                                  localStorage.setItem(
                                    "activeProject",
                                    project.id
                                  )
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
                                  localStorage.setItem(
                                    "activeProject",
                                    project.id
                                  )
                                }
                                to="/devlog"
                                style={{ color: "white" }}
                              >
                                {devlogIcon}
                              </Link>
                            </td>
                          </>
                        )}
                        {/* end of code for icons */}
                        {!fromMilestones && (
                          <td className="d-flex justify-content-center">
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => deleteProject(project.id)}
                            >
                              X
                            </Button>
                          </td>
                        )}
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
                            style={
                              cachedActiveProject === project.id
                                ? {
                                    backgroundColor: "#766400",
                                  }
                                : fromMilestones && { cursor: "pointer" }
                            }
                            onClick={() => handleProjectClick(project.id)}
                          >
                            <td>{project.id}</td>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
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
                          <tr>
                            <td>{project.id}</td>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                            {/* same deal as the above for two links/icons, except for when rendered by non-mods i.e. clients */}
                            <td>
                              <Link
                                onClick={() =>
                                  localStorage.setItem(
                                    "activeProject",
                                    project.id
                                  )
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
                                  localStorage.setItem(
                                    "activeProject",
                                    project.id
                                  )
                                }
                                to="/devlog"
                                style={{ color: "white" }}
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
    </div>
  );
}

export default ProjectsTable;
