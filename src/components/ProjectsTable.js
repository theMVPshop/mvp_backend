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

  useEffect(() => {
    // if someone is logged in, this will check to see if they are a moderator and store it in a useState hook (line 15) as a boolean
    user &&
      axios.get("/users", authHeader).then((response) => {
        setIsMod(
          response.data.find((x) => x.username === user)?.isModerator === 1
            ? true
            : false
        );
      });
    // fetch permissions table from API and store in hook
    axios.get("/permissions", authHeader).then((response) => {
      setPermissions(response.data);
    });
    // fetch projects table from API and store in hook
    axios.get("/projects", authHeader).then((response) => {
      setProjects(response.data);
    });
  }, []);

  // removes project from api and repopulates component with projects sans deleted one
  const removeProject = (projectId) => {
    axios.delete(`/projects/${projectId}`, authHeader).then(() => {
      axios.get("/projects", authHeader).then((response) => {
        setProjects([...response.data]);
      });
    });
  };

  const addItemToLocalStorage = () =>
    localStorage.setItem("activeProject", project.id);

  return (
    <div className="projects" style={{ width: "800px", margin: "auto" }}>
      <div
        className="pb-3 mb-2 mt-2"
        style={{
          backgroundColor: "rgba(0,0,0,.25)",
          margin: "auto",
          border: "solid 3px var(--indigo)",
          width: "80%",
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
                {!fromMilestones && (
                  <>
                    <th>Milestones</th>
                    <th>Devlog</th>
                  </>
                )}
                <th>Project Title</th>
                <th>Project Description</th>
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
                              >
                                {devlogIcon}
                              </Link>
                            </td>
                          </>
                        )}
                        <td>{project.title}</td>
                        <td>{project.description}</td>
                        {!fromMilestones && (
                          <td className="d-flex justify-content-center">
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => removeProject(project.id)}
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
                            <td>
                              <Link
                                onClick={() =>
                                  localStorage.setItem(
                                    "activeProject",
                                    project.id
                                  )
                                }
                                to="/milestones"
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
                              >
                                {devlogIcon}
                              </Link>
                            </td>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
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
