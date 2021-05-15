import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import AddProjectForm from "./AddProjectForm";

function ProjectsTable({
  fromMilestones,
  handleProjectClick,
  activeProject,
  setActiveProject,
}) {
  // checks if "gotrue.user" exists before reading the email property
  const localStorageCurrentUser = JSON.parse(
    localStorage.getItem("gotrue.user")
  )?.email;
  const [projects, setProjects] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isMod, setIsMod] = useState(false);

  useEffect(() => {
    // if someone is logged in, this will check to see if they are a moderator and store it in a useState hook (line 15) as a boolean
    localStorageCurrentUser &&
      axios.get("/users").then((response) => {
        setIsMod(
          response.data.find((x) => x.username === localStorageCurrentUser)
            ?.isModerator === 1
            ? true
            : false
        );
      });
    // fetch permissions table from API and store in hook
    axios.get("/permissions").then((response) => {
      setPermissions(response.data);
    });
    // fetch projects table from API and store in hook
    axios.get("/projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  // removes project from api and repopulates component with projects sans deleted one
  const removeProject = (projectId) => {
    axios.delete(`/projects/${projectId}`).then(() => {
      axios.get("/projects").then((response) => {
        setProjects([...response.data]);
      });
    });
  };

  return (
    <div>
      {/* form to add a project */}
      <AddProjectForm
        isMod={isMod}
        projects={projects}
        setProjects={setProjects}
      />
      <Container>
        {/* table of projects */}
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID#</th>
              <th>Project Title</th>
              <th>Project Description</th>
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
                        activeProject === project.id
                          ? {
                              backgroundColor: "orange",
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
                          permission.username === localStorageCurrentUser
                      )
                      .map((project) => (
                        <tr
                          style={
                            activeProject === project.id
                              ? {
                                  backgroundColor: "orange",
                                }
                              : fromMilestones && { cursor: "pointer" }
                          }
                          onClick={() => handleProjectClick(project.id)}
                        >
                          <td>{project.id}</td>
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
                          permission.username === localStorageCurrentUser
                      )
                      .map((project) => (
                        <tr>
                          <td>{project.id}</td>
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
  );
}

export default ProjectsTable;
